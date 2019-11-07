/**
 * Điểm bắt đầu chạy của App
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Onboarding from './screens/onboarding/Onboarding';
import Lifecycle from './screens/Lifecycle/Lifecycle';
import Loginscreen from './screens/login/login';


AppRegistry.registerComponent(appName, () => Loginscreen);
