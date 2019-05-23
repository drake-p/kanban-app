import React from 'react';

// function-based component
export default ({message, ...props}) => (
  <div>
    <small>{message}</small>
  </div>
)
