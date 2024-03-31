export type menuOptions = 'Menu' | 'PlayerReview' |'ComparePlayers'
|'IdentifyHighestGoals'
|'IdentifyHighestSpeedPoints'
|'IdentifyHighestAssistsPoints'
|'IdentifyHighestPassingAccuracy'
|'IdentifyHighestDefensiveInvolvements'


export type menuType = {
  [key in menuOptions]: JSX.Element
}