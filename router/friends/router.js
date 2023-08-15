const express = require('express')
const authenticateToken = require('../../middleware/authenticateToken')
const getAllFriends = require('./getAllFriends')
const friends_router = express.Router()

friends_router.get('/getallfriends', authenticateToken, getAllFriends)

module.exports= friends_router