import React, { Component } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
    }
    //AsyncStorage.setItem('userToken', 'abc');
    //this.props.navigation.navigate('App');
    //this._signOutAsync();
  }

  // Xử lý đăng nhập
  handleSignUp = () => {
    this.setState(() =>{isLogin: true;});
    // TODO: Firebase stuff...

    this.props.navigation.navigate('App');
    console.log('handleSignUp');
  }

  render() {
    return (
      <>
        <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent'/>
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.titleHeader}>Tham gia ngay!</Text>
            <Image source={require('../../assets/logo/share.png')} style={styles.logo} />
            <Text style={styles.titleApp}>Eat Together</Text>
          </View>

          <View style={styles.main}>
            {/* Thông báo lỗi */}
            {this.state.errorMessage && 
             <Text style={styles.errorText}>
               {this.state.errorMessage}
             </Text>
            }
            <View style={styles.username}>
              <Icon name='user' size={20} color='black'/>
              <TextInput
                autoCapitalize="none"
                style={styles.usernameTextInput}
                placeholder="Tên tài khoản"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
            </View>
            <View style={styles.password}>
              <Icon name='lock' size={20} color='black'/>
              <TextInput
                secureTextEntry={this.state.hidden}
                autoCapitalize="none"
                style={styles.passwordTextInput}
                placeholder="Mật khẩu"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <TouchableOpacity onPress={ () => ( this.setState(previousState => (
                                                    { hidden: !previousState.hidden }
                                                  ))
                                                ) }
              >
                { this.state.hidden ? <Icon name='eye' size={20} color='black'/>
                  : <Icon name='eye-slash' size={20} color='black'/>
                }
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity  onPress={this.handleSignUp}> 
                <View style={styles.button}>
                {this.state.isLogin
                  ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
                  : <Text style={styles.textButton}>Đăng nhập</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </View> 

          <View style={styles.footer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('SignUp')}> 
              <View style={styles.button}>
                <Text style={styles.textButton}>Tạo tài khoản</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('ForgetPassword')}> 
              <View style={styles.button}>
                <Text style={styles.textButton}>Quên mật khẩu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Layer
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: 'blue',
    flex: 4,
    justifyContent: 'center',
  },
  main: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  //
  logo: {
    width: width*0.2,
    height: width*0.2,
    margin: 10,
  },
  titleHeader: {
    color: 'green',
    marginLeft: 10,
  },
  titleApp: {
    color: 'green',
    fontSize: width*0.1,
    marginLeft: 10,
  },


  // Input
  username: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40 , 
    borderWidth: 1, 
    borderRadius: 16, 
    padding: 10, 
    width: width*0.9
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40 , 
    borderWidth: 1, 
    borderRadius: 16, 
    padding: 10, 
    width: width*0.9
  },
  usernameTextInput: {
    height: 40,
  },
  passwordTextInput: {
    height: 40,
  },
  signin: {
    backgroundColor: 'green',
    borderRadius: 16,
  },
  signinText: {

  },
  signinButton: {
    backgroundColor: 'green',
    borderRadius: 16,
  },
  //
  button: {
    margin: 20,
  }
});
 