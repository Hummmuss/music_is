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
            return {
                success: false,
                message: 'NO EMAIL',
            };
        }
        if (!password) {
            return {
                success: false,
                message: 'NO PASSWORD',
            };
        }

        const result = await userService.registration({username, email, password})
        return res.json({result})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email) {
            return {
                success: false,
                message: 'NO EMAIL',
            };
        }
        if (!password) {
            return {
                success: false,
                message: 'NO PASSWORD',
            };
        }
        const result = await userService.login({email, password})
        return res.json({result})
    }

    async getOne (req, res) {
        const {id} = req.params
        const result = await userService.getOneUser({id})
        return res.json({result})
    }
    async updateOne(req, res, next) {
        const { id } = req.params;
        const {newUsername} = req.body
        const result = await userService.updateOneUser({id, newUsername})
        return res.json({result})
    }
    async delete (req, res) {
        const {id} = req.params
        const result = await userService.deleteUser({id})
        return res.json({result})
    }
}

module.exports = new userController()