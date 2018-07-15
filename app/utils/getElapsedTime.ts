export default (baseTime: number, startedAt?: number) => {
  if (!startedAt) {
    return baseTime || 0;
  }
  return Date.now() - startedAt + baseTime;
};
