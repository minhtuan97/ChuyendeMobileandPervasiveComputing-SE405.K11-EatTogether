import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
  }

  // hàm đăng nhập: lưu AsyncStorage: userToken và chuyển đến AppNavigation
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  }

  // Hàm đăng xuất: xóa AsyncStorage và chuyển đến màng hình Splash
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Splash');
  };

  // Lấy  userToken từ AsyncStorage sau đó chuyển hướng đến App hoặc Auth
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('email');

    // Chuyển đổi sang AppNavigator hoặc AuthNavigator
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Promise chờ 2s
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        1000
      )
    )
  }
  
  // 
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
        <StatusBar backgroundColor={'green'} barStyle={'light-content'}/> 
        <ImageBackground source={require('../../assets/images/bg03.jpg')} style={styles.imageBackground}>
          <View style={styles.header}>
            <Image source={require('../../assets/logo/share.png')} style={styles.logo} />
            <Text style={styles.appTitle}>Eat Together</Text>
          </View>
          <View style={styles.main}></View>
          <View style={styles.footer}>
            <ActivityIndicator animating={true} color='green' size='small' style={styles.activityIndicator}/>
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
    marginVertical: 20,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: width*0.3,
    height: width*0.3,
    marginVertical: 20,
  },
  appTitle: {
    color: 'green',
    fontSize: width*0.13,
  },
  header: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 3,
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
  },
});
