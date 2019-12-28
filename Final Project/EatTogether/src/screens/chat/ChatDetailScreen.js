import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ChatDetailScreen extends React.Component {
  state = {
    messages: [],
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.name : 'no name',
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 2,
          text: 'Hẹn gặp tại ... nhé',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
          },
        },
        {
          _id: 3,
          text: 'Nhớ! đúng giờ đấy 9h30.',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    )
  }
}