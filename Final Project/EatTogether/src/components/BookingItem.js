import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList,
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class BookingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user: '',
      location: '',
      time: '',
      title: '',
      hiden: true, 
    };
  }

  _booking = (navigation) => {
    alert('Đã đặt lịch');
    //navigation.navigate('ChatDetail');
  }

  _showMore = () => {
    this.setState((previousState) => (
      { hiden: !previousState.hiden }
    ))
    //alert('đi đến thông báo');
    //navigation.navigate('ChatDetail');
  }

  render() {

    const {item} = this.props;
    const {navigation} = this.props;

    return(
      <View style={styles.wraper}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image
              source={{uri: item.avatar}}
              style={styles.avatarImg}
            />
          </View>
          <View style={styles.nameAndTime}>
            <View style={styles.name}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
            <View style={styles.time}>
              <Text style={styles.timeText}>{item.timeUtil}</Text>
            </View>
          </View>
          <View style={styles.option}>
            <Icon name='ellipsis-v' size={20} color={'grey'}/>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.content}>
            <Icon name='clock' size={20} color={'red'}/>
            <Text style={styles.statusText}>{item.time}</Text>
          </View>
          <View style={styles.content}>
            <Icon name='map-marker-alt' size={20} color={'red'}/>
            <Text style={styles.statusText}>{item.location}</Text>
          </View>
          <View style={styles.content}>
            <Icon name='poll-h' size={20} color={'red'}/>
            <Text style={styles.statusText}>{item.description}</Text>
          </View>
          { false &&
            <View style={styles.img}>
              <Image 
                source={{uri: item.img}}
                style={styles.img}
              />
            </View>
          }
          { !this.state.hiden &&
            <View>
              <View style={styles.content}>
                <Icon name='guitar' size={20} color={'red'}/>
                <Text style={styles.statusText}>Sở thích: xem phim, đó bóng</Text>
              </View>
              <View style={styles.content}>
                <Icon name='hamburger' size={20} color={'red'}/>
                <Text style={styles.statusText}>Món ăn ưa thích: Bún đậu</Text>
              </View>
            </View>
          }
        </View>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.seeMoreButton}
            onPress={this._showMore}
          >
            <Text style={styles.seeMoreText}>Xem thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.startBookingButton}
            onPress={this._booking}
          >
            <Text style={styles.startBookingText}>Đăt lịch</Text>
          </TouchableOpacity>
        </View>
      </View>   
    )
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
    borderWidth: 1,
    borderColor: 'red',
    //backgroundColor: 'grey',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
  },
  status: {
    flexDirection: 'row',
  },
  statusText: {
    padding: 6,
    //color: 'red',
  },
  likeIcon: {
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 6,
  },
  seeMoreButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBookingButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreText: {
    color: 'yellow',
  },
  startBookingText: {
    color: 'pink',
  },
})