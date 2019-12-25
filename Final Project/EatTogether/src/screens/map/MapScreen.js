// import React from 'react';
// import {
//   Button,
//   Dimensions,
//   StyleSheet,
//   View,
//   Text,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-community/async-storage';
// import MapView from 'react-native-maps';


// export default class MapScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Hồ sơ',
//     headerStyle: {
//       backgroundColor: '#f4511e',
//     },
//     headerTintColor: '#fff',
//   };
//   render() {
//     const { navigation } = this.props;
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         {/* <Text>Updadte profile Screen</Text>  */}
//         <MapView
//             style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//             initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//             }}
//         />
//       </View>
//     );
//   }
// }


// const {height, width} = Dimensions.get('window');

// const styles = StyleSheet.create({

//   container1: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default () => (
   <View style={styles.container}>
     <MapView
       //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
);