import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions,
  TouchableOpacity, 
  Text, 
  Image,  
  ImageBackground,
  Alert,
  StatusBar,
} from 'react-native';
import InputField from "../../components/login/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import fire from '../../api/FirebaseConfig'
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

  // loginToFireBase = (email, password) => {
  //   this.setState({ isLogin: true });
  //   Firebase.userLogin(email, password)
  //     .then(user => {
  //       if(user) this.props.success(user);
  //       this.setState({ isLogin: false });
  //     });
  // };
  // Xử lý đăng nhập
  handleSignIn = () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    // this.setState({
    //   isEmailCorrect: email === '',
    //   isPasswordCorrect: password === '',
    // }, () => {
    //   if(email !== '' && password !== ''){
    //     this.loginToFireBase(email, password);
    //   } else {
    //     console.warn('Fill up all fields')
    //   }
    // });

    this.Login(email,password);
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
  };

  // hàm đăng nhập: lưu AsyncStorage: userToken và chuyển đến AppNavigation
  _signInAsync = (email, password) => {
    // this.setState({ isLogin: true });
    // Firebase.userLogin(email, password)
    //   .then(user => {
    //     if(user) this.props.success(user);
    //     this.setState({ isLogin: false });
    //   });
    try {
      //AsyncStorage.setItem('user', 'abc');
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('password', password);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.warn('Error saving data');
    }
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
            {text: 'OK', onPress: this._signInAsync(email, password)},
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
                error={this.state.isEmailCorrect}
                focus={this.changeInputFocus}
                ref={ref => this.email = ref}
                icon={email}
              />
              <InputField
                placeholder="Password"
                style={styles.inputField}
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
                  <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
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
    //justifyContent: 'center',
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
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
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
    fontWeight: '600',
  },
  forgotPassword: {
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
});