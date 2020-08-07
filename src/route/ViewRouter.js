const router = require('express').Router();

router.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

router.get('/login', (req, res) => {
    res.sendFile(require('path').join(__dirname, '..', '..', 'public', 'login.html'));
});

module.exports = router;
