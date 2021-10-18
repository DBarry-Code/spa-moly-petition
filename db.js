const spicedPg = require("spiced-pg");
const { hash, compare } = require("./bcrypt");
const { db_user, db_key, db_name } = require("./secrets.json");

const db = spicedPg(`postgres:${db_user}:${db_key}@localhost:5432/${db_name}`);

function createSignatures({ first_name, last_name, signature }) {
    return db
        .query(
            `INSERT INTO signatures (first_name, last_name, signature)
        VALUES($1, $2, $3)
        RETURNING *`,
            [first_name, last_name, signature]
        )
        .then((result) => result.rows[0]);
}

function getSignatures() {
    return db.query("SELECT * FROM signatures").then((result) => result.rows);
}

function getSignatureCount() {
    return db
        .query("SELECT COUNT(id) FROM signatures")
        .then((result) => result.rows[0].count);
}

function getSignatureById(id) {
    return db
        .query("SELECT * FROM signatures WHERE id = $1", [id])
        .then((result) => result.rows[0]);
}

function createUser({ first_name, last_name, email, password }) {
    return hash(password).then((password_hash) => {
        return db
            .query(
                `INSERT INTO users (first_name, last_name, email, password_hash) VALUES($1, $2, $3, $4)
            RETURNING *`,
                [first_name, last_name, email, password_hash]
            )
            .then((result) => result.rows[0]);
    });
}

module.exports = {
    createSignatures,
    getSignatures,
    getSignatureById,
    getSignatureCount,
    createUser,
};
