import React from 'react';
import uuid from 'uuid';
import {compose} from 'redux';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

import connect from '../libs/connect';

import Notes from './Notes';
import LaneHeader from './LaneHeader';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

const Lane = ({connectDropTarget, lane, notes, LaneActions, NoteActions, ...props}) => {

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

  return connectDropTarget(
    <div {...props}>
      <LaneHeader lane={lane}/>
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

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
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
}


export default compose(
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(
    ({notes}) => ({notes}),
    {NoteActions, LaneActions}
  )
)(Lane);
