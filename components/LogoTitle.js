import React, { Component } from 'react';

import {
  Image,
} from 'react-native';


export default class LogoTitle extends React.Component {
  render() {

    return (
    
      <Image
        source={require('../assets/imgs/scramblerLogo.png')}
        style={{ width: 136, height: 30 }}
    />
    );
  }
}