import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import JoinRoom from './src/screens/chat/JoinRoom ';
import ChatRoom from './src/screens/chat/ChatRoom';

//const JoinStack = createStackNavigator({ JoinRoom: JoinRoom });

//const ChatRoomStack = createStackNavigator({ChatRoom : ChatRoom});


// export default createAppContainer(createSwitchNavigator(
// {
//   Join : {  
//     screen : JoinStack
// },
//   ChatRoom : {
//     screen : ChatRoomStack
//   }
// },
// {
// initialRouteName: 'Join',
// }
// ));
const MainNavigator = createStackNavigator({
  JoinRoom: {screen: JoinRoom},
  ChatRoom: {screen: ChatRoom},
},
{
  initialRouteName: 'JoinRoom',
  // navigationOptions : {
  //   title: 'Trò Chuyện',
  // }
}  
);

const AppChat = createAppContainer(MainNavigator);

export default AppChat;