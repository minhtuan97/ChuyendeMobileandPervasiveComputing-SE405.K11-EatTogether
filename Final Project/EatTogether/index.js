import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
//import ChatSearchScreen from './src/screens/chat/ChatSearchScreen';
//import NotificationHomeScreen from './src/screens/notification/NotificationHomeScreen';
import App from './notification';
import AppChat from './Appchat';
import JoinRoom from './src/screens/chat/JoinRoom ';
import ChatRoom from './src/screens/chat/ChatRoom';


AppRegistry.registerComponent(appName, () => AppChat);