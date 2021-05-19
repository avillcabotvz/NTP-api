const jwt = require('jsonwebtoken');
const { checkUserPassword, getUser } = require('./users');

const JWT_SECRET = 'ja-sam-jako-siguran-password-koji-bi-trebal-bit-u-config-file';

// This is a so called middleware.
// You put it before the requests and it will check auth
// If auth is invalid, it will return an error code,
// otherwise it will call next() which will execute the route function thingie normaly
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const userData = jwt.verify(token, JWT_SECRET);
            console.log('Accepting jwt: ', token);
            req.user = userData;
            next();
        } catch (err) {
            console.warn('Invalid jwt token: ', err);
            res.status(403).json({ error: 'Forbidden. Invalid token' }); // Forbidden
        }
    } else {
        res.status(401).json({ error: 'Unathorized. Missing Authentication header with auth token.' });
    }
};

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({error: 'Missing username or password'});
        return;
    }
    console.log('Attempting login with', username, password);

    if (await checkUserPassword(username, password)) {
        const user = await getUser(username);
        const userData = {
            userid: user.id,
            username: user.username,
        };

        const token = jwt.sign(userData, JWT_SECRET, { algorithm: 'HS256' });
        res.json({ token });
    } else {
        res.status(401).json({error: 'Invalid username or password'});
    }
}

module.exports = {
    checkAuth,
    handleLogin,
};