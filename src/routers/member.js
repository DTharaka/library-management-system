const express = require('express')
const User = require('../models/user')
const router = new express.Router()


// 
router.post('/members/login',async(req,res)=>{
    try {
        // const member = await User.findByCredentials(req.body.email,req.body.password)
        // res.send(member)
    } catch (error) {
        // res.status(400).send()
    }
})

// Get the member's profile
router.get('/members/me', async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

// Get the books what member borrowed
router.get('/books', async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

