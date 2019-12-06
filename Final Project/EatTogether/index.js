import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignInScreen from './src/screens/login/SignInScreen'
import SignUpScreen from './src/screens/login/SignUpScreen'
import ForgetPasswordScreen from './src/screens/login/ForgetPasswordScreen'


AppRegistry.registerComponent(appName, () => SignInScreen);
