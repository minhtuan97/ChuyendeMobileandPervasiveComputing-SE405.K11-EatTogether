import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions,
  TouchableOpacity, 
  Text,
  TextInput, 
  Image,  
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import InputField from "../../components/login/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import fire from '../../api/FirebaseConfig';

const email = require('../../assets/login/email.png');
const password = require('../../assets/login/password.png');

export default class SignInScreen extends Component {
    
  // Ẩn header của navigation
  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false, // Đang login
      email: '', // Email
      password: '',  //Password
      errorMessage: null,
      hidden: true, // Ẩn hiện mật khẩu
      isEmailCorrect: false,
      isPasswordCorrect: false,
    }
  }

  // Xử lý Bấm nút đăng nhập đăng nhập
  handleSignIn = () => {
    // Ẩn bàn phím
    Keyboard.dismiss();
    // Disable nút đăng nhập
    this.setState({ isLogin: true });
    // Lấy giá trị từ các Input Text
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();
    // Đăng nhập email qua firebase
    this.Login(email,password);
    //Enable nút đăng nhập
    this.setState({ isLogin: false });
  }

  // hàm lưu AsyncStorage chuyển vào màn hình chính nếu Login thành công
  _signInAsync = async (email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.warn('Lỗi lưu dữ liệu');
    }
  }

  // Hàm đăng nhập qua firebase
  Login = (email, password) => {
    fire.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      // thành công
      ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
      this._signInAsync(email, password);
    }).catch(function(error) {
      // thất bại
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor={'green'} barStyle={'light-content'}/>
        <ImageBackground source={require('../../assets/images/bg02.jpg')} style={styles.imageBackground}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.header1}>
                <Text style={styles.title}>Tham gia ngay!</Text>
              </View>
              <View style={styles.header2}>
                <Image source={require('../../assets/logo/share.png')} style={styles.logo} />
                <Text style={styles.titleApp}>Eat Together</Text>
              </View>
            </View>
            <View style={styles.main}>
              <InputField
                placeholder="Email"
                keyboardType="email-address"
                style={styles.inputField}
                blurOnSubmit={true}
                error={this.state.isEmailCorrect}
                focus={this.changeInputFocus}
                ref={ref => this.email = ref}
                icon={email}
              />
              <InputField
                placeholder='Password'
                style={styles.inputField}
                returnKeyType="done"
                secureTextEntry={true}
                blurOnSubmit={true}
                error={this.state.isPasswordCorrect}
                ref={ref => this.password = ref}
                focus={this.changeInputFocus}
                icon={password}
              />
              <TouchableOpacity
                onPress={()=>this.handleSignIn(this)}
                style={styles.button}
                activeOpacity={0.6} 
                disabled={this.state.isLogin}
              >
                { this.state.isLogin ? (
                  <ActivityIndicator size="small" color='white'/>
                ) : (
                  <Text style={styles.text}>Đăng nhập</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={ () => this.props.navigation.navigate('SignUp') } 
                style={styles.touchable} activeOpacity={0.6}>
                <Text style={styles.createAccount}>Tạo tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => this.props.navigation.navigate('ForgetPassword') } 
                style={styles.touchable} activeOpacity={0.6}>
                <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  imageBackground: {
    flex: 1,
  },
  header: {
    flex: 3,
  },
  header1: {
    justifyContent: 'center',
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    color: 'green',
  },
  logo: {
    margin: 10,
    width: width*0.12,
    height: width*0.12,
  },
  titleApp: {
    color: 'green',
    fontSize: width*0.1,
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: h(5),
  },
  inputField: {
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  button: {
    width: width*0.85,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    backgroundColor: 'green',
    borderRadius: w(10),
  },
  text: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: h(1),
    fontSize: totalSize(2.1),
  },
  spinner: {
    height: h(5),
  },
  touchable: {
    flex: 1,
  },
  createAccount: {
    textAlign: 'center',
    fontSize: totalSize(2),
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: totalSize(2),
  },
});