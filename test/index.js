const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html> <html><body><main id="root"></main></body></html>', {
  url: 'http://localhost:3000',
});

global.window = dom.window;
global.document = dom.window.document;
global.DocumentFragment = dom.window.DocumentFragment;
