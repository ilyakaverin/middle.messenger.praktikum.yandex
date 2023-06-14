import HttpService from '../http-transport';
import { expect } from 'chai';

type Response = { response: 'DELETE' | 'GET' | 'POST' | 'PUT '}

describe('http', () => {

    it("Returns 'GET' method", () => {
        HttpService.get('GET').then((res: Response) => {
            expect(res.response).to.eq('GET');
        });
    });
    it("Returns 'POST' method", () => {
        HttpService.get('POST').then((res: Response) => {
            expect(res.response).to.eq('POST');
        });
    });
    it("Returns 'PUT' method", () => {
        HttpService.get('PUT').then((res: Response) => {
            expect(res.response).to.eq('PUT');
        });
    });
    it("Returns 'DELETE' method", () => {
        HttpService.get('DELETE').then((res: Response) => {
            expect(res.response).to.eq('DELETE');
        });
    });
});