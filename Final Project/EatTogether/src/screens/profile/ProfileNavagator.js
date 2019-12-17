import React from 'react';
import { 
  Button,
  View,
  Text 
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

import ProfileHomeScreen from '../profile/ProfileHomeScreen';
import UpdateProfileScreen from '../profile/UpdateProfileScreen';
import RegisterProfileScreen from '../profile/RegisterProfileScreen';


const ProfileNavigator = createStackNavigator(
    {
      ProfileHome: {
        screen: ProfileHomeScreen,
      },
      ProfileUpdate: {
        screen: UpdateProfileScreen,
      },
      ProfileCreate: {
        screen: RegisterProfileScreen,
      }
    },
    {
      initialRouteName: 'ProfileHome',
    }
  );
  
  export default createAppContainer(ProfileNavigator);