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

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarLabel: ({ tintColor }) => (
      <Text style={{ fontSize: 10, color: tintColor }}>HighScores</Text>
    ),
    tabBarIcon: ({ tintColor }) =>
      <Icon name="home" size={20} color={tintColor} />
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />     
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />   
        <Button
          title="log out"
          onPress={() => {    AsyncStorage.clear();
                              this.props.navigation.navigate('Splash');}}
        />  
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) =>
    <Icon name="home" size={20} color={'red'} />
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

  componentWillMount() {
    this._retrieveData();
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{this.state.email}</Text>
        <Text>{this.state.password}</Text>
        <Button
          title="Go to Details"
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

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);