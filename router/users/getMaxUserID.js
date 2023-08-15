const db = require("../../config/db");

const getMaxUserId = async (req, res) => {
    try {
        const queryDB = `SELECT MAX(user_id) as maxId FROM user`;
        db.query(queryDB, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: 'Error fetching userid',
                });
            }

            res.send(result)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error fetching userid',
        });
    }
};

module.exports = getMaxUserId  