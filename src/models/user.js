const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        unique: true,
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

// 
userSchema.statics.findByCredentials = async(email,password)=>{
    const member = await User.findOne({email})
    if (!member) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password,member.password)
    if (!isMatch) {
        throw new Error("Unable to login")
    }
    return member
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const member = this// Access to the value on 'this' which is equal to document that's being saved, gives us access to individual user that's about to save
    
    if (member.isModified('password')) {
        member.password = await bcrypt.hash(member.password ,8)
    }
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User