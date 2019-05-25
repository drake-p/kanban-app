import React from 'react';

const Note = ({children, ...props}) => (
  <div {...props}>
    {children}
  </div>
);

export default Note;
