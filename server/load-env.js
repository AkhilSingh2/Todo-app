"use strict";
const fs = require("fs");
const path = require("path");

// Load KEY=VALUE lines from .env into process.env. Existing variables win,
// so a real environment (or a test) is never overwritten by the file.
function loadEnv(file) {
    const envFile = file || path.join(__dirname, "..", ".env");
    if (!fs.existsSync(envFile)) return;

    const text = fs.readFileSync(envFile, "utf8");
    text.split(/\r?\n/).forEach(function (rawLine) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) return;
        const eq = line.indexOf("=");
        if (eq <= 0) return;
        const key = line.slice(0, eq).trim();
        if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) return;
        let value = line.slice(eq + 1).trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        process.env[key] = value;
    });
}

module.exports = loadEnv;
