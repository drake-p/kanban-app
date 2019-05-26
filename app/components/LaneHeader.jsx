import React from 'react';

import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';

import Editable from './Editable';

const LaneHeader = ({lane,  LaneActions, ...props}) => {
  const activateLaneEdit = () => {
    LaneActions.update({
      id: lane.id,
      editing: true
    });
  };

  const editName = (name) => {
    LaneActions.update({
      id: lane.id,
      name,
      editing: false
    });
  };

  const deleteLane = (e) => {
    e.stopPropagation();

    LaneActions.delete(lane.id);
  };

  return (
    <div className="lane-header" onClick={activateLaneEdit} {...props}>
      <Editable
        className="lane-name"
        editing={lane.editing}
        value={lane.name}
        onEdit={editName}
        />
      <div className="lane-delete">
        <button onClick={deleteLane}>x</button>
      </div>
    </div>
  );
};

export default connect(
  () => ({}),
  {LaneActions}
)(LaneHeader);
