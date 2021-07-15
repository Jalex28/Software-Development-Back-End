const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const usersSchema = mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  }
});

// Getting all
router.get("/", async (req, res) => {
    try {
        const users = await user.find()
        res.json(users)
    } catch {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get("/:id", getUsers, (req, res) => {
    res.json(res.user)
})

//Creating one
router.post("/", async (req, res) => {
    const user = new user ({
        name: req.body.name,
        last_name: req.body.last_name
    })
    try {
        const newuser = await user.save()
        res.status(201).json(newuser)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch("/",getUsers, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.last_name != null) {
        res.user.last_name = req.body.last_name
    }
    try{
        const updateduser = await res.user.save()
        res.json(updateduser)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//Deleting one
router.delete("/:id",getUsers, async (req, res) => {
    try{
        await res.user.remove
        res.json({message: "Deleted user"})
    } catch (err){
        return res.status(500).json({message: err.message})
    }
})

async function getUsers(req, res, next){
    try {
        user = await user.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: "Cannot find user"})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

module.exports = router