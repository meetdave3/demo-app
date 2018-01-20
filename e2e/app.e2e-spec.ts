import { CodepostnetPage } from './app.po';

describe('codepostnet App', () => {
  let page: CodepostnetPage;

  beforeEach(() => {
    page = new CodepostnetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
