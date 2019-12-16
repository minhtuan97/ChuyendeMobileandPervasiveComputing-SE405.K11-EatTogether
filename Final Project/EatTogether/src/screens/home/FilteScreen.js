import React from 'react';
import { 
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

export default class FilteSreen extends React.Component {
  static navigationOptions = {
    title: 'Lọc',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      email : '11',
      password: '33', 
    }
  }
  // Lấy dữ liệu từ AsyncStorage
  _retrieveData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email !== null && password !== null) {
        // We have data!!
        this.setState({
          email,
          password
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  UNSAFE_componentWillMount() {
    this._retrieveData();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{this.state.email}</Text>
        <Text>{this.state.password}</Text>
        <Button
          title="Lọc danh sach mọi người"
          onPress={() => this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
            })
          }
        />
        
      </View>
    );
  }
}


const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    width: width,
    alignItems: 'stretch',
    marginVertical: 10,
    borderRadius: 8,
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 4
  },
  main: {

  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    //borderTopWidth: 1,
  },
  avatarImg: {
    width: width*15/100,
    height: width*15/100,
    borderRadius: width*10/100,
    margin: 4,
  },
  img: {
    width: width,
    height: 320,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 20
  },
  option: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  }, 
  bgAvatar: {
    flex: 2
  },
  nameAndTime: {
    flex: 8,
    marginLeft: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {

  },
  nameText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    //paddingBottom: 3
  },
  time: {

  },
  timeText: {
    fontSize: 12,
  },
  status: {

  },
  statusText: {
    padding: 20,
    //color: 'red',
  },
  likeIcon: {
    marginHorizontal: 5,
  },
  likeCountText: {
    marginHorizontal: 5,
  },
})