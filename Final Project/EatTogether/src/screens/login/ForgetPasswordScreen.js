import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import InputField from "../../components/login/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import fire from '../../api/FirebaseConfig'

const email = require('../../assets/login/email.png');

export default class ForgotPassword extends Component {

  static navigationOptions = {
  title: 'Quên mật khẩu'
  }
  
  state = {
    isEmailCorrect: false,
  };

  sendEmail = () => {
    const email = this.email.getInputValue();
    this.setState({
      isEmailCorrect: email === '',
    }, () => {
      if(email !== ''){
        this.sendEmailWithPassword(email);
      } else {
        console.warn('Enter correct e-mail address');
        alert("Nhap email");
      }
    });
  };

  sendEmailWithPassword = (email) => {
    fire.auth().sendPasswordResetEmail(email)
    .then(function (user) {
      alert('Kiểm tra email để đặt lại mật khẩu...')
    }).catch(function (error) {
      //console.log(error);
      alert(error);
    });
  };

  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.forgot}>Bạn quên mật khẩu?</Text>
        <Text style={styles.forgotdetail}>Đổi mật khẩu mới tại mail được gửi đến.</Text>
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
        <TouchableOpacity onPress={this.sendEmail} activeOpacity={0.6} style={styles.button}>
          <Text style={styles.buttonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical: h(2),
  },
  forgot: {
    //color:'white',
    fontSize: totalSize(2.5),
    fontWeight: '700',
  },
  forgotdetail: {
    marginBottom: h(6),
  },
  button: {
    width: w(85),
    marginTop: h(6),
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
    //color:'#ffffffEE',
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  }
});