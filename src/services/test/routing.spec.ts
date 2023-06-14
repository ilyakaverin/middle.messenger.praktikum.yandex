import { expect } from 'chai';
import { beforeEach } from 'mocha';
import router from '../router';
import { routes } from '../../interfaces/enums';
import { Block } from '../block';

class Mock extends Block {}

describe('Router', () => {
  beforeEach(() => {
    router.use(routes.login, Mock).use(routes.register, Mock).start();
  });

  it('must be defined', () => {
    expect(router).to.exist
  });

  it('router go', () => {
    router.go(routes.register);
    expect(window.location.pathname).to.eq(routes.register);
  });

  it('should return length of history === 3', () => {
    router.go(routes.register);
    expect(window.history.length).to.eq(3)
  });

});
