import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const { width, heigh} = Dimensions.get('window');
export default class Onboarding extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent"/>
        <ImageBackground source={require('../../assets/bg02.jpg')} style={styles.imageBackground}>
          <View style={styles.container}>
            <View style={styles.info}>
              <ScrollView pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width, backgroundColor: 'red', opacity: 0.5}}>
                  <Text>Page 1</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width, backgroundColor: 'blue', opacity: 0.5}}>
                  <Text>Page 2</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width, backgroundColor: 'gray', opacity: 0.5}}>
                  <Text>Page 3</Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.footer}>
              <Text style={{color: 'white',}}>Tham gia nào</Text>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  imageBackground: {
    flex: 1,
    //width: '100%',
    //height: '100%',
    //flexDirection: 'column',
    //backgroundColor:'transparent',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    flex: 9,
  },
  scrollView: {
    flex: 1,
  },
});
