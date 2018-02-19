// @flow
export type Timer = {
  name: string,
  time: number,
  paused: boolean,
  id: string,
  x: number,
  y: number
};

export type ModTimer = {
  name?: string,
  time?: number,
  paused?: boolean,
  id?: string,
  x?: number,
  y?: number
};
