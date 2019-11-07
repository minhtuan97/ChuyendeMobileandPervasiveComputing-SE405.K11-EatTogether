import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from '../../assets/login/logo.png'

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={logoImg} style={styles.image} />
                <Text style={styles.text} >EatTogether</Text>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex: 3,
        alignItems:'center',
        justifyContent:'center',
    },
    image: {
        width: 120,
        height: 120,
    },
    text:{
        color: 'white',
        fontWeight:'bold',
        fontSize: 20,
        backgroundColor: 'transparent',
        marginTop: 20,
    }

})
