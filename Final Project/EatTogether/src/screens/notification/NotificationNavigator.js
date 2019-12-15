import {
    createSwitchNavigator,
    createAppContainer
  } from 'react-navigation';
  import { createStackNavigator } from 'react-navigation-stack';
  
  import NotificationHomeScreen from '../notification/NotificationHomeScreen';
  
  const NotificationStack = createStackNavigator(
    { 
      NotificationHome: NotificationHomeScreen,
    },
    {
      initialRouteName: 'NotificationHome',
    },
  );
  
  export default NotificationNavigator = createAppContainer(NotificationStack);