from boardgameinfo import getBoardGameInfo
from boardgameratings import *
import sys

boardGamesIDList = [bg_Alchemists, bg_BattlestarGalactica, bg_BetrayalAtHouseOnHill, bg_Coup, bg_GameOfThrones, bg_JungleSpeed, bg_KingOfNewYork, bg_LoveLetter, bg_MonopolyLondon, bg_MonsterFluxx, bg_Praetor, bg_Resistance, bg_RiskTWD, bg_Saboteur, bg_ShadowHunters, bg_SheriffOfNottingham, bg_Solo, bg_TicketToRideEu, bg_UltimateWerewolf, bg_VikingWarriorsOfTheNorth]

if __name__ == "__main__":
    if len(sys.argv) >= 2 :
        outputFile = open(sys.argv[1], 'w+')

        for bgID in boardGamesIDList:
            ret = getBoardGameInfo( str(bgID[0]) )
            outputFile.write( ret + str(bgID[1]) + "\n\n" )

        outputFile.close()
