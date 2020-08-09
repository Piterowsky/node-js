const router = require('express').Router();
const path = require('path');

router.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.render(path.join(__dirname, '..', 'template', 'home.ejs'), {
            username: req.session.username,
            authMethod: req.session.authMethod
        });
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'login.html'));
});

router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
