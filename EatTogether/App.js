import React, {Component} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="transparent"/>
        <ImageBackground source={require('./assets/bg01.jpg')} style={styles.backgroundImage}>
          <View>
            <Text style={styles.headerText}>Eat Together</Text>
            <ActivityIndicator animating={true} size="small" color="#ffffff" style={styles.activityIndicator}/>
          </View>
        </ImageBackground>
      </>
    );
  }
};

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 50,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor:'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 100,
    alignContent: 'center',
    color: 'white',
    fontSize: 64,
  }
});
