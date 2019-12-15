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

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Thẻ từng người trong danh sách chat
export default class NotificationItem extends Component {
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
        <SwipeRow leftOpenValue={80} rightOpenValue={-80}>
          <View style={styles.standaloneRowBack}>
            <TouchableOpacity style={styles.buttonLeft} onPress={() => alert('Đã đọc')}>
              <Text style={styles.rowBackButttonLeft}>Đã đọc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight} onPress={() => alert('Đã xóa')}>
              <Text style={styles.rowBackButttonRight}>Xóa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.standaloneRowFront}>
            <TouchableOpacity
              onLongPress={() => this._onLongPress(navigation)}
              style={styles.container}
            >
              <View style={styles.bgSeen}>
                { !item.seen && 
                  <View style={styles.dotSeen}></View>
                }
              </View>              
              <View style={styles.bgAvatar}>
                <Image 
                  source={{uri: item.avatar}}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.info}>
                <View style={styles.nameAndTime}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.content}>
                  <Text numberOfLines={1}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </SwipeRow>
      </View>       
    )
  }
}


const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    margin: 4,
    borderRadius: 4,
  },
  standaloneRowBack: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    //alignItems: 'center',
    //backgroundColor: 'green',
    //flex: 1,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //padding: 15,
  },
  buttonLeft: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 4,
    paddingLeft: 15,
    backgroundColor: 'green',
  },
  buttonRight: {
    flex: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 30,
    backgroundColor: 'red',
  },
  standaloneRowFront: {
    borderRadius: 4,
    backgroundColor: 'white',
  },
  rowBackButttonLeft: {
    //backgroundColor: 'orange',
  },
  rowBackButttonRight: {
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 20
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
  avatar:{
    width: width*15/100,
    height: width*15/100,
    borderRadius: width*10/100,
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  nameAndTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    paddingBottom: 3
  },
  time: {
    fontSize: 12,
  },
  content: {
    //color: 'red',
  },
  bgSeen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dotSeen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
  },
  avatarSeen: {
    width: width*5/100,
    height: width*5/100,
    borderRadius: width*2.5/100,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  inItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, 
    height: 40, 
    borderRadius: 20
  },
  icon: {
    fontSize: width*6/100,
  }
})