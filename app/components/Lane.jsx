import React from 'react';
import uuid from 'uuid';

import connect from '../libs/connect';

import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

const Lane = ({lane, notes, LaneActions, NoteActions, ...props}) => {

  const addNote = () => {
    const noteId = uuid.v4();

    NoteActions.create({
      id: noteId,
      task: '',
      editing: true
    });

    LaneActions.attachToLane({laneId: lane.id, noteId});
  };

  const editNote = (id, task) => {
    NoteActions.update({id, task, editing: false})

    LaneActions.detachFromLane({laneId: lane.id, id});
  };

  const activateNoteEdit = (id) => {
    NoteActions.update({id, editing: true});
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();

    NoteActions.delete(id);
  };

  return (
    <div {...props}>
      <div className="lane-header">
        <div className="lane-name">{lane.name}</div>
      </div>
      <Notes
        notes={selectNotesById(notes, lane.notes)}
        onNoteClick={activateNoteEdit}
        onEdit={editNote}
        onDelete={deleteNote}
      />
      <div className="lane-add-note">
        <button onClick={addNote}>+</button>
      </div>
    </div>
  )
};

// given an array of all note objects and an array of note ids
// returns an array of note objects matching the given ids
function selectNotesById(allNotes, noteIds = []) {
  return noteIds.reduce((notes, id) =>
    // Concatenate possible matching ids to the result
    notes.concat(
      allNotes.filter(note => note.id === id)
    )
  , []);
  // let selectedNotes = [];
  //
  // return noteIds.reduce((runningNotes, id) =>
  //   runningNotes.concat(
  //     allNotes.filter(note => note.id === id)
  //   )
  //   , selectedNotes);
}


export default connect(
  ({notes}) => ({notes}),
  {NoteActions, LaneActions}
)(Lane);
