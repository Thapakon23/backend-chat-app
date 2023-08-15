const db = require("../../config/db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const TOKEN_SECRET = process.env.TOKEN_SECRET

const Login = (req, res) => {
    try {
        const { username, password } = req.body;
        const queryDB = `SELECT * from user WHERE username = ?`;

        db.query(queryDB, username, (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else if (rows[0]?.password) {
                const db_password = rows[0].password;
                bcrypt.compare(password, db_password, (err, result) => {
                    if (result) {
                        let payload = {
                            user_id: rows[0].user_id,
                            username: rows[0].username,
                        };
                        const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1d' });
                        res.status(200).send({ token: token }); // Sending token as part of the response data
                    } else {
                        res.status(401).send("Invalid username/password"); // Unauthorized status
                    }
                });
            } else {
                res.status(401).send("Invalid username/password");
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
}

module.exports = Login