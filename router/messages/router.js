const express = require('express')
const authenticateToken = require('../../middleware/authenticateToken')
const SendMessage = require('./sendMessage')
const getMessageUserSent = require('./getMessageUserSent')
const ReceiveMessage = require('./receivemessage')
const getMaxMessageId = require('./getMaxMessageId')
const message_router = express.Router()

//sender
message_router.post('/sendmessage', authenticateToken, SendMessage)
message_router.get('/getMessageIsent', authenticateToken, getMessageUserSent)

//reader
message_router.get('/receivemessage', authenticateToken, ReceiveMessage)

message_router.get('/getMaxMessageId', getMaxMessageId)

module.exports= message_router