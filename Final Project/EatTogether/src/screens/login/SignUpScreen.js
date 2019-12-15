import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
} from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';
import InputField from '../../components/login/InputField';
import fire from "../../api/FirebaseConfig";

const email = require('../../assets/login/email.png');
const password = require('../../assets/login/password.png');
const repeat = require('../../assets/login/repeat.png');
const person = require('../../assets/login/person.png');

export default class SignUpScreen extends Component {

    static navigationOptions = {
    title: 'Tạo tài khoản'
  }
  state = {
    //isNameCorrect: false,
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isRepeatCorrect: false,
    isCreatingAccount: false,
    isCreating: false,
  };

  handleSignIn = () => {
    //const name = this.name.getInputValue();
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();
    const repeat = this.repeat.getInputValue();

    this.setState({
      //isNameCorrect: name === '',
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
      isRepeatCorrect: repeat === '' || repeat !== password,
    }, () => {
      if(email !== '' && password !== '' && (repeat !== '' && repeat === password)){
        this.createFireBaseAccount(email, password);
      } else {
        console.warn('Fill up all fields correctly');
      }
    })
  };

  createFireBaseAccount = async (email, password) => {
    this.setState({ isCreating: true });
    await fire.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>{
        Alert.alert(
          'Đăng ký',
          'Đăng ký tài khoản thành công',
          [
            {
              text: 'OK', 
              onPress:()=> this.props.navigation.navigate('SinIn')
            },
          ],
          {cancelable: false},
        )
      }
          
      ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        Alert.alert(
          'Lỗi '+ errorMessage,
          )
      });
    this.setState({ isCreating: false });
  };

  changeInputFocus = name => () => {
    switch (name) {
      // case 'Name':
      //   this.setState({ isNameCorrect: this.name.getInputValue() === '' });
      //   this.email.input.focus();
      //   break;
      case 'Email':
        this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
        this.password.input.focus();
        break;
      case 'Password':
        this.setState({ isPasswordCorrect: this.password.getInputValue() === '',
          isRepeatCorrect: (this.repeat.getInputValue() !== ''
            && this.repeat.getInputValue() !== this.password.getInputValue()) });
        this.repeat.input.focus();
        break;
      default:
        this.setState({ isRepeatCorrect: (this.repeat.getInputValue() === ''
          || this.repeat.getInputValue() !== this.password.getInputValue()) });
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.create}>Nhập thông tin tài khoản</Text>
        {/* <InputField
          placeholder="Name"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.name = ref}
          icon={person}
        /> */}
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          style={styles.inputField}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Mật khẩu"
          error={this.state.isPasswordCorrect}
          style={styles.inputField}
          focus={this.changeInputFocus}
          ref={ref => this.password = ref}
          secureTextEntry={true}
          icon={password}
        />
        <InputField
          placeholder="Nhập lại mật khẩu"
          error={this.state.isRepeatCorrect}
          style={styles.inputField}
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.repeat = ref}
          icon={repeat}
        />
        
        <TouchableOpacity
          disabled={this.state.isCreating}
          activeOpacity={0.5}
          onPress={()=>this.handleSignIn(this)}
          style={styles.button}>
          {this.state.isCreating
          ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
          : <Text style={styles.text}>Tạo tài khoản</Text>}
        </TouchableOpacity>
      </View>
    )
  }
}

// Register.propTypes = {
//   change: PropTypes.func.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
    //color:'white',
    fontSize: totalSize(2.4),
    marginTop: h(7),
    marginBottom: h(4),
    fontWeight: '700',
  },
  signIn: {
    //color:'#ffffffEE',
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
  inputField: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    marginVertical: h(2),
  },
  button: {
    width: w(85),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: w(2),
    borderRadius: w(10),
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginTop: h(4),
  },
  spinner: {
    height: h(5),
  },
  text: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: totalSize(2.2),
  }
});