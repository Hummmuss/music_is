const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User} = require('../models')
const {DataTypes} = require("sequelize");

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

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(('Email is already in use!')))
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({username, email, password: hashPassword})
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('User with this email does not exist!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password!'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async getOne (req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user)
    }
    async updateOne(req, res, next) {
        const { id } = req.params;
        const {newUsername} = req.body

        if (req.user.id !== id) {
            return res.status(403).json({ message: 'You do not have the rights to delete this user!' });
        }

        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.badRequest('User does not exist!'))
        }
        user.username = newUsername

        await user.save();
        return res.json({ message: 'Successfully updated!' })
    }
    async delete (req, res) {
        const {id} = req.params
        const user = await User.destroy({where: {id}})
        return res.json({ message: 'Successfully deleted!' })
    }
}

module.exports = new userController()