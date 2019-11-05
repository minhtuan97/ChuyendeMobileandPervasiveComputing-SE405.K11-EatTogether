import React from 'react';
import { Text } from 'react-native';
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

import SplashScreen from './src/screens/splash/SplashScreen';
import OnbroadingScreen from './src/screens/onbroading/OnbroadingScreen';
import SignInScreen from './src/screens/login/SignInScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
import ForgetPasswordScreen from './src/screens/login/ForgetPasswordScreen';

import Home from './src/screens/home/Home';

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor }}>Home</Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="home" size={20} color={tintColor} />
      }
    },
    HighScores: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor }}>HighScores</Text>
        ),
        tabBarIcon: ({ tintColor }) =>
          <Icon name="chart-bar" size={20} color={tintColor} />
      }
    },
    Settings: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor }}>Settings</Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon name="cogs" size={20} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray'
    }
  }
);

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

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
