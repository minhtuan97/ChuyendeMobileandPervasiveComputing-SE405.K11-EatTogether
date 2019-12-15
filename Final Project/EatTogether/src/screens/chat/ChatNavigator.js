import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ChatHomeScreen from '../chat/ChatHomeScreen';
import ChatDetailScreen from '../chat/ChatDetailScreen';
import ChatSearchScreen from '../chat/ChatSearchScreen';

const ChatStack = createStackNavigator(
  { 
    ChatHome: ChatHomeScreen,
    ChatDetail: ChatDetailScreen,
    ChatSearch: ChatSearchScreen,
  },
  {
    initialRouteName: 'ChatHome',
    // navigationOptions : {
    //   title: 'Trò Chuyện',
    // }
  }  
);

export default ChatNavigator = createAppContainer(ChatStack);