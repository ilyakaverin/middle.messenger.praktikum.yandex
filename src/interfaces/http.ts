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
}
export type HTTPMethod = (
  url: string,
  options?: IRequestOptions
) => Promise<unknown>;
