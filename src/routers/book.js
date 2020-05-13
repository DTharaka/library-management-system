const express = require('express')
const Book = require('../models/book')
const router = new express.Router()

// Book tasks => get, update, delete, create books

// Create a book
router.post('/books',async (req,res)=>{
    const book = new Book(req.body)
    try {
        await book.save()
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send(e)
    }
})

// Get books
router.get('/books',async (req,res)=>{
    try {
        const books = await Book.find({})
        res.status(201).send(books)
    } catch (error) {
        res.status(500).send()
    }
})

// Get individual books
router.get('/books/:id',async (req,res)=>{
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch (error) {
        res.status(500).send()
    }
})  

// Update a book
router.patch('/books/:id', async(req,res)=>{
    const updates = Object.keys(req.body) // Convert object into an array
    const allowUpdates = ['isbn','title','author','numberOfCopies','status']
    const isValidUpdate = updates.every((update)=>{
        return allowUpdates.includes(update)
    })

    if(!isValidUpdate){
        return res.status(400).send({error: 'Invalid update !'})
    }

    try {
        const book = await Book.findById(req.params.id)
        updates.forEach((update)=>{
            book[update] = req.body[update]
        })

        await book.save()

        // const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true})

        if (!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})


// Delete a book
router.delete('/books/:id', async(req,res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
        return res.status(404).send()
    }
    res.send(book)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router