import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

import AuthStack from './src/screens/login/LoginNavigator';
import SplashScreen from './src/screens/splash/SplashScreen';
import Chat from './src/screens/chat/ChatHomeScreen';
//import Chat1 from './src/screens/chat/Chat1';

import Home from './src/screens/home/Home';

const AppNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Chat: Chat,
    //Chat1: Chat1,
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray'
    }
  }
);

const InitialNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthStack,
    App: AppNavigator,
    
  },
  {
    initialRouteName: 'Splash',
  }
);

const AppContainer = createAppContainer(InitialNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppContainer />
      </Provider>
    );
  }
}