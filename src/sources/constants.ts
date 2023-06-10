export const BASE_URL = "https://ya-praktikum.tech/api/v2";

export const getBaseParameters = (parameters: unknown) => ({
  data: JSON.stringify(parameters),
  mode: "cors",
  headers: {
    "Content-type": "application/json",
  },
});

export const getAvatarRequestParameters = (parameters: FormData) => ({
  data: parameters,
  mode: "cors",
  headers: {},
});

export const editScheme = [
  "first_name",
  "second_name",
  "display_name",
  "login",
  "email",
  "phone",
  "avatar",
];

export const isLogged = () => localStorage.getItem("logged");
