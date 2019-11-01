
import React, { Component } from 'react'
import { 
  StyleSheet,
  Dimensions,
  View, 
  FlatList, 
  Text 
} from 'react-native'

import data from '../utils/data'
import Item from '../components/Item'
 
export default class Chat extends Component {
  render() {
    return(
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>Trò chuyện</Text>
        </View>
        <View>
          <Text style={styles.title}>tìm kiếm</Text>
        </View>
        // List chat people
        <FlatList
          ref={"flatList"}
          data={ data }
          renderItem={({ item }) => (
            <Item item={ item } />
          )}
          keyExtractor={(item) => item.id } // tránh trùng các item với nhau
          parentFlatList={this} //để lát làm swipe left và swipe right
        />
      </View>
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
})