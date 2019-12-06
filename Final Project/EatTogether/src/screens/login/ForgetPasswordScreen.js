// import React, { Component } from 'react';
// import {
//   ActivityIndicator,
//   Dimensions,
//   ImageBackground,
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
// } from 'react-native';
// import { TextInput } from 'react-native-paper';

// export default class ForgetPasswordScreen extends Component {

//   static navigationOptions = {
//     title: 'Quên mật khẩu'
//   }
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text>Nhập Email đăng nhập</Text>
//           <TextInput
//             style={styles.usernameTextInput}
//             placeholder="Tên tài khoản"
//             //onChangeText={(text) => this.setState({text})}
//             //value={this.state.text}
//           />
//         </View>
//         <View style={styles.main}></View>
//         <View style={styles.footer}>
//           <TouchableOpacity  onPress={this._onPressButton}>
//             <View style={styles.button}>
//               <Text style={styles.joinText}>Đổi mật khẩu</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
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
//     margin: 30,
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
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import InputField from "../../components/login/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import fire from '../../api/FirebaseConfig'

const email = require('../../assets/login/email.png');

export default class ForgotPassword extends Component {

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
        alert("Nhap email");
      }
    });
  };

  sendEmailWithPassword = (email) => {
   fire.auth().sendPasswordResetEmail(email)
   .then(function (user) {
    alert('Please check your email...')
  })
  .catch(function (e) {
    console.log(e)
  })
};

  onFocusChanged = () => {
    this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.forgot}>Forgot Your Password?</Text>
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <TouchableOpacity onPress={this.sendEmail} activeOpacity={0.6} style={styles.button}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        //onPress={this.props.change('login')} 
        style={styles.touchable}>
          <Text style={styles.login}>{'<'} Back To Login</Text>
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
  forgot: {
    //color:'white',
    fontSize: totalSize(2.5),
    marginBottom: h(5),
    fontWeight: '700',
  },
  button: {
    width: w(85),
    marginTop: h(6),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: w(1.8),
    borderRadius: w(25),
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  buttonText: {
    //color: 'white',
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