import { Store } from './index';
import { expect } from 'chai';


describe('store', () => {
  it('Setting data', () => {
    const storage = new Store();
    const value = 'Cristiano Ronaldo';
    const key = 'user';
    storage.set(key, value);
    const state = storage.getState();
    expect(state[key]).to.eq(value)
  });

  it('Updating data', () => {
    const storage = new Store();
    const state = storage.getState();
    const key = 'user';
    const oldValue = 'Cristiano Ronaldo';
    storage.set(key, oldValue);
    expect(state[key]).to.eq(oldValue);
    const value = 'Lionel Messi';
    storage.set(key, value);
    expect(state[key]).to.eq(value);
  });

  it('Delete data', () => {
    const storage = new Store();
    const state = storage.getState();
    const value = 'John Doe';
    const key = 'user';
    storage.set(key, value);
    storage.remove(key);
    expect(state[key]).to.be.undefined;
  });
});
