import NoteActions from '../actions/NoteActions';

export default class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];
  }

  create(note) {
    let notes = this.notes;
    notes = notes.concat(note);

    this.setState({notes: notes});
  }

  update(updatedNote) {
    // don't add empty notes
    if(! (updatedNote.task || updatedNote.editing) ) {
      this.delete(updatedNote.id);
    }
    else {
      this.setState({
        notes: this.notes.map(note => {
          if(note.id === updatedNote.id) {
            return Object.assign({}, note, updatedNote);
          }

          return note;
        })
      });
    }
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
}
