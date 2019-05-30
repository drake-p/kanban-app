import React from 'react';
import Note from './Note';

import Editable from './Editable';
import laneActions from '../actions/LaneActions';

// function-based component
const Notes = ({
  notes,
  onNoteClick=() => {},
  onEdit=() => {},
  onDelete=() => {}
}) => (
  <ul className="notes">{notes.map(({id, editing, task, className}) =>
    <li className={className} key={id}>
      <Note
        className="note"
        id={id}
        onClick={onNoteClick.bind(null, id)}
        onMove={laneActions.move}
        >
        <Editable
          className="editable"
          editing={editing}
          value={task}
          onEdit={onEdit.bind(null, id)}/>
        <button
          className="delete"
          onClick={onDelete.bind(null, id)}>x</button>
      </Note>
    </li>
  )}</ul>
)

export default Notes;
