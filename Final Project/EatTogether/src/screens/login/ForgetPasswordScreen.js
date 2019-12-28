import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import InputField from "../../components/login/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import firebase from '../../api/FirebaseConfig';

const email = require('../../assets/login/email.png');

export default class ForgotPassword extends Component {

  static navigationOptions = {
    title: 'Quên mật khẩu',
    headerStyle: {
      elevation: 0,
    },
  }
  
  state = {
    isEmailCorrect: false,
    isSend: false,
  };

  sendEmail = () => {
    const email = this.email.getInputValue();
    this.setState({
      isEmailCorrect: email === '',
    }, () => {
    if(email !== ''){
      this.sendEmailWithPassword(email);
    } else {
      ToastAndroid.show("Vui lòng nhập email", ToastAndroid.SHORT);
    }
    });
  };

  sendEmailWithPassword = async (email) => {
    this.setState({isSend: true})
    await firebase.auth().sendPasswordResetEmail(email)
    .then(function () {
      ToastAndroid.show("Kiểm tra email để đặt lại mật khẩu...", ToastAndroid.LONG)
    }).catch(function (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG)
    })
    this.email.resetInputValue()
    Keyboard.dismiss()
    this.setState({isSend: false})
  };

  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.forgot}>Nhập tài khoản Email</Text>
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          style={styles.inputField}
          error={this.state.isEmailCorrect}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <Text style={styles.forgotdetail}>Đổi mật khẩu mới tại email được gửi đến.</Text>
        <TouchableOpacity
          disabled={this.state.isSend}
          onPress={this.sendEmail} 
          activeOpacity={0.6} 
          style={styles.button}
        >
        { this.state.isSend ? (
          <ActivityIndicator size="small" color='white'/>
        ) : (
          <Text style={styles.buttonText}>Gửi</Text>
        )}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputField: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  forgot: {
    fontSize: totalSize(2.5),
    fontWeight: '700',
    margin: 20,
  },
  forgotdetail: {
    margin: 20,
  },
  button: {
    height: 50,
    width: w(85),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: w(1.8),
    borderRadius: w(25),
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: totalSize(2),
  },
  login: {
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  }
});