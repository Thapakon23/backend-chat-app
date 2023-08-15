const db = require("../../config/db");

const getMaxMessageId = async (req, res) => {
    try {
        const queryDB = `SELECT MAX(message_id) as maxId FROM messages`;
        db.query(queryDB, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    error: 'Error fetching messageid',
                });
            }

            res.send(result)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: 'Error fetching messageid',
        });
    }
};

module.exports = getMaxMessageId  