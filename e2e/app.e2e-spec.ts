import { ElephantBoxPage } from './app.po';

describe('elephant-box App', () => {
  let page: ElephantBoxPage;

  beforeEach(() => {
    page = new ElephantBoxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
