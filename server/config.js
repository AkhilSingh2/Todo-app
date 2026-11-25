"use strict";
const path = require("path");

// DEV-ONLY fallback. This is not a credential. It is used only when
// JWT_SECRET is unset and NODE_ENV is not "production".
const DEV_ONLY_JWT_SECRET = "dev-only-insecure-jwt-secret";

function resolveJwtSecret() {
    const configured = process.env.JWT_SECRET;
    if (configured && configured.trim()) {
        return configured;
    }
    if (process.env.NODE_ENV === "production") {
        throw new Error(
            "JWT_SECRET is not set. Refusing to start in production. " +
            "Set JWT_SECRET in the environment (see .env.example)."
        );
    }
    console.warn(
        "[dev-only] JWT_SECRET is unset. Using the insecure development fallback " +
        "labeled DEV_ONLY_JWT_SECRET. Set JWT_SECRET before any shared or production use."
    );
    return DEV_ONLY_JWT_SECRET;
}

module.exports = {
    secret: resolveJwtSecret(),
    dbFile: process.env.DB_FILE || path.join("data", "app.db")
};
