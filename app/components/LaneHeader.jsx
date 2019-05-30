import React from 'react';
import {compose} from 'redux';
import {DropTarget} from 'react-dnd';

import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';
import ItemTypes from '../constants/itemTypes';

import Editable from './Editable';

const LaneHeader = ({connectDropTarget, lane,  LaneActions, ...props}) => {
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

  return connectDropTarget(
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

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    LaneActions.attachToLane({
      laneId: targetProps.lane.id,
      noteId: sourceId
    });

    // targetId of 0 means move to top of list
    LaneActions.move({
      sourceId, targetId: 0
    });
  }
};

export default compose(
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(
    () => ({}),
    {LaneActions}
  )
)(LaneHeader);
