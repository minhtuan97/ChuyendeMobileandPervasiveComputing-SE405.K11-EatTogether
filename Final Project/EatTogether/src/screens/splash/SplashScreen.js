import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this._signOutAsync();
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Splash');
  };

  // Lấy  usertoken từ storage sau đó chyển hướng
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // Chuyển đổi sang AppNavigator hoặc AuthNavigator
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }
  
  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this._bootstrapAsync();
      //this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent'/>
        <ImageBackground source={require('../../assets/images/bg03.jpg')} style={styles.imageBackground}>
          <View style={styles.header}>
            <Text style={styles.appTitle}>Eat Together</Text>
            <ActivityIndicator animating={true} color='green' size='small' style={styles.activityIndicator}/>
          </View>
          <View style={styles.main}></View>
          <View style={styles.footer}>
            <Text>2019 &copy; SiVai MinhTuan</Text>
          </View>
        </ImageBackground>
      </>
    );
  }
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 50,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: width*0.1,
    height: width*0.1,
  },
  appTitle: {
    color: 'green',
    fontSize: width*0.13,
  },
  header: {
    flex: 6,
    justifyContent: 'center',
  },
  main: {
    flex: 3,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
  },
});
