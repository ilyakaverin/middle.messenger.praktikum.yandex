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
    isInvalidString(
      LOGIN_REGEX,
      "Логин не должен содержать спецсимволы или пробелы"
    ),
    minLength(3),
    maxLength(20)
  );

  return validationResult;
};
export const newChatValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(
      LOGIN_REGEX,
      "Название чата не должно содержать спецсимволы или пробелы"
    ),
    maxLength(20)
  );

  return validationResult;
};
export const passwordValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(
      PASSWORD_REGEX,
      "Пароль должен содержать заглавную букву и спецсимвол"
    ),
    minLength(8),
    maxLength(40)
  );

  return validationResult;
};
export const nameValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(
      NAME_REGEX,
      `${value}: Поле не должно содержать пробелы, спецсимволы и содержать заглавную букву`
    )
  );

  return validationResult;
};

export const confirmValidationScheme = (
  oldPassword: string,
  newPassword: string
) => (oldPassword !== newPassword ? ["Пароли не совпадают"] : []);

export const displayNameValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(
      LOGIN_REGEX,
      `${value}: Поле не должно содержать пробелы, спецсимволы`
    )
  );

  return validationResult;
};
export const emailValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(EMAIL_REGEX, "Почта не выглядит как электронная почта")
  );

  return validationResult;
};

export const phoneValidationScheme = (value: string) => {
  if (typeof value !== "string" || isEmptyString(value)) return;

  const validationResult = combineRules(value)(
    isInvalidString(
      PHONE_REGEX,
      `${value}: Поле должно содержать минимум 10 цифр и начинаться с +`
    ),
    minLength(10),
    maxLength(15)
  );

  return validationResult;
};
