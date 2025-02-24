const notes = require('./notes.js');

const yargs = require('yargs');

yargs.command({
  command: 'add',
  describe: 'Adding a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'show all the lists',
  handler() {
    notes.listNotes();
  },
});
yargs.parse();
