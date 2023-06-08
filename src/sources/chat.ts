import HTTPService from "../services/http-transport";
import { BASE_URL, getBaseParameters } from "./constants";

interface ICreateChat {
  title: string;
}

export const createChat = (parameters: ICreateChat) =>
  HTTPService.post(`${BASE_URL}/chats`, getBaseParameters(parameters));

export const getChats = () =>
  HTTPService.get(`${BASE_URL}/chats`).then((response: XMLHttpRequest) => ({
    message: JSON.parse(response.responseText),
    code: response.status,
  }));

export const connectToChat = (id: number) =>
  HTTPService.post(`${BASE_URL}/chats/token/${id}`).then(
    (response: XMLHttpRequest) => ({
      message: JSON.parse(response.responseText),
      code: response.status,
    })
  );

export const addUser = (parameters: unknown) =>
  HTTPService.put(
    `${BASE_URL}/chats/users`,
    getBaseParameters(parameters)
  ).then((response: XMLHttpRequest) => ({
    message: JSON.parse(response.responseText),
    code: response.status,
  }));
