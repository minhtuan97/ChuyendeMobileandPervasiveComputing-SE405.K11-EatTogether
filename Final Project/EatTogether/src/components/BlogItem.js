import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

// Thẻ từng bài đăng Blog
export default class BlogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: true,
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
            <Icon name='ellipsis-v' size={16} color={'grey'}/>
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
          <TouchableOpacity 
            style={styles.likeIcon}
            onPress={() => this.setState(previousState => (
              { isLiked: !previousState.isLiked }
            ))}
          >
            { this.state.isLiked ? (
              <Icon name='heart' color='pink' size={20} solid />
            ) : (
              <Icon name='heart' color='pink' size={20}/>
            )}
          </TouchableOpacity>
          <View style={styles.likeCount}>
            <Text style={styles.likeCountText}>{item.like} Lượt thích</Text>
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
    backgroundColor: 'white',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 4
  },
  main: {

  },
  avatarImg: {
    width: width*0.12,
    height: width*0.12,
    borderRadius: width*0.06,
    margin: 4,
  },
  img: {
    width: width,
    height: width,
  },
  option: {
    flex: 1,
  },
  nameAndTime: {
    flex: 8,
    marginLeft: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {

  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  nameText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
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
  },
  likeIcon: {
    marginHorizontal: 5,
  },
  likeCountText: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
})