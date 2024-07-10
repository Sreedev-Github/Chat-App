const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        console.log('Token not found');
        return {
            user: null,
            message: "session out",
            logout: true,
        }
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await UserModel.findById(decode.id).select('-password')

        if (!user) {
            console.log('User not found for decoded token ID:', decode.id);
            return {
                user: null,
                message: "User not found",
                logout: true,
            }
        }

        return {
            user,
            message: "User details",
            logout: false,
        }
    } catch (error) {
        console.log('Token verification failed:', error.message);
        return {
            user: null,
            message: "Invalid token",
            logout: true,
        }
    }
}

module.exports = getUserDetailsFromToken
