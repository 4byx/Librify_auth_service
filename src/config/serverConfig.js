const dotenv = require("dotenv");
dotenv.config();

console.log("PORT" ,process.env.PORT);

module.exports = {
    PORT : process.env.PORT,
}