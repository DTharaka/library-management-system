const mongoose = require('mongoose');
const validator = require('validator')
mongoose.connect('mongodb://localhost:27017/library-management', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});