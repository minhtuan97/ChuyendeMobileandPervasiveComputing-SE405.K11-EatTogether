
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground,FlatList , AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ChatLineHolder } from '../../components/ChatLineHolder';
import Firebase from 'firebase';
import fire from '../../api/FirebaseConfig';

export default class ChatRoom extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            chatData: [],
            chatInputContent : '',
            username : ''
        }
    };
    _onChangeChatInput = (text) =>
    {
        this.setState({
            chatInputContent : text
        });
    }

    async componentDidMount() {
        let username = await AsyncStorage.getItem('name');
        this.setState({username})
        fire.database().ref('/chatRoom').on("value", snapshot => {
            if(snapshot.val() !== undefined && snapshot.val() !== null )
            {
                this.setState({
                    chatData: Object.values(snapshot.val())
                });
            }
            
            
        });
    }

    _sendMessage = () => {
        fire.database().ref('/chatRoom').push({
            userName : this.state.username,
            //userName : "abc",
            chatContent : this.state.chatInputContent,
            
        });
        this.setState({
            chatInputContent : ''
        });
    }

    _renderChatLine = (item) =>
    {
        if(item.userName === this.state.username)
        {
            return(
                <View style={{ alignItems: 'flex-end' }} >
                        <ChatLineHolder sender="YOU" chatContent={item.chatContent} />
                    </View>
            );
        }
        return(
            <ChatLineHolder sender={item.userName} chatContent={item.chatContent} />
        );
    };

  render()
  {
    return(
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }} >
                <ImageBackground imageStyle={{ opacity: 0.4 }} source={require('../../assets/images/cheers.jpg')}
                    style={{ flex: 9 / 10, backgroundColor: '#A5A5A5', flexDirection: 'column', justifyContent: 'flex-end' }} >
                    <FlatList data={this.state.chatData} renderItem={({item},index) => this._renderChatLine(item)} />

                </ImageBackground>
                <View style={{ flex: 1 / 10 }} >
                    <View style={{
                        flexDirection: 'row', backgroundColor: '#FFF',
                        width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', marginLeft: 2
                    }}  >
                        <View style={{flex : 9/10}} >
                        <TextInput placeholder="Nhập nội dung chat" value={this.state.chatInputContent}
                        onChangeText={(text) => this._onChangeChatInput(text)} style={{ height: 100, fontSize: 18 }} />
                        </View>
                        <View style={{flex : 1/10}} >
                        <TouchableOpacity onPress={() => this._sendMessage()} >
                            <Text style={{ color: '#0099ff', fontSize: 14, marginRight: 15 }} >
                                Gửi
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
    );
  }
}