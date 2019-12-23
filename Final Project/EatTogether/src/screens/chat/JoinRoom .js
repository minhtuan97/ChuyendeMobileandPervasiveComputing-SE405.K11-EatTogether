import React from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage } from 'react-native';
import fire from '../../api/FirebaseConfig';


export default class JoinRoom extends React.Component
{
    static navigationOptions = {
        title: 'Welcome to Chat Group',
    };
    state = {
        name : ''
    };
    static navigationOptions = {
        title: 'JoinRoom',
      };


  // đăng nhập anonymous, lưu tên người dùng và navigate đến phòng chat 
  _toChatRoom = () => {
        fire.auth().signInAnonymously().then((user) => {
            AsyncStorage.setItem('name',this.state.name);
            this.props.navigation.navigate('ChatRoom');
        }).catch( (err) => alert(err) );
    }
    _onChangeName = (text) =>
    {
        this.setState({
            name : text
        });
    };

    // componentWillMount() {
    //     var config = {
    //         apiKey: "AIzaSyAFw1N1TprRQAAqDzuhwHA4sBlXBk1ejiQ",
    //         authDomain: "eattogetherdb.firebaseapp.com",
    //         databaseURL: "https://eattogetherdb.firebaseio.com",
    //         projectId: "eattogetherdb",
    //         storageBucket: "eattogetherdb.appspot.com",
    //         messagingSenderId: "1074702581493",
    //         appId: "1:1074702581493:web:839f1b64bfc375542d0fbc",
    //         measurementId: "G-2C7F9P3YD4"
    //     };
    //     firebase.initializeApp(config);
    // };

    render()
 {
  return(
   <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10, paddingBottom: 15 }} >
                <Text>
                    ENTER YOUR NAME :
                </Text>
                <TextInput placeholder="" style={{
                    borderColor: "#A5A5A5",
                    borderWidth: 0.5, padding: 8, width: '100%', marginBottom: 15, marginTop: 15
                    }} 
                    onChangeText={(text) => this._onChangeName(text)}
                />
                <TouchableOpacity onPress={() => this._toChatRoom()} >
                    <Text style={{ fontWeight: 'bold' }} >
                        Join Now
                    </Text>
                </TouchableOpacity>
 </View>
  );
}
}