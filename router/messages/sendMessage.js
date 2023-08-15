const db = require("../../config/db");

const SendMessage = (req, res) => {
    try {
        const { message_id, message_text, send_time, receiver_id } = req.body;
        const { user_id } = req.user
        const queryDB = `INSERT INTO messages (message_id, message_text, sender_id, send_time, receiver_id) 
                       VALUES (?, ?, ?, ?, ?)`;

        db.query(queryDB, [message_id, message_text, user_id, send_time, receiver_id], (err, result) => {
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
        console.error(err);
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
}

module.exports = SendMessage