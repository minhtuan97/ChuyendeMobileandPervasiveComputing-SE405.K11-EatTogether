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
export default class ChatPeopleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null, //set item active
      numberOfRefresh: 0,
      isRightOpen: false
    };
  }

  _onLongPress = (navigation) => {
    navigation.navigate('ChatDetail');
  }

  render() {

    const {item} = this.props;
    const {navigation} = this.props;

    return(
      <View style={styles.wraper}>
        <SwipeRow leftOpenValue={90} rightOpenValue={-65}>
          <View style={styles.standaloneRowBack}>
            <Text style={styles.rowBackButttonLeft}>Xem Hồ sơ</Text>
            <Text style={styles.rowBackButttonRight}>Xóa</Text>
          </View>
          <View style={styles.standaloneRowFront}>
            <TouchableOpacity
              onLongPress={() => this._onLongPress(navigation)}
              style={styles.container}
            >
              <View style={styles.bgAvatar}>
                <Image 
                  source={{uri: item.avatar}}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
              </View>
              <View style={styles.bgSeen}>
                <Image 
                  source={{uri: item.avatar}}
                  style={styles.avatarSeen}
                />
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
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
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
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    paddingBottom: 3
  },
  bgSeen: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
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