const pool = require('./dbConnection');
const crypto = require('crypto');

// Svaki user ima i salt uz password, to sluzi da nemres imat pred-definiranu
// listu gotovih hasheva za brute forcing (tzv. rainbow table).
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('base64');
}

async function getUser(username) {
    const result = await pool.query(`
        SELECT * FROM users
        WHERE username = $1
    `, [username]);

    return result.rows[0] ?? null;
}

async function createUser(username, password) {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = hashPassword(password, salt);

    console.log('Hashed: ', hash);
    console.log('Hashed again: ', hashPassword(password, salt));

    await pool.query(`
        INSERT INTO users (username, password_hash, salt)
        VALUES ($1, $2, $3)
    `, [username, hash, salt]);
}

async function setUserPassword(username, password) {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = hashPassword(password, salt);

    await pool.query(`
        UPDATE users
        SET
            password_hash = $1,
            salt = $2
        WHERE username = $3
    `, [hash, salt, username]);
}

async function checkUserPassword(username, password) {
    const user = await getUser(username);
    if (!user) {
        return false;
    }

    const hash = hashPassword(password, user.salt);

    return hash === user.password_hash;
}

module.exports = {
    getUser,
    createUser,
    setUserPassword,
    checkUserPassword
};
