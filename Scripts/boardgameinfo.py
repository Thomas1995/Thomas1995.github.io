from urllib2 import Request, urlopen, URLError
import xml.etree.ElementTree as ET

def list_all( tagList ):
    tagListString = ''
    for tag in tagList:
        tagListString += tag.text + ' '
    return tagListString

def getBoardGameInfo( ID ):
    "get details about a board game by its ID on boardgamegeek"

    request = Request('http://www.boardgamegeek.com/xmlapi/boardgame/' + ID + '/')
    response = urlopen(request)
    resp = response.read()
    root = ET.fromstring(resp).find('boardgame')

    ret = ''

    #find the right name
    names = root.findall('name');
    for name in names:
        if name.get('primary') == 'true':
            ret += name.text + '\n'

    #number of players
    ret += root.find('minplayers').text + ' ' + root.find('maxplayers').text + '\n'

    #play time
    ret += root.find('maxplaytime').text + '\n'

    #image url
    ret += 'http:' + root.find('thumbnail').text + '\n'

    #categories
    ret += list_all( root.findall('boardgamecategory') ) + '\n'
    ret += list_all( root.findall('boardgamemechanic') ) + '\n'

    #best with number of players
    bestWithNo = '0'
    maxVote = -1

    polls = root.findall('poll')
    for poll in polls:
        if poll.get('name') == 'suggested_numplayers':
            pollResults = poll.findall('results')
            for pollResult in pollResults:
                val = int(pollResult[0].get('numvotes'))
                if val > maxVote:
                    maxVote = val
                    bestWithNo = pollResult.get('numplayers')

    ret += bestWithNo + '\n'

    return ret
