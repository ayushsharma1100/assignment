const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route-1: To Fetch all notes of a User: GET /api/notes/fetchallnotes --Login Required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find();
        console.log(notes);
        return res.json({ notes });
    } catch (error) {
        return res.status(500).json({ err: "It's fault on our server's side" })
    }

})

// Route-2: To add a note: POST /api/notes/addnote --Login Required

router.post('/addnote', fetchuser, [
    body('title').isLength({ min: '4' }),
    body('description').isLength({ min: '5' })],
    async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            try {
                const userName = await User.find({_id: req.user.id}).select("name");
                const note = await Note.create({
                    title: req.body.title,
                    description: req.body.description,
                    user: req.user.id,
                    tag: req.body.tag?req.body.tag:"General",
                    userName: userName[0].name
                })
                
                return res.json(note);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ err: "It's fault on our server's side" })
            }
        }
        else return res.send({ errors: result.array() });
    });


// Route-3: To update an existing node: PUT /api/notes/updatenote --Login required

router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        let { title, description, tag } = req.body;
        try {
            // Create new note.
            let updatedNote = {};
            if(title) updatedNote.title = title;
            if(description) updatedNote.description = description;
            if(tag) updatedNote.tag = tag;
            // Check if note exist and update if it's user's note.
            let note = await Note.findById(req.params.id);
            if(!note) return res.status(401).send("Not Allowed");
            if(note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

            note = await Note.findByIdAndUpdate(req.params.id, {$set: updatedNote});
            return res.status(200).json({success: "Updated successfully", note:note});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: "It's fault on our server's side" })
        }
    });

// Route-4: To delete an existing node: PUT /api/notes/deletenote --Login required

router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {
            // Check if note exist and delete if it's user's note.
            let note = await Note.findById(req.params.id);
            if(!note) return res.status(401).send("Not Allowed");
            if(note.user.toString() !== req.user.id) return res.status(401).send("Not Allowed");

            await Note.findByIdAndDelete(req.params.id);
            return res.status(200).json({success: "Deleted Successfully", note:note});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: "It's fault on our server's side" });
        }
    });

module.exports = router