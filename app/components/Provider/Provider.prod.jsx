import React from 'react';
import AltContainer from 'alt-container';
import alt from '../../libs/alt';
import setup from './setup';

setup(alt);

const Provider = ({children}) =>
  <AltContainer flux={alt}>
    {children}
  </AltContainer>

export default Provider;
