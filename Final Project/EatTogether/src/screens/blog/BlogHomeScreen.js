import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import BlogItem from '../../components/BlogItem';

// Dữ liệu danh sánh people trong list chat
const data = [
  {
    id: '1',
    avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    name: 'Crush số 1',
    description: 'Crush số 1 waved at you!',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '2',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Crush số 2',
    description: 'Em à, Em đã đánh cắp trái tim anh. Vì thế anh sẽ đánh cắp nụ hôn của em',
    img: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '3',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Crush số 3',
    description: 'Em là nguồn cảm hứng đằng sau tất cả những gì anh làm, làm nguồn gốc của những điều tốt lành trong cuộc sống của anh',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '4',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Crush số 4',
    description: 'Cảm ơn chúa, bởi người đã gửi nữ thần xinh đẹp nhất của thiên đường vào cuộc sống của con.',
    img: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '5',
    avatar: 'https://pbs.twimg.com/profile_images/652669289326092288/RsXc7UnS_400x400.jpg',
    name: 'Crush số 5',
    description: 'Anh rất hạnh phúc vì được gặp em, em là điều tuyệt vời nhất trong cuộc sống của anh.',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '6',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Crush số 6',
    description: 'Khi anh yêu em, trái tim em trở nên ấm áp. Hãy để tình yêu ngọt ngào của chúng ta lớn lên theo từng ngày',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '7',
    avatar: 'https://66.media.tumblr.com/2ffbcea054ae96a839d0583f4c56ce38/tumblr_ots4vdLKgl1w0bqvso2_250.gif',
    name: 'Crush số 7',
    description: 'Giữa chúng có một sự sợi dây. Nó buộc trái tim chúng ta lại với nhau vì vậy chúng ta luôn cảm thấy gần nhau dù có cách xa như thế nào?',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '8',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Crush số 8',
    description: 'Anh muốn tặng em trái tim này và em hãy giữ nó, bởi anh rất vụng về, anh sợ rằng anh sẽ làm mất hoặc dễ dàng tặng nó cho một ai khác',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  },
  {
    id: '9',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Crush số 9',
    description: 'Nếu em dám, hãy nắm lấy tay anh và dẫn anh đến trái tim của em. Anh muốn cảm nhận tình yêu của em.',
    img: '',
    like: 10,
    time: '12/12/19 10:01',
  }, 
];

export default class BlogHomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Blog',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => alert('Them bai dawng')}
          style={styles.searchButton} activeOpacity={0.6}
        >
          <Icon name='plus' size={22} color={'green'}/>
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
            <BlogItem item={ item } navigation={this.props.navigation} />
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