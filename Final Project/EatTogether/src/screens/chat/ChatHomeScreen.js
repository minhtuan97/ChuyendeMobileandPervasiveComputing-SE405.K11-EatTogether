import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import ChatPeopleItem from '../../components/ChatPeopleItem';

// Dữ liệu danh sánh people trong list chat
const data = [
  {
    id: '1',
    avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    name: 'Crush số 1',
    description: 'Crush số 1 waved at you!'
  },
  {
    id: '4',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Crush số 4',
    description: 'Cảm ơn chúa, bởi người đã gửi nữ thần xinh đẹp nhất của thiên đường vào cuộc sống của con.'
  },
];

export default class ChatHomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Trò Chuyện',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatSearch')}
          style={styles.searchButton} activeOpacity={0.6}
        >
          <Icon name='search' size={22} color={'green'}/>
        </TouchableOpacity>
      ),
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: data,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={"flatList"}
          data={ data }
          renderItem={({ item }) => (
            <ChatPeopleItem item={ item } navigation={this.props.navigation} />
          )}
          keyExtractor={(item) => item.id } // tránh trùng các item với nhau
          parentFlatList={this} //để lát làm swipe left và swipe right
        />
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  searchButton: {
    margin: 16,
  },
});