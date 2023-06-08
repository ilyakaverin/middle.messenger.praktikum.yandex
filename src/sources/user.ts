import HTTPService from "../services/http-transport";
import { BASE_URL, getBaseParameters } from "./constants";

export const changeProfile = (parameters: unknown) =>
  HTTPService.put(
    `${BASE_URL}/user/profile`,
    getBaseParameters(parameters)
  ).then((response: XMLHttpRequest) => ({
    message: JSON.parse(response.responseText),
    code: response.status,
  }));

export const changePassword = (parameters: unknown) =>
  HTTPService.put(`${BASE_URL}/user/password`, getBaseParameters(parameters));

export const userSearch = (parameters: unknown) =>
  HTTPService.post(
    `${BASE_URL}/user/search`,
    getBaseParameters(parameters)
  ).then((response: XMLHttpRequest) => ({
    message: JSON.parse(response.responseText),
    code: response.status,
  }));
