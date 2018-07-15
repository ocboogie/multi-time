export default (isValid: any) => {
  switch (isValid) {
    case true:
      return "valid";
    case null:
      return "";
    default:
      return "invalid";
  }
};
