// @flow

// eslint-disable-next-line no-undef
export default (event: SyntheticKeyboardEvent<HTMLAnchorElement>) => {
  if (event.key === "Enter") {
    // $FlowIssue
    event.target.click();
  }
};
