// @flow
export type Timer = {
  name: string,
  time: number,
  paused: boolean,
  id: string
};

export type ModTimer = {
  name?: string,
  time?: number,
  paused?: boolean,
  id?: string
};
