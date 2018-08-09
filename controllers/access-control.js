const jwt = require('jsonwebtoken');
const dal = require('../data-access/access-control');  // our data-access layer


// constants
const TWENTY_MIN = 60 * 20; // seconds times minutes
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'abc123';
const CREDENTIALS_STATUS = {
    NO_USER: -1,
    INVALID: 0,
    VALID: 1
};


/**
 * Checks in the DB if the passed in credentials are valid
 */
async function checkCredentials(username, password) {
    const user = await dal.getUser(username);

    if (user === null)
        return CREDENTIALS_STATUS.NO_USER;

    if (user.username !== username)
        return CREDENTIALS_STATUS.INVALID;

    if (user.password !== password)
    return CREDENTIALS_STATUS.INVALID;


    return CREDENTIALS_STATUS.VALID;
}


/**
 * Returns true or false, based on whether or not the username exists in the system
 */
async function hasUser(username) {
    const user = await dal.getUser(username);
    return Boolean(user);
}


/**
 * Creates a new user in our database
 */
async function createNewUser(username, password) {
    // TODO: Normally, we'd have some input validation here
    await dal.createNewUser(username, password);
}


/**
 * Creates a new access token
 */
function createNewAccessToken(username) {
    return jwt.sign(username, ACCESS_TOKEN_SECRET);
}



module.exports = {
    checkCredentials,
    hasUser,
    createNewUser,
    createNewAccessToken
};