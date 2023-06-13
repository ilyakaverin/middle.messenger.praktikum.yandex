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
  HTTPService.put(`${BASE_URL}/chats/users`, getBaseParameters(parameters));

export const getChatUsers = (id: number) =>
  HTTPService.get(`${BASE_URL}/chats/${id}/users`).then(
    (response: XMLHttpRequest) => ({
      message: JSON.parse(response.responseText),
      code: response.status,
    })
  );

export const deleteChat = (id: { chatId: string }) =>
  HTTPService.delete(`${BASE_URL}/chats`, getBaseParameters(id)).then(
    (response: XMLHttpRequest) => ({
      message: JSON.parse(response.responseText),
      code: response.status,
    })
  );

export const deleteUserFromChat = (parameters: unknown) =>
  HTTPService.delete(`${BASE_URL}/chats/users`, getBaseParameters(parameters));
