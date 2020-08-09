require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const AuthRouter = require('./src/route/AuthRouter');
const ViewRouter = require('./src/route/ViewRouter');

const app = express();

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(AuthRouter);
app.use(ViewRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
