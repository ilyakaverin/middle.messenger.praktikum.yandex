import {
  combineRules,
  EMAIL_REGEX,
  isEmptyString,
  isInvalidString,
  LOGIN_REGEX,
  maxLength,
  minLength,
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from "./rules";

export const loginValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(LOGIN_REGEX),
    minLength(3),
    maxLength(20)
  );

  if (validationResult.length > 0) {
    alert(validationResult);
  }
};
export const passwordValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(PASSWORD_REGEX),
    minLength(8),
    maxLength(40)
  );

  if (validationResult.length > 0) {
    alert(validationResult);
  }
};
export const nameValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(isInvalidString(NAME_REGEX));

  if (validationResult.length > 0) {
    alert(validationResult);
  }
};
export const emailValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(isInvalidString(EMAIL_REGEX));

  if (validationResult.length > 0) {
    alert(validationResult);
  }
};

export const phoneValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(PHONE_REGEX),
    minLength(10),
    maxLength(15)
  );

  if (validationResult.length > 0) {
    alert(validationResult);
  }
};
