import React, {Component} from 'react';
import {View, Text} from 'react-native'
import {StyleSheet, Image, ImageBackground} from 'react-native';

import bgSrc from '../../assets/login/wallpaper.png';

export default class Wallpaper extends Component {
  render() {
    return (
        <ImageBackground source={bgSrc} style={{width: '100%', height: '100%'}}>
            {this.props.children}
      </ImageBackground>
    );
  }
}

