import HTTPService from "../services/http-transport";
import { BASE_URL, getBaseParameters } from "./constants";

interface ISignupData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  }

interface ISigninData {
    login: string,
    password: string
  }

interface IUserDataResponse {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
  }

export const signup = (parameters: ISignupData) =>
  HTTPService.post(
    `${BASE_URL}/auth/signup`,
    getBaseParameters(parameters)
  ).then((response: XMLHttpRequest) => ({
    message: JSON.parse(response.responseText),
    code: response.status,
  }));

export const signin = (parameters: ISigninData) =>
  HTTPService.post(`${BASE_URL}/auth/signin`, getBaseParameters(parameters));

export const logout = () => HTTPService.post(`${BASE_URL}/auth/logout`);

export const getUser = (): Promise<IUserDataResponse> =>
  HTTPService.get(`${BASE_URL}/auth/user`, {
    mode: "cors",
  }).then((r: XMLHttpRequest) => JSON.parse(r.response));



