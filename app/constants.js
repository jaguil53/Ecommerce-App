// JWT Secret Key used to sign and verify JWT tokens
const JWT_SECRET_KEY = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy';

// Port number on which the server will listen
const SERVER_PORT = 8080;

// MongoDB database URI for connecting to the database
const DATABASE_URI = 'mongodb://localhost:27017/EcommerceApp';

// Duration for which JWT tokens are valid
const TOKEN_EXPIRATION_DURATION = '7d';

// Exporting configuration values as an object
module.exports = {
    JWT_SECRET_KEY,             // Exporting JWT_SECRET_KEY
    SERVER_PORT,                // Exporting SERVER_PORT
    DATABASE_URI,               // Exporting DATABASE_URI
    TOKEN_EXPIRATION_DURATION   // Exporting TOKEN_EXPIRATION_DURATION
};