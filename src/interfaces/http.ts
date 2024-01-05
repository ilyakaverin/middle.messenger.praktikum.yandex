export enum REQUEST_TYPE {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export interface IRequestOptions {
  method?: REQUEST_TYPE;
  timeout?: number;
  headers?: Record<string, string>;
  data?: XMLHttpRequestBodyInit;
  mode?: string
}
export type HTTPMethod = (
  url: string,
  options?: IRequestOptions
) => Promise<unknown>;

export interface ISignupData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface ISigninData {
  login: string,
  password: string
}

export interface IUserDataResponse {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}