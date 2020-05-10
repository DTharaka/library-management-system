const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', { 
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        validate(value){
            if (!validator.isMobilePhone(value)) {
                throw new Error('Please enter a valid phone number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid e-mail address')
            }
        }
    },
    ID: {
        type: String,
        // required: true,
        trim: true,
        maxlength: 10,
        validate(value){
            if (!validator.isIdentityCard(value)) {
                throw new Error('Please enter a valid ID Number')
            }   
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password can't contain 'password'")
            }   
        }
    }
});

module.exports = User