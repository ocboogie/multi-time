// @flow
import list from "english-list";
import PasswordValidator from "password-validator";

const schema = new PasswordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits();

const replacements = {
  digits: "digit",
  uppercase: "uppercase letter",
  lowercase: "lowercase letter"
};

export default (value: string) => {
  const isValid = schema.validate(value, { list: true });
  if (isValid.length === 0) {
    return true;
  }
  let msg = "Your password must ";
  let hasLengthMessage = false;
  const indexOfMin = isValid.indexOf("min");
  if (indexOfMin !== -1) {
    isValid.splice(indexOfMin, 1);
    hasLengthMessage = true;
    msg += "be at least 8 characters long";
  } else {
    const indexOfMax = isValid.indexOf("max");
    if (indexOfMax !== -1) {
      isValid.splice(indexOfMax, 1);
      hasLengthMessage = true;
      msg += "be at most 100 characters long";
    }
  }
  if (isValid.length > 0) {
    msg += `${hasLengthMessage ? " and " : " "}include at least one ${list(
      "and",
      isValid.map(element => replacements[element])
    )}`;
  }
  return msg;
};
