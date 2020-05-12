const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
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
})

userSchema.pre('save', async function (next) {
    const user = this// Access to the value on 'this' which is equal to document that's being saved, gives us access to individual user that's about to save
    console.log('before saving')

    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User