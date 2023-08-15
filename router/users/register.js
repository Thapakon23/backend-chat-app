const bcrypt = require('bcrypt');
const db = require('../../config/db');


const SALT_ROUNDS = 10;

const register = async (req, res) => {
    try {
        const { user_id, username, password } = req.body;
        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const query = `INSERT INTO user (user_id, username, password) VALUES (?, ?, ?)`;
        const params = [user_id, username, hash];
        
        await db.query(query, params);
        res.send({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
};

module.exports = register;
