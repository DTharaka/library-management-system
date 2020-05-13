const express = require('express')
const User = require('../models/user')
const router = new express.Router()


// Admin(Librarian) tasks => add, get, update, delete members

// Create a new member(Sign Up)
router.post('/members',async (req,res)=>{
    const member = new User(req.body)
    try {
        await member.save()
        res.status(201).send(member)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Login users
router.post('/members/login',async(req,res)=>{
    try {
        const member = await User.findByCredentials(req.body.email,req.body.password)
        res.send(member)
    } catch (error) {
        res.status(400).send()
    }
})

// Read all members
router.get('/members',async(req,res)=>{
    try {
        const members = await User.find({})
        res.status(201).send(members)
    } catch (error) {
        res.status(500).send()
    }
})

// Read individual member
router.get('/members/:id',async (req,res)=>{
    try {
        const member = await User.findById(req.params.id)
        if (!member) {
            return res.status(404).send()
        }
        res.send(member)
    } catch (error) {
        res.status(500).send()
    }
})

// Update a member
router.patch('/members/:id', async(req,res)=>{
    const updates = Object.keys(req.body) // Convert object into an array
    const allowUpdates = ['name','contact','email','password']
    const isValidUpdate = updates.every((update)=>{
        return allowUpdates.includes(update)
    })

    if(!isValidUpdate){
        return res.status(400).send({error: 'Invalid update !'})
    }

    try {
        const member = await User.findById(req.params.id)

        updates.forEach((update)=>{
            member[update] = req.body[update]
        })

        await member.save()
        // const member = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true})
        // <- findByIdAndUpdate bypasses mongoose. It's perform direct operation on the database. -->
        // <-- so we set a special opertion to run the validators. -->
        if (!member) {
            return res.status(404).send()
        }
        res.send(member)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete a member
router.delete('/members/:id', async(req,res)=>{
    try {
        const member = await User.findByIdAndDelete(req.params.id)
    if (!member) {
        return res.status(404).send()
    }
    res.send(member)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router