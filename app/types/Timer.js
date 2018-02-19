// @flow
export type Timer = {
  name: string,
  time: number,
  paused: boolean,
  id: string,
  position: number
};

export type ModTimer = {
  name?: string,
  time?: number,
  paused?: boolean,
  id?: string,
  position?: number
};
