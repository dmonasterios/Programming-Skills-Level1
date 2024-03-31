import { player , stadistics } from "../types/playerType";

type response = {
  msg : string,
  player : player
};

const playerKeys = {
  'Goals' : 'goals',
  'Speed' : 'speedPoints',
  'Assists' : 'assistsPoints',
  'Acurracy' : 'passingAccuracy',
  'Defensive Involvements' : 'defensiveInvolvements',
};

const message = {
  'Goals' : 'The top goal scorer is ',
  'Speed' : 'The fastest player is ',
  'Assists' : 'The player with the most assists is ',
  'Acurracy' : 'The player with the highest passing accuracy is ',
  'Defensive Involvements' : 'The player with the most defensive involvements is ',
}
export default function getBestPlayerByStadistic(players: player[], stadistic : stadistics) : response{
  const key = playerKeys[stadistic] as keyof player;

  const bestPlayer = players.reduce((bestPlayer ,player) => {
    return bestPlayer[key] < player[key] ? player : bestPlayer
  }, players[0]);


  return {
    msg: `${message[stadistic]} ${bestPlayer.name} with ${bestPlayer[key]} ${stadistic === 'Goals' ? 'goals' : 'points'}`,
    player : bestPlayer
  };
}