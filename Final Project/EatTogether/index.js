import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//import Onbroading from './src/screens/onbroading/Onbroading';
//import Splash from './src/screens/splash/Splash';
import ChatHomeScreen from './src/screens/chat/ChatHomeScreen';

AppRegistry.registerComponent(appName, () => ChatHomeScreen);
