import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ImageBackground, Alert} from 'react-native';
import InputField from "../../components/login/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import fire from '../../api/FirebaseConfig'
import GetStarted from '../login/login/GetStarted';
import firebaseSDK from '../../utils/firebaseSDK';

const companyLogo = require('../../assets/login/companylogo.png');
const email = require('../../assets/login/email.png');
const password = require('../../assets/login/password.png');
import AsyncStorage from '@react-native-community/async-storage';

export default class SignInScreen extends Component {
    
  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: '', 
      password: '', 
      errorMessage: null,
      hidden: true,
      isEmailCorrect: false,
      isPasswordCorrect: false,
    }
  }

  // Xử lý đăng nhập
  handleSignIn = () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue()
    this.Login(email,password);
  }
  Login = (email, password) => {
      fire.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        Alert.alert(
          'Login',
          'Đăng nhập thành công',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress:() => this.props.navigation.navigate('App')},
          ],
          {cancelable: false},
        )
      }
                   
      )
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          Alert.alert(
              'Lỗi '+ errorMessage,
            )
        });
  };

  render() {
    return (
      <>
      
        <View style={styles.container}>
          <Image style={styles.icon} resizeMode="contain" source={companyLogo} />
          <InputField
            placeholder="Email"
            keyboardType="email-address"
            style={styles.email}
            error={this.state.isEmailCorrect}
            focus={this.changeInputFocus}
            ref={ref => this.email = ref}
            icon={email}
            //onChangeText={(email) => this.setState({ email : email })}
            
          />
          <InputField
            placeholder="Password"
            returnKeyType="done"
            secureTextEntry={true}
            blurOnSubmit={true}
            error={this.state.isPasswordCorrect}
            ref={ref => this.password = ref}
            focus={this.changeInputFocus}
            icon={password}
          />

          <View>
            <TouchableOpacity
              onPress={()=>this.handleSignIn(this)}
              style={styles.button}
              activeOpacity={0.6}
              
            >
              <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <TouchableOpacity
             //onPress={this.props.change('register')} 
              style={styles.touchable} activeOpacity={0.6}>
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={this.props.change('forgot')} 
              style={styles.touchable} activeOpacity={0.6}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: w(70),
    height: h(30),
    marginTop: h(10),
    marginBottom: h(7),
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: h(5),
  },
  email: {
    marginBottom: h(4.5),
  },
  touchable: {
    flex: 1,
  },
  createAccount: {
    //color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  forgotPassword: {
    //color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  button: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: w(2),
    backgroundColor: '#888',
    borderRadius: w(10),
    marginTop: h(8),
  },
  text: {
    color: 'green',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
  spinner: {
    height: h(5),
  },
});
 