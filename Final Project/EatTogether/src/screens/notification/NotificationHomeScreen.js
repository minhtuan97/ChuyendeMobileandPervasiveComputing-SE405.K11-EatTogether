import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import NotificationItem from '../../components/NotificationItem';

// Dữ liệu danh sánh people trong list chat
const data = [
  {
    id: '1',
    avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    name: 'Heo con',
    description: 'Đã theo dõi bạn!',
    time: '24/12/19 11:10',
    seen: false,
  },
  {
    id: '4',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Minh Anh',
    description: 'Bạn sắp có lịch hẹn với Minh Anh',
    time: '18/12/19 17:20',
    seen: true,
  },
  {
    id: '5',
    avatar: 'https://pbs.twimg.com/profile_images/652669289326092288/RsXc7UnS_400x400.jpg',
    name: 'Minh Minh',
    description: 'Đã thích bài viết của bạn',
    time: '16/12/19 13:40',
    seen: false,
  },
  {
    id: '6',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Gấu AK',
    description: 'Đã theo dõi bạn',
    time: '22/12/19 6:40',
    seen: false,

  },
  {
    id: '7',
    avatar: 'https://66.media.tumblr.com/2ffbcea054ae96a839d0583f4c56ce38/tumblr_ots4vdLKgl1w0bqvso2_250.gif',
    name: 'Ly Ly',
    description: 'Đã thích bài viết...',
    time: '6/12/19 18:45',
    seen: true,
  },
  {
    id: '9',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Hùng Dũng',
    description: 'Đã chấp nhận lời mời của bạn.',
    time: '12/11/19 9:05',
    seen: false,
  }, 
];

export default class NotificationHomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Thông báo',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => params._deleteAll()}
          style={styles.searchButton} activeOpacity={0.6}
        >
          <Icon name='trash' size={22} color={'red'}/>
        </TouchableOpacity>
      ),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      _deleteAll: this._deleteAll,
    });
  }
  
  // Xóa tất cả thông báo
  _deleteAll = () => {
    Alert.alert(
      'Xóa tất cả thông báo',
      'Bạn có chắc chắn chưa?',
      [
        {
          text: 'Hủy',
          onPress: () => console.warn('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => console.warn('OK Pressed')
        },
      ],
      {cancelable: false},
    );
  }

  // Xóa tất cả thông báo đã chọn
  _deleteSelected = (id) => {
    Alert.alert(
      'Xóa thông báo đã chọn',
      'Bạn có chắc chắn chưa?',
      [
        {
          text: 'Hủy',
          onPress: () => console.warn('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => console.warn('OK Pressed')
        },
      ],
      {cancelable: false},
    );
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
            <NotificationItem item={ item } navigation={this.props.navigation} />
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
    //backgroundColor: 'red',
  },
});