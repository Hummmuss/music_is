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
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({username, email, password: hashPassword})
        const token = generateJwt(user.id, user.email)
        return token
    }

    async login({email, password}) {
        const user = await User.findOne({where: {email}})
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw new Error('Wrong password!');
        }
        const token = generateJwt(user.id, user.email)
        return token
    }

    async getOneUser ({id}) {
        const user = await User.findOne({where: {id}})
        return user
    }
    async updateOneUser({id, newUsername}) {
        const user = await User.findOne({where: {id}})
        if (!user) {
            throw new Error('User does not exist!');
        }
        user.username = newUsername

        await user.save();
        const message = "Successfully updated!"
        return message
    }
    async deleteUser ({id}) {
        await User.destroy({where: {id}})
        const message = "Successfully deleted!"
        return message
    }
}

module.exports = new userService()