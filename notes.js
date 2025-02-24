const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes .....';

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    console.log(chalk.inverse.green('Note added'));
  } else {
    console.log(chalk.inverse.red('note title taken ❌'));
  }
  saveNotes(notes);
};

const removeNotes = title => {
  const notes = loadNotes();
  const sortedArr = notes.find(note => note.title === title);

  if (sortedArr === undefined) {
    console.log(chalk.inverse.red('No note found'));
  } else {
    const removedArray = notes.filter(note => note.title !== title);
    saveNotes(removedArray);
    console.log(chalk.inverse.green('Note removed'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.black.bold('Your list Notes here'));
  notes.forEach(note => {
    console.log(chalk.inverse.green(note.title));
  });
};

const readNotes = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(`${chalk.inverse.green(note.title)}: ${note.body}`);
  } else {
    console.log(chalk.inverse.red('Nothing found'));
  }
};

const saveNotes = arr => {
  const jsonData = JSON.stringify(arr);
  fs.writeFileSync('notes.json', jsonData);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const jsonData = dataBuffer.toString();
    return JSON.parse(jsonData);
  } catch (err) {
    return [];
  }
};
module.exports = {
  getNotes,
  addNotes,
  removeNotes,
  listNotes,
  readNotes,
};
