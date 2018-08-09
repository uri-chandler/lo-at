const sql = require('sqlite');


// constants
const USERS_TABLE_NAME = process.env.USERS_TABLE_NAME || 'Users';


// initializtion
let db = null;



/**
 * Makes sure our DB is properly opened
 */
async function ensureDB() {
    if (db === null)
        db = await sql.open(__dirname + '/access-control.sqlite');
}

/**
 * Makes sure that we have a "Users" table.
 * If we don't, we'll create an empty one
 */
async function ensuerUsersTable() {
    try {
        await db.run(`CREATE TABLE ${USERS_TABLE_NAME} ( username varchar(255), password varchar(255) )`);
    }
    catch (error) {
        // table already exists
        // TODO: Learn SQL to better handle this scenario, try-catch is a lazy way to do it...
    }
}

/**
 * Returns the requested user from the database,
 * or null if the user is not found
 *
 * !!WARNING!! This is for demonstration purposes only!
 * !!WARNING!! An attacker can exploit this for Malicious SQL Injections!
 */
async function getUser(username) {
    await ensureDB();
    await ensuerUsersTable();

    const user = await db.get(`SELECT * FROM ${USERS_TABLE_NAME} WHERE username = "${username}"`);
    return user || null;
}

/**
 * Creates a new user
 */
async function createNewUser(username, password) {
    await db.run(`INSERT INTO ${USERS_TABLE_NAME} (username, password) VALUES ("${username}", "${password}")`);
}


module.exports = {
    getUser,
    createNewUser
};