import React from 'react';
import {
  Button,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

import fire from '../../api/FirebaseConfig';

export default class ProfileHomeScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      email: '',
      password: '', 
    }
  };

  componentDidMount() {
    let user = fire.auth().currentUser;
    if (user) {
      // User is signed in.
      alert(user.uid);
      this.setState({
        uid: user.uid,
      })
    } else {
      // No user is signed in.
      alert('Bạn chưa đăng nhập');
    }
  }

  logOut = () => {   
    AsyncStorage.clear();
    fire.auth().signOut().then(() => {
      // Sign-out successful.
      ToastAndroid.show("Đăng xuất", ToastAndroid.SHORT);
      this.props.navigation.navigate('Splash');
    }).catch((error) => {
      // An error happened.
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      ToastAndroid.show("Lỗi không thể đăng xuất", ToastAndroid.SHORT);
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Updadte profile Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title="Go to Details Update again"
          onPress={() => this.props.navigation.push('ProfileUpdate')}
        />       
        <Button
          title="Đăng xuất"
          onPress={this.logOut}
        />  
        <View style={styles.infoUser}>
        <Text>Thông tin người dùng</Text>
          <Text>{this.state.uid}</Text>
          <Text>{this.state.email}</Text>
          <Text>{this.state.password}</Text>
        </View>        
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBox1: {
    flex: 1
  },
});