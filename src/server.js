import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';

const app = express();

app.disable('x-powered-by');

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const customMid = (req, res, next) => {
    if (!req.locals) {
        req.locals = {
            counter:  0
        };
    }
    else {
        req.locals.counter = req.locals.counter + 1;
    }
    console.log(req.locals.counter);
    next();
};

app.get('/', [customMid, customMid, customMid, customMid], (req, res) => res.send('Hello World'));
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
