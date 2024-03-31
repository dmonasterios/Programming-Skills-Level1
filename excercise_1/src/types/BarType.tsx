import { stadistics, player } from "./playerType";

export type colors = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'amber';

export type values = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type detail = {
  description : stadistics,
  color: colors,
  key: keyof player
}