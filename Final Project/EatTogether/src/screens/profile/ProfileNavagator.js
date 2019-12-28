import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProfileHomeScreen from '../profile/ProfileHomeScreen';

const ProfileNavigator = createStackNavigator(
  {
    ProfileHome: {
      screen: ProfileHomeScreen,
    },
  },
  {
    initialRouteName: 'ProfileHome',
  }
);

export default createAppContainer(ProfileNavigator);