import {
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import OnbroadingScreen from '../onbroading/OnbroadingScreen';
import SignInScreen from '../login/SignInScreen';
import SignUpScreen from '../login/SignUpScreen';
import ForgetPasswordScreen from '../login/ForgetPasswordScreen';

const AuthStack = createStackNavigator(
  { 
    Onbroading: OnbroadingScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgetPassword: ForgetPasswordScreen,
  },
  {
    initialRouteName: 'Onbroading',
  }  
);

export default AuthContainer = createAppContainer(AuthStack);