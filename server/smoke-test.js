"use strict";
const assert = require("assert");
const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");

const root = path.join(__dirname, "..");

function spawnNode(args, env) {
    return spawnSync(process.execPath, args, {
        cwd: root,
        env: env,
        encoding: "utf8"
    });
}

function envWithoutJwt(extra) {
    const env = Object.assign({}, process.env, extra);
    delete env.JWT_SECRET;
    return env;
}

function postJson(port, urlPath, body) {
    const data = JSON.stringify(body);
    return new Promise(function (resolve, reject) {
        const req = http.request({
            hostname: "127.0.0.1",
            port: port,
            path: urlPath,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data)
            }
        }, function (res) {
            const chunks = [];
            res.on("data", function (chunk) { chunks.push(chunk); });
            res.on("end", function () {
                resolve({
                    status: res.statusCode,
                    body: Buffer.concat(chunks).toString("utf8")
                });
            });
        });
        req.on("error", reject);
        req.write(data);
        req.end();
    });
}

function waitForListen(child, timeoutMs) {
    return new Promise(function (resolve, reject) {
        let output = "";
        const timer = setTimeout(function () {
            reject(new Error("server did not listen in time:\n" + output));
        }, timeoutMs);
        function onData(chunk) {
            output += chunk.toString();
            if (output.includes("Express server listening")) {
                clearTimeout(timer);
                resolve(output);
            }
        }
        child.stdout.on("data", onData);
        child.stderr.on("data", onData);
        child.on("exit", function (code) {
            clearTimeout(timer);
            reject(new Error("server exited early (" + code + "):\n" + output));
        });
    });
}

function assertProductionRequiresSecret() {
    const result = spawnNode(
        ["-e", "require('./server/config')"],
        envWithoutJwt({ NODE_ENV: "production" })
    );
    assert.notStrictEqual(result.status, 0, "production should refuse to start without JWT_SECRET");
    const output = (result.stderr || "") + (result.stdout || "");
    assert.ok(output.includes("JWT_SECRET"), output);
    assert.ok(/production/i.test(output), output);
}

function assertDevFallback() {
    const result = spawnNode(
        ["-e", "const config = require('./server/config'); if (!String(config.secret).includes('dev-only')) process.exit(2);"],
        envWithoutJwt({ NODE_ENV: "development" })
    );
    assert.strictEqual(result.status, 0, result.stderr + result.stdout);
    assert.ok((result.stderr || "").toLowerCase().includes("dev-only"), result.stderr);
}

function assertEnvSecretWins() {
    const result = spawnNode(
        ["-e", "const config = require('./server/config'); if (config.secret !== 'test-secret-value') process.exit(2);"],
        Object.assign({}, process.env, { NODE_ENV: "production", JWT_SECRET: "test-secret-value" })
    );
    assert.strictEqual(result.status, 0, result.stderr + result.stdout);
}

function assertDatabaseIsCreated() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "todo-db-"));
    const dbFile = path.join(dir, "nested", "app.db");
    const result = spawnNode(
        ["-e", [
            "const DB = require('./server/db');",
            "const db = new DB(process.env.DB_FILE);",
            "db.migrate(function (err) {",
            "  if (err) { console.error(err); process.exit(1); }",
            "  db.migrate(function (err2) {",
            "    if (err2) { console.error(err2); process.exit(1); }",
            "    db.selectAll(function (err3, rows) {",
            "      if (err3) { console.error(err3); process.exit(1); }",
            "      if (!Array.isArray(rows) || rows.length !== 0) process.exit(3);",
            "      process.exit(0);",
            "    });",
            "  });",
            "});"
        ].join("\n")],
        envWithoutJwt({ NODE_ENV: "development", DB_FILE: dbFile })
    );
    assert.strictEqual(result.status, 0, result.stderr + result.stdout);
    assert.ok(fs.existsSync(dbFile), "database file was not created");
}

function assertServerRegistersUser() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "todo-api-"));
    const dbFile = path.join(dir, "app.db");
    const port = 32123;
    const child = spawn(process.execPath, ["server/app.js"], {
        cwd: root,
        env: Object.assign({}, process.env, {
            NODE_ENV: "development",
            JWT_SECRET: "test-secret-value",
            DB_FILE: dbFile,
            PORT: String(port)
        }),
        stdio: ["ignore", "pipe", "pipe"]
    });

    return waitForListen(child, 15000).then(function () {
        return postJson(port, "/register", {
            name: "Ada Lovelace",
            email: "ada@example.com",
            password: "correct-horse"
        });
    }).then(function (response) {
        assert.strictEqual(response.status, 200, response.body);
        const payload = JSON.parse(response.body);
        assert.strictEqual(payload.auth, true);
        assert.ok(payload.token);
        return postJson(port, "/login", {
            email: "ada@example.com",
            password: "correct-horse"
        });
    }).then(function (response) {
        assert.strictEqual(response.status, 200, response.body);
        assert.strictEqual(JSON.parse(response.body).auth, true);
        assert.ok(fs.existsSync(dbFile));
    }).finally(function () {
        child.kill("SIGTERM");
    });
}

assertProductionRequiresSecret();
assertDevFallback();
assertEnvSecretWins();
assertDatabaseIsCreated();

assertServerRegistersUser().then(function () {
    console.log("smoke tests passed");
}).catch(function (err) {
    console.error(err);
    process.exit(1);
});
