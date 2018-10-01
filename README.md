# redux-saga-login-react-example
The redux-saga login example with a super-essential UI, unit tests and E2E tests.

The Redux Saga library reports an interesting example on the docs, a complete login process.
You can find it [here](https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html).

Since it's my first touch with the generators I wrote the tests for every flow expected by the example itself.

How to tun the unit tests
```
$ npm install
$ npm test
```
and if you want to see the E2E tests running
```
$ npm install
$ npm run dev
# in another window
$ npm run start
# in another window too
$ npm run test:e2e
```

If you haven't the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=it) installed don't worry, every action dispatched is logged into the console.

# Test outputs
## Unit tests
```
 PASS  src/sagas/index.test.js
  login saga effects
    standard login flow
      ✓ it waits for a LOGIN_REQUEST action (4ms)
      ✓ then it forks the authorize method (1ms)
      ✓ then it waits for a LOGOUT or LOGIN_ERROR action
      ✓ then it cancels the authorize call on a LOGOUT action
      ✓ then it triggers a DELETE_TOKEN action
      ✓ and finally it waits again for a LOGIN_REQUEST action (1ms)
    login error flow
      ✓ if a LOGIN_ERROR action happens it doesn't cancel the authorize task (because it's the authorize task itself that triggers the LOGIN_ERROR action)
      ✓ neither it triggers a DELETE_TOKEN action (1ms)
  authorize saga effects
    standard login flow
      ✓ it calls the authorization method (1ms)
      ✓ then it triggers a LOGIN_SUCCESS action
      ✓ then it triggers a SAVE_TOKEN action
      ✓ finally it checks if it's been cancelled by another generator
    external cancellation
      ✓ It triggers a LOGIN_CANCELLED action if cancelled externally
    login error flow
      ✓ it triggers a LOGIN_ERROR action in case of login error

Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
Snapshots:   0 total
Time:        1.613s

```
## E2E tests
```
 PASS  test/login-saga.e2e.test.js
  login saga effects, e2e tests
    ✓ standard login flow (1081ms)
    ✓ login error flow (463ms)
    ✓ external cancellation (360ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        2.783s, estimated 4s
```

If you want to see the E2E tests running with your eyes open the `login-saga.e2e.test.js` file and set `headless` to false (and `slowMo` to 250)
```javascript
browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: true,
});
```


### Differences between my code and tha example's one
- I added a simple `fakeAuthorize` method simulate a real AJAX call
- I added two actions: SAVE_TOKEN and DELETE_TOKEN
- I move the token clearing into the `if (action.type === 'LOGOUT')` condition


This project has been bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
