
export type jerseyNumbers = 8 | 11 | 5 | 17 | 7;

export type playersName = 'Bruno Fernandes' | 'Rasmus Hojlund' | 'Harry Maguire' | 'Alejandro Garnacho' | 'Mason Mount';

export type stadistics = 'Goals' | 'Speed' | 'Assists' | 'Acurracy' | 'Defensive Involvements';

export type player = {
  name: playersName,
  jerseyNumber: jerseyNumbers,
  goals: number,
  speedPoints: number,
  assistsPoints: number,
  passingAccuracy: number,
  defensiveInvolvements: number

}
