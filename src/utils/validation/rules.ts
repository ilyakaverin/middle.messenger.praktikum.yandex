export const LOGIN_REGEX = /^[a-zA-Z]+[a-zA-Z0-9_-]*$/;
export const NAME_REGEX = /^([А-ЯЁA-Z][а-яёa-z]*)$/;
export const EMAIL_REGEX = /^[^ @]+@[^ @]+\.[^ @]+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/;
export const PHONE_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export type StringCheckFunction = (value: string) => string | null;

export const minLength = (length: number) => (value: string) =>
  value && value.length < length ? `minimum length is ${length}` : null;

export const maxLength = (length: number) => (value: string) =>
  value && value.length > length ? `maximum length is ${length}` : null;

export const isInvalidString = (regex: RegExp, errorText: string) => (value: string) =>
  regex.test(value) ? null : errorText;

export const isEmptyString = (value: string) => value.trim().length === 0;
export const combineRules =
  (value: string) =>
  (...functions: StringCheckFunction[]) => {
    const results = functions.map((fn) => {
      return fn(value);
    });

    return results.filter((item) => item !== null);
  };
