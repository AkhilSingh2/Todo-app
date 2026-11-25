"use strict";
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

class Db {
    constructor(file) {
        this.file = file;
        const directory = path.dirname(path.resolve(file));
        fs.mkdirSync(directory, { recursive: true });
        this.db = new sqlite3.Database(file);
    }

    // Schema migration. Safe to run on every startup.
    // No accounts are seeded: users are created through the register routes,
    // so this file does not embed passwords.
    migrate(callback) {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                user_pass text,
                is_admin integer)`;
        return this.db.run(sql, callback);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE email = ?`,
            [email], function (err, row) {
                callback(err, row);
            });
    }

    insertAdmin(user, callback) {
        return this.db.run(
            "INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)",
            user, (err) => {
                callback(err);
            });
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function (err, rows) {
            callback(err, rows);
        });
    }

    insert(user, callback) {
        return this.db.run(
            "INSERT INTO user (name,email,user_pass) VALUES (?,?,?)",
            user, (err) => {
                callback(err);
            });
    }
}

module.exports = Db;
