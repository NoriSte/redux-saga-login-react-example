import { setDefaultOptions } from 'expect-puppeteer';
import puppeteer from 'puppeteer';
import { LOGGED_IN, LOGGED_OUT, LOGIN_CANCELLED, LOGIN_ERROR } from './../src/statusTypes';


setDefaultOptions({ timeout: 2000 });

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: true,
  });
});
afterAll(async () => {
  await browser.close();
});


describe('login saga effects, e2e tests', () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  test('standard login flow', async () => {
    await expect(page).toClick('button', { text: 'Login' });
    await expect(page).toMatch(`status: ${LOGGED_IN}`);
    await expect(page).toClick('button', { text: 'Logout' });
    await expect(page).toMatch(`status: ${LOGGED_OUT}`);
  }, 5000);

  test('login error flow', async () => {
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.url().endsWith('/login')) {
        request.respond({
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
          status: 500,
        });
      }
      else {
        request.continue();
      }
    });

    await expect(page).toClick('button', { text: 'Login' });
    await expect(page).toMatch(`status: ${LOGIN_ERROR}`);

    await page.setRequestInterception(false);
  }, 5000);

  test('external cancellation', async () => {
    await expect(page).toClick('button', { text: 'Login' });
    await expect(page).toClick('button', { text: 'Logout' });
    await expect(page).toMatch(`status: ${LOGIN_CANCELLED}`);
  }, 5000);

});
