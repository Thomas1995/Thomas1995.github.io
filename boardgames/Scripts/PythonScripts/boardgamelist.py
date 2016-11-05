from boardgameinfo import getBoardGameInfo
import sys

bg_GameOfThrones = [103343, 10]
bg_ShadowHunters = [24068, 10]

boardGamesIDList = [bg_GameOfThrones, bg_ShadowHunters]

def main():
    if len(sys.argv) >= 2 :
        outputFile = open(sys.argv[1], 'w+')

        for bgID in boardGamesIDList:
            ret = getBoardGameInfo( str(bgID[0]) )
            outputFile.write( ret + str(bgID[1]) + "\n\n" )

        outputFile.close()

if __name__ == "__main__":
    main()
