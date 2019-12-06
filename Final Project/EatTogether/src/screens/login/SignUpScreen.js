// import React, { Component } from 'react';
// import {
//   ActivityIndicator,
//   Dimensions,
//   ImageBackground,
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// export default class SignUpScreen extends Component {

//   static navigationOptions = {
//     title: 'Tạo tài khoản'
//   }
  
//   render() {
//     return (
//       <>
//         <StatusBar barStyle='dark-content' translucent={true} backgroundColor='transparent'/>
//         <ImageBackground source={require('../../assets/images/bg03.jpg')} style={styles.imageBackground}>
//           <View style={styles.header}>
//             <Text style={styles.appTitle}>Sign Up</Text>
//             <ActivityIndicator animating={true} color='green' size='small' style={styles.activityIndicator}/>
//           </View>
//           <View style={styles.main}></View>
//           <View style={styles.footer}>
//             <Text>2019 &copy; SiVai MinhTuan</Text>
//           </View>
//         </ImageBackground>
//       </>
//     );
//   }
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   activityIndicator: {
//     marginTop: 50,
//   },
//   imageBackground: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   logo: {
//     width: width*0.1,
//     height: width*0.1,
//   },
//   appTitle: {
//     color: 'green',
//     fontSize: width*0.13,
//   },
//   header: {
//     flex: 6,
//     justifyContent: 'center',
//   },
//   main: {
//     flex: 3,
//   },
//   footer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });
 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
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

  createFireBaseAccount = (email, password) => {
    this.setState({ isCreatingAccount: true });
    fire.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
          Alert.alert(
            'Đăng ký',
            'Đăng ký tài khoản thành công',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', 
              //onPress:()=> this.props.navigation.navigate('Login')
            },
            ],
            {cancelable: false},
          )
        }
            // this.setState({
            //     //username:'',
            //    // pass:'',
            // }),
            
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
        <Text style={styles.create}>CREATE ACCOUNT</Text>
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
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Password"
          error={this.state.isPasswordCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.password = ref}
          secureTextEntry={true}
          icon={password}
        />
        <InputField
          placeholder="Repeat Password"
          error={this.state.isRepeatCorrect}
          style={styles.input}
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.repeat = ref}
          icon={repeat}
        />
        
        <TouchableOpacity
        activeOpacity={0.5}
        onPress={()=>this.handleSignIn(this)}
        style={styles.button}>
        {this.props.isCreating
        ? <ActivityIndicator size="large" style={styles.spinner} color='white' />
        : <Text style={styles.text}>Continue</Text>}
        </TouchableOpacity>

        <TouchableOpacity 
        // onPress={this.props.change('login')} 
        style={styles.touchable}>
          <Text style={styles.signIn}>{'<'} Sign In</Text>
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
  input: {
    marginVertical: h(2),
  },
  button: {
    width: w(85),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
    //color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: totalSize(2.2),
  }
});