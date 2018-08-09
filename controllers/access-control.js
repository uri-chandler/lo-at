// our data-access layer
const dal = require('../data-access/access-control');


// constants
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


async function createNewUser(username, password) {
    await dal.createNewUser(username, password);
}


module.exports = {
    checkCredentials,
    hasUser,
    createNewUser
};