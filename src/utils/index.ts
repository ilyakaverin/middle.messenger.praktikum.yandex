export const collectData = (formId: string): void => {
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

  console.log(result);
};
