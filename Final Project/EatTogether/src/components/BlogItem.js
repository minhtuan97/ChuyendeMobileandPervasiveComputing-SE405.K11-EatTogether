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

// Thẻ từng người trong danh sách chat
export default class BlogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null, //set item active
      numberOfRefresh: 0,
      isRightOpen: false
    };
  }

  _onLongPress = (navigation) => {
    alert('đi đến thông báo');
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
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.option}>
            <Icon name='ellipsis-v' size={20} color={'grey'}/>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.status}>
            <Text style={styles.statusText}>{item.description}</Text>
          </View>
          { item.img.length > 0 &&
            <View style={styles.img}>
              <Image 
                source={{uri: item.img}}
                style={styles.img}
              />
            </View>
          }
        </View>
        <View style={styles.footer}>
          <View style={styles.likeIcon}>
            <Icon name='heart' color='pink' size={20} solid />
          </View>
          <View style={styles.likeCount}>
            <Text style={styles.likeCountText}>{item.like}</Text>
          </View>
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