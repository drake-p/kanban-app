import React from 'react';
import uuid from 'uuid';

import connect from '../libs/connect';

import Notes from './Notes';
import Message from './Message';

// class-based component
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React',
          class: 'active'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        },
        {
          id: uuid.v4(),
          task: 'One more thing'
        }
      ],
      message: 'You can do ALL the things!'
    };
  }

  render() {
    const {notes, message} = this.state;

    return (
        <div>
          <button className="add-note" onClick={this.addNote}>+</button>
          <Notes
            notes={notes}
            onNoteClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote } />
          <Message message={message}/>
        </div>
    )
  }

  addNote = () => {
    let notes = this.state.notes;
    notes = notes.concat([{id: uuid.v4(), task: 'give me more!'}]);

    this.setState({notes: notes});
  }

  deleteNote = (id, e) => {
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = true;
        }
        return note;
      })
    });
  }

  editNote = (id, task) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = false;
          note.task = task;
        }
        return note;
      })
    });
  }
}

export default connect(
  () => ({test: 'test'})
)(App);
