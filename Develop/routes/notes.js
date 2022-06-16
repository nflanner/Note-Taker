const notes = require('express').Router();
const { request } = require('express');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a adding notes
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newnote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newnote, './db/db.json');
    res.json(`note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const id = req.params.id;
  console.log(id);

  if (id) {
    readAndDelete(id, './db/db.json');
    res.json('note deleted successfully 🚀');
  } else {
    res.error('Error in deleting note');
  }
});
  
module.exports = notes;