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

export default class ProfileHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Hồ sơ',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  };
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
          title="Cập nhập hồ sơ"
          onPress={() => this.props.navigation.navigate('ProfileUpdate')}
        />    
        <Button
          title="Tạo hồ sơ"
          onPress={() => this.props.navigation.navigate('ProfileCreate')}
        />    
        <Button
          title="Đăng xuất"
          onPress={() => {    
            AsyncStorage.clear();
            this.props.navigation.navigate('Splash');}}
        />  
      </View>
    );
  }
}