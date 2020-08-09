const router = require('express').Router();
const UserRepository = require('../repository/UserRepository');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const userRepository = new UserRepository();

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const passwordRepeat = req.body.passwordRepeat;

    if (password !== passwordRepeat) {
        res.send('Passwords are not equals');
    }
    const usernameIsOccupied = await userRepository.findByUsername(username);

    if (usernameIsOccupied.length > 0) {
        res.send('Username is occupied');
    }

    const phash = await bcrypt.hash(password, saltRounds);
    const user = await userRepository.save(username, phash);
    req.session.loggedin = true;
    req.session.username = username;
    console.log(`Saved user: ${JSON.stringify(user)}`);
    res.redirect('/login');
});

router.post('/auth', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const user = await userRepository.findOneByUsername(username, password);
        if (user) {
            const passwordMatches = await bcrypt.compare(password, user.phash);
            if (passwordMatches) {
                handleSuccess();
            }
        }
        res.send('Incorrect Username and/or Password!');
    } else {
        res.send('Please enter Username and Password!');
    }

    function handleSuccess() {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
    }
});

router.post('/googleLogin', async (req, res) => {
    const {googleId, username, email} = req.body;

    const result = await userRepository.findByGoogleId(googleId);
    if(result.length < 1) {
        const user = await userRepository.save(username, null, email, googleId);
        console.log(`Saving user: ${JSON.stringify(user)}`);
    }

    req.session.loggedin = true;
    req.session.username = username;
    req.session.authMethod = 'google';
    req.session.save(() => res.redirect('/home'));
});

router.get('/logout', (req, res) => {
    req.session.loggedin = false;
    req.session.username = '';
    res.redirect('/');
});

module.exports = router;
