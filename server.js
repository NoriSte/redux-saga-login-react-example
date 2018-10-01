const express = require('express');
const delay = require('express-delay');

const app = express();
const port = 3001;

app.use(delay(500));

app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/login', (req, res) => {
    res.set({ 'content-type': 'application/json;charset=utf-8' })
    res.send(JSON.stringify({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }));
});
