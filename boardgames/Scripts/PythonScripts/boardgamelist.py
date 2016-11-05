from boardgameinfo import getBoardGameInfo
import sys

bg_Alchemists = [161970, 10]
bg_BattlestarGalactica = [37111, 8]
bg_BetrayalAtHouseOnHill = [10547, 10]
bg_Coup = [131357, 6]
bg_GameOfThrones = [103343, 10]
bg_JungleSpeed = [8098, 8]
bg_KingOfNewYork = [160499, 9]
bg_LoveLetter = [129622, 8]
bg_MonopolyLondon = [17250, 6]
bg_MonsterFluxx = [149130, 8]
bg_Praetor = [137776, 4]
bg_Resistance = [41114, 10]
bg_RiskTWD = [147568, 7]
bg_Saboteur = [9220, 6]
bg_ShadowHunters = [24068, 10]
bg_SheriffOfNottingham = [157969, 7]
bg_Solo = [3347, 3]
bg_TicketToRideEu = [14996, 9]
bg_UltimateWerewolf = [38159, 5]
bg_VikingWarriorsOfTheNorth = [146275, 10]

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
