const db = require("../../config/db");

const getUserByID = (req, res) => {
    try {
        const { user_id } = req.query
        const queryDB = `SELECT * FROM user WHERE user_id = ?`;

        db.query(queryDB, [user_id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 500,
                    code: 'ERROR_INTERNAL_SERVER',
                    message: 'Unknown Internal Server Error.',
                });
            }

            res.send(result)
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
}

module.exports = getUserByID