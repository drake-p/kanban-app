import React from 'react';
import connect from '../libs/connect';

const LaneHeader = ({lane,  ...props}) => {
  return (
    <div className="lane-header" {...props}>
      <div className="lane-name">{lane.name}</div>
    </div>
  );
};

export default LaneHeader;
