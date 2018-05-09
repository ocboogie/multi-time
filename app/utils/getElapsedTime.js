// @flow
export default (
  baseTime: number,
  startedAt: number,
  stoppedAt: number = new Date().getTime()
) => {
  if (!startedAt) {
    return baseTime || 0;
  }
  return stoppedAt - startedAt + baseTime;
};
