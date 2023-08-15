const db = require("../../config/db");

const ReceiveMessage = (req, res) => {
    try {
        const { user_id } = req.user;
        const { sender_id } = req.query;

        const queryDB = `SELECT m.receiver_id, u1.username As receiver, m.message_id, m.message_text, m.send_time, m.sender_id, u2.username As sender
                             FROM messages m, user u1, user u2
                             WHERE m.receiver_id = u1.user_id
                             AND m.sender_id = u2.user_id
                             AND m.receiver_id = ?
                             AND m.sender_id = ?`;

        db.query(queryDB, [user_id, sender_id], (fetchErr, fetchResult) => {
            if (fetchErr) {
                console.error(fetchErr);
                return res.status(500).json({
                    status: 500,
                    code: 'ERROR_INTERNAL_SERVER',
                    message: 'Unknown Internal Server Error.',
                });
            }

            res.send(fetchResult);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
};

module.exports = ReceiveMessage;
