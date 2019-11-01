import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'

import Swipeout from 'react-native-swipeout'
import Icon from 'react-native-vector-icons/FontAwesome5'
 
export default class ChatItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null, //set item active
      numberOfRefresh: 0,
      isRightOpen: false
    };
  }
 
  _onLongPress = () => {
    this.setState({
      isRightOpen: true
    })
  }
 
  _scroll = () => {
    this.setState({
      isRightOpen: false
    })
  }

  _onOpen = () => {
    this.setState({
      activeRowKey: this.props.item.key
    });
  }

  _onClose = () => {
    if(this.state.activeRowKey != null) {
      this.setState({
        activeRowKey: null
      });
    }
  }

  render() {

    const {item} = this.props

    const swipeSettings = {
      autoClose: true, //sẽ tự động đóng khi ta click vào buton nào đó trong item được swipe
      onOpen: this._onOpen, //khi open swipe thì nên set row nào được active để tránh nhầm lẫn sư ta click sự kiện bên trong các item.
      onClose: this._onClose, //xóa row active
      
      // swipe phía bên trái
      left: [
              {
                onPress: () => {},
                component: (
                    <View style={styles.item}>
                      <View style={[styles.inItem, {backgroundColor: '#45B8AC'}]}>
                        <Icon name="camera" style={[styles.icon, {color: 'white'}]} />
                      </View>
                    </View>
                  ),
                  backgroundColor: 'white'
              },
              {
                onPress: () => {},
                component: (
                  <View style={styles.item}>
                    <Icon name="phone" style={styles.icon} />
                  </View>
                ),
                backgroundColor: 'white'
              },
              {
                onPress: () => {},
                component: (
                  <View
                    style={styles.item}
                  >
                    <Icon name="video" style={styles.icon} />
                  </View>
                ),
                backgroundColor: 'white'
              }
            ],

      // swipe phía bên phải    
      right: [
              {
                onPress: () => {},
                component: (
                  <View style={styles.item}>
                    <Icon name="bars" style={styles.icon} />
                  </View>
                ),
                backgroundColor: 'white'
              },
              {
                onPress: () => {},
                component: (
                  <View style={styles.item}>
                    <Icon name="bell" style={styles.icon} />
                  </View>
                ),
                backgroundColor: 'white'
              },
              {
                onPress: () => {},
                component: (
                  <View style={styles.item}>
                    <View style={[styles.inItem, {backgroundColor: '#E94B3C'}]}>
                      <Icon name="trash" style={[styles.icon, {color: 'white'}]} />
                    </View>
                  </View>
                ),
                backgroundColor: 'white',                   
              }
            ],

      rowId: this.props.index,
      sextionId: 1
      }

    return (
      <Swipeout 
       {...swipeSettings}
       backgroundColor='white'
       openRight={this.state.isRightOpen}
       scroll={this._scroll}
      >
        <TouchableOpacity
          onLongPress={this._onLongPress}
        >
          <View style={styles.container}>
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
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
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
