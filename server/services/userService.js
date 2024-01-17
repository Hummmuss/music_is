const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userService {
    async registration({username, email, password}) {
        const candidate = await User.findOne({where: {email}})
        if (candidate.email === email) {
            return {
                success: false,
                message: 'EMAIL IS ALREADY IN USE',
            };
        }
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({username, email, password: hashPassword})
        const token = generateJwt(user.id, user.email)
        return {
            success: true,
            token
        };
    }

    async login({email, password}) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            return {
                success: false,
                message: 'USER DOES NOT EXIST',
            };
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return {
                success: false,
                message: 'WRONG PASSWORD',
            };
        }
        const token = generateJwt(user.id, user.email)
        return {
            success: true,
            token
        };
    }

    async getOneUser ({id}) {
        const user = await User.findOne({where: {id}})
        return {
            success: true,
            user
        };
    }
    async updateOneUser({id, newUsername}) {
        const user = await User.findOne({where: {id}})
        if (!user) {
            return {
                success: false,
                message: 'USER DOES NOT EXIST',
            };
        }
        user.username = newUsername

        await user.save();
        return {
            success: true,
            message: 'SUCCESS',
        };
    }
    async deleteUser ({id}) {
        await User.destroy({where: {id}})
        return {
            success: true,
            message: 'SUCCESS',
        };
    }
}

module.exports = new userService()