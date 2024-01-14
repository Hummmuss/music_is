const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User} = require('../models')
const userService = require("../services/userService")

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async registration(req, res, next) {
        const {username, email, password} = req.body
        if (!email) {
            return next(ApiError.badRequest(('Enter email!')))
        }
        if (!password) {
            return next(ApiError.badRequest(('Enter password!')))
        }

        const token = await userService.registration({username, email, password})
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email) {
            return next(ApiError.badRequest(('Enter email!')))
        }
        if (!password) {
            return next(ApiError.badRequest(('Enter password!')))
        }
        const token = await userService.login({email, password})
        return res.json({token})
    }

    async getOne (req, res) {
        const {id} = req.params
        const user = await userService.getOneUser({id})
        return res.json(user)
    }
    async updateOne(req, res, next) {
        const { id } = req.params;
        const {newUsername} = req.body
        const message = await userService.updateOneUser({id, newUsername})
        return res.json({message})
    }
    async delete (req, res) {
        const {id} = req.params
        const message = await userService.deleteUser({id})
        return res.json({message})
    }
}

module.exports = new userController()