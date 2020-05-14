const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await jwt.verify(token, 'this_is_a_library_management_system')
        const member = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        
        if (!member) {
            throw new Error()
        }

        req.member = member
        next()
    } catch (error) {
        res.status(401).send({error: 'Please Authenticate the user'})
    }
    // next()
}

module.exports = auth