import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AuthStack from './src/screens/login/LoginNavigator';
import SplashScreen from './src/screens/splash/SplashScreen';
import ChatNavigator from './src/screens/chat/ChatNavigator';
import NotificationNavigator from './src/screens/notification/NotificationNavigator';
import BlogNavigator from './src/screens/blog/BlogNavigator';
import ProfileNavigator from './src/screens/profile/ProfileNavagator';
import HomeNavigator from './src/screens/home/HomeNavigator';

const AppNavigator = createBottomTabNavigator(
  {
    'Hồ sơ': ProfileNavigator,
    'Trò chuyện': ChatNavigator,
    'Trang chủ': HomeNavigator,
    'Blog': BlogNavigator,
    'Thông báo': NotificationNavigator,
  },
  {
    initialRouteName : 'Thông báo',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch(routeName)
        {
          case 'Trang chủ': iconName = 'home'; break;
          case 'Trò chuyện': iconName = 'comment-alt'; break;
          case 'Thông báo': iconName = 'bell'; break;
          case 'Blog': iconName = 'feather-alt'; break;
          case 'Hồ sơ': iconName = 'user'; break;
        }
        return <Icon name={iconName} size={20} color={tintColor} solid/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
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

export default AppContainer = createAppContainer(InitialNavigator);