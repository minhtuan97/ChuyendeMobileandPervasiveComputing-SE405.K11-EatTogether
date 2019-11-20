import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-paper';

export default class ForgetPasswordScreen extends Component {

  static navigationOptions = {
    title: 'Quên mật khẩu'
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Nhập Email đăng nhập</Text>
          <TextInput
            style={styles.usernameTextInput}
            placeholder="Tên tài khoản"
            //onChangeText={(text) => this.setState({text})}
            //value={this.state.text}
          />
        </View>
        <View style={styles.main}></View>
        <View style={styles.footer}>
          <TouchableOpacity  onPress={this._onPressButton}>
            <View style={styles.button}>
              <Text style={styles.joinText}>Đổi mật khẩu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    margin: 30,
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
 