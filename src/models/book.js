const mongoose = require('mongoose')
const validator = require('validator')

const Book = mongoose.model('Book', { 
    isbn: {
        type: String,
        required: true,
        maxLength: 13,
        minLength: 10,
        validate(value){
            if (!validator.isISBN(value)) {
                throw new Error('Please enter a valid ISBN Number')
            }
        }
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    numberOfCopies: {
        type: Number,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    }
});



module.exports = Book