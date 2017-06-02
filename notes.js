const fs = require('fs');
var fetchNote = () => {
  try{
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  }catch(e){
    return [];
  }
};
var savNote = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote = (title,body) => {
  var notes = fetchNote();
  var note = {
    title,
    body
  };


  var duplicateTitle = notes.filter((note) => note.title === title);
  if(duplicateTitle.length === 0)
  {
  notes.push(note);
  savNote(notes);
  console.log('Note Added !!!!');
  return note;
  }

};

var getAll = () => {
  return fetchNote();
};

var getNote = (title) => {
  var notes = fetchNote();
  var note = notes.filter((note) => title === note.title);
  return note[0];
};

var remove = (title) => {
  var tempNotes = fetchNote();
  //console.log(tempNotes);
  var newNotes = tempNotes.filter((note) => title !== note.title);
  //console.log(newNotes);
  savNote(newNotes);
  return tempNotes.length !== newNotes.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  remove
};
