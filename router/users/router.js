const express = require('express')
const user_router = express.Router()

const Login = require('./login')
const register = require('./register')
const getMaxUserId = require('./getMaxUserID')
const getUserInfo = require('./getUserInfo')
const authenticateToken = require('../../middleware/authenticateToken')
const getUserByID = require('./getUserByID')

user_router.post('/signin', Login)
user_router.post('/register', register)
user_router.get('/profile', authenticateToken, getUserInfo)
user_router.get('/getMaxID', getMaxUserId)
user_router.get('/getuserbyid', getUserByID)


module.exports = user_router