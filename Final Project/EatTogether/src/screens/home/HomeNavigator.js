import React from 'react';
import { 
  Button,
  View,
  Text 
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../home/HomeScreen';
import FilteScreen from '../home/FilteScreen';
import CreateBookingScreen from '../booking/CreateBookingScreen';
const HomeNavigator = createStackNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
      },
      FilteScreen: {
        screen: FilteScreen,
      },
      CreateBooking: {
        screen: CreateBookingScreen,
      }
    },
    {
      initialRouteName: 'HomeScreen',
    }
  );
  
  export default createAppContainer(HomeNavigator);