import React from 'react';
import uuid from 'uuid';

import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';

import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';

console.log('React version', React.version);

const App = ({LaneActions, lanes}) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New Lane',
      editing: true
    });
  };

  return (
    <div>
      <button className="add-lane" onClick={addLane}>+ Add Lane</button>
      <Lanes lanes={lanes}/>
    </div>
  );
}


export default compose(
  DragDropContext(HTML5Backend),
  connect(
    ({lanes}) => ({lanes}),
    {LaneActions}
  )
)(App);

// export default connect(
//   ({lanes}) => ({lanes}),
//   {LaneActions}
// )(App);
