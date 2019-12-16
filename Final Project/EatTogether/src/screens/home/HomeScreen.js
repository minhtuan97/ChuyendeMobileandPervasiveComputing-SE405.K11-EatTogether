import React from 'react';
import { 
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

import BookingItem from '../../components/BookingItem';

// Dữ liệu danh sánh people trong list chat
const data = [
  {
    id: '1',
    avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    name: 'Minh Anh',
    time: '12/12/19 10:01',
    timeUtil: '2 tiếng',
    location: 'ToCoToCo Võ Văn Nhân Thủ Đức',
    description: 'Đang thèm trà sữa, ai đi chung không',
    img: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
  },
  {
    id: '2',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Hong Nhi',
    time: '11/12/19 3:40',
    timeUtil: '40 phút',
    location: 'VinCom Thủ Đức',
    description: 'Muốn ăn lẩu Thái',
    img: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
  },
  {
    id: '3',
    avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    name: 'Minh Anh',
    time: '12/12/19 10:01',
    timeUtil: '2 tiếng',
    location: 'ToCoToCo Võ Văn Nhân Thủ Đức',
    description: 'Đang thèm trà sữa, ai đi chung không',
    img: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
  },
  {
    id: '4',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Hong Nhi',
    time: '11/12/19 3:40',
    timeUtil: '40 phút',
    location: 'VinCom Thủ Đức',
    description: 'Muốn ăn lẩu Thái',
    img: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
  },
]

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Trang chủ',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateBooking')}
          style={styles.createBookingButton} 
          activeOpacity={0.6}
        >
          <Icon name='plus' size={22} color={'green'}/>
        </TouchableOpacity>
      ),
    }
  }
  // static navigationOptions = {
  //   title: 'Trang chủ',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  // };

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
      <View style={styles.wraper}>
        <View style={styles.searchBox1}>
          <TouchableOpacity
            onPress={() => alert('Tim kiem')}
            style={styles.searchBox} activeOpacity={0.6}
          >
            <View style={styles.searchIcon}>
              <Icon name='search' size={20} color={'blue'}/>
            </View>
            <View>
              <TextInput
                style={styles.TextInputSearch}
                placeholderTextColor={'grey'}
                underlineColorAndroid='transparent'
                placeholder={'Tìm kiếm'}
                onChangeText={(searchText) => this.setState({searchText})}
                value={this.state.searchText}
              />
            </View>
          </TouchableOpacity>
        </View>        
        <View style={styles.bookingList}>
          <Text style={styles.listBookingText}>Danh sách các Lịch hẹn...</Text>
          <FlatList
            ref={"flatList"}
            data={ data }
            renderItem={({ item }) => (
              <BookingItem item={ item } navigation={this.props.navigation} />
            )}
            keyExtractor={(item) => item.id } // tránh trùng các item với nhau
            parentFlatList={this} //để lát làm swipe left và swipe right
          />
        </View>
        <View style={styles.infoUser}>
          <Text>Thông tin người dùng</Text>
          <Text>{this.state.email}</Text>
          <Text>{this.state.password}</Text>
          <Button
            title="Go to Filte"
            onPress={() => this.props.navigation.navigate('FilteScreen', {
              itemId: 86,
              otherParam: 'anything you want here',
            })}
          />
        </View>
      </View>
    );
  }
}


const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    //width: width,
    //alignItems: 'stretch',
    backgroundColor: 'white',
  },
  searchBox1: {
    flex: 1
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'pink',
  },
  searchIcon: {
    margin: 16,
  },
  createBookingButton: {
    margin: 16,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 4
  },
  listBookingText: {
    padding: 10,
    fontWeight: 'bold',
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
  bookingList: {
    flex: 8,
  },
  infoUser: {
    flex: 2,
    padding: 10,
    borderColor: 'green',
    borderRadius: 4,
    borderWidth: 1,
  },
})