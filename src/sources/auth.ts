import { ISigninData, ISignupData, IUserDataResponse } from "@interfaces/http";
import HTTPService from "../services/http-transport";
import { BASE_URL, getBaseParameters } from "./constants";

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
  }).then((result: XMLHttpRequest) => JSON.parse(result.response));



