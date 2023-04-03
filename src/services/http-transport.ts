import { REQUEST_TYPE, IRequestOptions } from "../interfaces/http";

function queryStringify(data: XMLHttpRequestBodyInit) {
  return `?${Object.entries(data)
    .map((obj: string[]) => `${obj[0]}=${obj[1]}`)
    .join("&")}`;
}

class HTTPTransport {
  get = (url: string, options: IRequestOptions = {}) =>
    this.request(
      url,
      { ...options, method: REQUEST_TYPE.GET },
      options.timeout
    );
  post = (url: string, options: IRequestOptions = {}) =>
    this.request(
      url,
      { ...options, method: REQUEST_TYPE.POST },
      options.timeout
    );

  put = (url: string, options: IRequestOptions = {}) =>
    this.request(
      url,
      { ...options, method: REQUEST_TYPE.PUT },
      options.timeout
    );

  delete = (url: string, options: IRequestOptions = {}) =>
    this.request(
      url,
      { ...options, method: REQUEST_TYPE.DELETE },
      options.timeout
    );

  request = (
    url: string,
    options: IRequestOptions = { method: REQUEST_TYPE.GET },
    timeout = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        method as REQUEST_TYPE,
        method === REQUEST_TYPE.GET && !!data ? url + queryStringify(data) : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === REQUEST_TYPE.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

const HTTPService = new HTTPTransport();

export default HTTPService