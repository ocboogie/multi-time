// @flow
export type Timer = {
  name: string | null,
  time: number,
  paused: boolean,
  id: string
};

export type ModTimer = {
  // $FlowIssue
  name?: string | null,
  time?: number,
  paused?: boolean,
  id?: string
};
