const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const { body, validationResult } = require("express-validator");
const Notes = require('../models/Notes')

const router = express.Router();

router.get("/fetchallnotes",fetchUser, async(req, res) => {
const notes = await Notes.find({user:req.user.id})
  res.json(notes);
});

router.post(
  "/addnote",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    const {title,description,tag} = req.body

    try {
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      let note = await Notes.findById(req.params.id);

      if (!note) return res.status(404).send("NOt Found");

      if (note.user.toString() !== req.user.id)
        return res.status(401).send("NOt Allowed");

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
}
)

router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
try {
  let note = await Notes.findById(req.params.id);

  if (!note) return res.status(404).send("NOt Found");

  if (note.user.toString() !== req.user.id)
    return res.status(401).send("NOt Allowed");

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ Success: "Note has been deleted", note });
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error occured");
}
}
)

module.exports = router