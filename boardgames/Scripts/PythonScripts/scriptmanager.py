lines = []

def boardgameratings_sort():
    fileName = 'Scripts/PythonScripts/boardgameratings.py'

    fileHanldeRead = open(fileName, 'r')

    for line in fileHanldeRead:
        lines.append(line)

    lines.sort()

    fileHanldeRead.close()

    fileHanldeWrite = open(fileName, 'w')

    for line in lines:
        fileHanldeWrite.write(line)

    fileHanldeWrite.close()

    return

def getVarName( str ):
    return str.split()[0]

def boardgamelist_insert():
    fileName = 'Scripts/PythonScripts/boardgamelist.py'
    listName = 'boardGamesIDList'

    bgList = listName + ' = ['

    for line in lines:
        bgList += getVarName(line) + ', '

    bgList = bgList[:-2] + ']\n'

    fileHandleRead = open(fileName, 'r')

    fileLines = []
    lineIsReplaced = False
    for line in fileHandleRead:
        if listName in line and not lineIsReplaced:
            fileLines.append(bgList)
            lineIsReplaced = True
        else:
            fileLines.append(line)

    fileHandleRead.close()

    fileHanldeWrite = open(fileName, 'w')

    for line in fileLines:
        fileHanldeWrite.write(line)

    fileHanldeWrite.close()

    return

if __name__ == "__main__":
    boardgameratings_sort()
    boardgamelist_insert()
