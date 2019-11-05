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

export default class ForgetPasswordScreen extends Component {

  static navigationOptions = {
    title: 'Quên mật khẩu'
  }
  
  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent'/>
        <ImageBackground source={require('../../assets/images/bg03.jpg')} style={styles.imageBackground}>
          <View style={styles.header}>
            <Text style={styles.appTitle}>Quên mật khẩu</Text>
            <ActivityIndicator animating={true} color='green' size='small' style={styles.activityIndicator}/>
          </View>
          <View style={styles.main}></View>
          <View style={styles.footer}>
            <TouchableOpacity  onPress={this._onPressButton}>
              <View style={styles.button}>
                <Text style={styles.joinText}>Đổi mật khẩu</Text>
              </View>
            </TouchableOpacity>
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
 