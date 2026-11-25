// Secrets come from the environment; never commit them. See .env.example.
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set. Copy .env.example and export JWT_SECRET before starting the API.');
}

module.exports = {
    'secret': process.env.JWT_SECRET,
    'dbFile': process.env.DB_FILE || 'sqlitedb'
};
