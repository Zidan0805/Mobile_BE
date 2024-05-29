const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user.controllers')
const route = express.Router()

route.get('/', getUsers)
route.get('/:id', getUserById)
route.post('/', createUser)
route.put('/:id', updateUser),
route.delete('/:id', deleteUser)

module.exports = route;