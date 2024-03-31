import { player, playersName , stadistics } from "../types/playerType";

type playersType = {
  first: player,
  second: player
}

const playerKeys = {
  'Goals' : 'goals',
  'Speed' : 'speedPoints',
  'Assists' : 'assistsPoints',
  'Acurracy' : 'passingAccuracy',
  'Defensive Involvements' : 'defensiveInvolvements',

}


export default function comparePlayersByStadistic(players: playersType, stadistic: stadistics) : string {
  const key = playerKeys[stadistic] as keyof player;
  let name : playersName;

  if(players.first[key] === players.second[key]){
    if(stadistic === 'Goals') return 'Both players have scored the same number of goals';
    return 'Both players has te same points in ' + stadistic;
  }

  if(players.first[key] > players.second[key]) name = players.first.name;
  else name = players.second.name;

  if(stadistic === 'Goals') return name + '  has scored more ' + stadistic;

  return name + ' has more points in ' + stadistic;
}

