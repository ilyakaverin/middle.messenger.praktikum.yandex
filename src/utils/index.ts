import { Indexed } from "../interfaces/components";
import { Block } from "../services/block";

const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
  return isPlainObject(value) || isArray(value);
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};

const isArray = (value: unknown): value is [] => {
  return Array.isArray(value);
};

const isPlainObject = (value: unknown): value is PlainObject => {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
};

export const collectData = (formId: string) => {
  const form: HTMLElement | null = document.getElementById(formId);
  const formData = new FormData(form as HTMLFormElement);
  const keys = [];
  const values: string[] = [];

  for (const key of formData.keys()) {
    keys.push(key);
  }

  for (const value of formData.values()) {
    values.push(value as string);
  }

  const result = keys.reduce((acc: any, item: string, index) => {
    acc[item] = values[index];

    return acc;
  }, {});

  return result;
};

export const isEqual = (lhs: PlainObject | string, rhs: PlainObject) => {
  if (!lhs || !rhs) {
    return false;
  }

  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value as PlainObject, rightValue as PlainObject)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
};

const merge = (lhs: PlainObject<any>, rhs: PlainObject<any>) => {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p], rhs[p]);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`error`);
  }

  root.innerHTML = "";

  root.append(block.getContent()!);

  return root;
};

export const mutateErrorsObject = (
  validationResult: string[],
  objectToMutate: Record<string, string[]>,
  key: string
) => {
  if (!validationResult) {
    objectToMutate[key] = [];
    return;
  }

  if (validationResult.length > 0) {
    objectToMutate[key] = validationResult;
  } else {
    objectToMutate[key] = [];
  }
};

export const isValuesNotEmpty = (object: Record<string, string>) =>
  Object.values(object).every((value) => value);

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown => {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );

  return merge(object as Indexed, result);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
};

export const debounce = (func: Function, delay: number) => {
  let timer: number;

  return function (...args: unknown[]) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const throttle = (func: Function, delay: number) => {
  let lastExecutionTime = 0;
  let timeout: number;

  return function (...args: unknown[]) {
    const currentTime = Date.now();
    const context = this;

    if (currentTime - lastExecutionTime < delay) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastExecutionTime = currentTime;
        func.apply(context, args);
      }, delay);
    } else {
      lastExecutionTime = currentTime;
      func.apply(context, args);
    }
  };
};

export const collectCheckboxValues = (name: string, formName: string) => {
  const form = document.getElementById(formName);
  const checkboxes = form.querySelectorAll(`input[name="${name}"]:checked`);

  return Array.from(checkboxes).map((checkbox) => checkbox.value);
};

export const cutStringIfLong = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};
