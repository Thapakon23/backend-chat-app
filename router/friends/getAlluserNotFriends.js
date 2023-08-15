const db = require("../../config/db");

const getAllUsernotFriends = (req, res) => {
    try {
        const { user_id } = req.user
        const queryDB = `SELECT u.user_id, u.username AS friend_username
                         FROM user u
                         JOIN friend_requests f ON (u.user_id = f.requester_id OR u.user_id = f.receiver_id)
                         WHERE ((f.requester_id = '${user_id}' OR f.receiver_id = '${user_id}') AND u.user_id != '${user_id}')
                         AND f.status = 'accepted'`;

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
        console.error(err)
        res.status(500).json({
            status: 500,
            code: 'ERROR_INTERNAL_SERVER',
            message: 'Unknown Internal Server Error.',
        });
    }
}

module.exports = getAllUsernotFriends