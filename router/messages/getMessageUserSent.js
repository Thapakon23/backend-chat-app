const db = require("../../config/db");

const getMessageUserSent = (req, res) => {
    try {
        const { user_id } = req.user
        const { receiver_id } = req.query
        // const queryDB = `SELECT m.sender_id, u1.username As sender, m.message_id, m.message_text, m.send_time, m.receiver_id, u2.username As receiver
        //                  FROM messages m, user u1, user u2
        //                  WHERE m.sender_id = u1.user_id
        //                  AND m.receiver_id = u2.user_id
        //                  AND m.sender_id = ? 
        //                  AND m.receiver_id  = ?`;

        const queryDB = `SELECT m.sender_id, u1.username AS sender, m.message_id, m.message_text, m.send_time, m.receiver_id, u2.username AS receiver 
                         FROM messages m 
                         JOIN user u1 ON m.sender_id = u1.user_id 
                         JOIN user u2 ON m.receiver_id = u2.user_id 
                         WHERE (m.sender_id = '${user_id}' AND m.receiver_id = '${receiver_id}')     
                         OR (m.sender_id = '${receiver_id}' AND m.receiver_id = '${user_id}')  
                         ORDER BY m.send_time`;

        db.query(queryDB, (err, result) => { 
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

module.exports = getMessageUserSent 