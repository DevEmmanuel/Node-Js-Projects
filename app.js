const _ = require('lodash');
const fs = require('fs');
const os = require('os');
const yargs = require('yargs');

const notes = require('./notes.js')

console.log('Application started running!');
var argv = yargs
 .command('add','Add a new Note!!',{
   title: {
     describe: 'Title of note',
     demand: true,
     alias: 't'
   },
   body:{
     describe: 'Body of note',
     demand: true,
     alias: 'b'
   }
 })
 .command('list','List all the Notes')
 .command('read','Read a Note',{
   title: {
     describe: 'Title of note',
     demand: true,
     alias: 't'
   }
 })
 .command('remove','Remove a Note',{
   title: {
     describe: 'Title of note',
     demand: true,
     alias: 't'
   }
 })
 .argv;
var command = argv._[0];
if(command === 'add')
 {
   var note = notes.addNote(argv.title, argv.body);
   if(typeof note === 'undefined')
    console.log('Title already exist!!!');
   else
    console.log(`Title :${note.title} Body :${note.body}`);
 }
 else if(command === 'list')
 {
    var allNotes = notes.getAll();
    allNotes.forEach((note) => console.log(note.title,note.body));
 }
 else if(command === 'remove')
      {
        var check = notes.remove(argv.title);
        if(check)
         console.log(`Note with Title :${argv.title} removed !!!`);
        else
         console.log('No such Title');
      }
 else if(command === 'read')
      {
        var note = notes.getNote(argv.title);
        var message = note ? `Note Found!!.Body of the note :${note.body}` : 'Note not found';
        console.log(message);
      }
 else
 console.log('Command not recognized!!');
