import { jerseyNumbers, player } from "../types/playerType";

export default function getPlayerInfo(
  playerNumber: jerseyNumbers,
  players: player[]
): player | undefined {
  return players.find((player) => (player.jerseyNumber === playerNumber));
}
