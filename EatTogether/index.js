/**
 * Điểm bắt đầu chạy của App
 */

import {AppRegistry} from 'react-native';
import FirebaseLogin from './App';
import {name as appName} from './app.json';
import Onboarding from './screens/onboarding/Onboarding';
import Lifecycle from './screens/Lifecycle/Lifecycle';
import Loginscreen from './screens/login/login';
import Login from './screens/login/index'
import Register from './screens/singup/index'
import ForgotPassword from './screens/forgotpassword/index'

AppRegistry.registerComponent(appName, () => FirebaseLogin);
