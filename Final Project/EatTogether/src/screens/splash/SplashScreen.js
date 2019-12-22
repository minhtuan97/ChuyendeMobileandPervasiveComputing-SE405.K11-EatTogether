import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {

    // Kiểm tra trạng thái đăng nhập để chuyển hướng giao diện
    checkLogined = async () => {
        try {
            // Lấy thông tin người dùng hiện tại
            const userToken = await AsyncStorage.getItem('uid');
            if (userToken !== null) {
                // We have data!!
                // Chuyển hướng
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
        } catch (error) {
          // Error retrieving data
        }
    };

    // Promise chờ 2s
    performTimeConsumingTask = async () => {
        return new Promise( (resolve) =>
        setTimeout( () => { resolve('result') }, 1000)
        )
    }
    
    // Tải dữ liệu và kiểm tra Trạng thái đăng nhập
    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
        if (data !== null) {
        this.checkLogined();
        }
    }

    render() {
        return (
        <>
            <StatusBar backgroundColor={'green'} barStyle={'light-content'}/> 
            <ImageBackground 
            source={require('../../assets/images/bg03.jpg')} 
            style={styles.imageBackground}
            >

                <View style={styles.header}>
                    <Image source={require('../../assets/logo/share.png')} style={styles.logo} />
                    <Text style={styles.appTitle}>Eat Together</Text>
                </View>

                <View style={styles.main}></View>

                <View style={styles.footer}>
                    <ActivityIndicator animating={true} color='green' size='small' 
                    style={styles.activityIndicator}
                    />
                    <Text>2019 &copy; SiVai MinhTuan</Text>
                </View>

            </ImageBackground>
        </>
        );
    }
    };

    const { width } = Dimensions.get('window');

    const styles = StyleSheet.create({
    activityIndicator: {
        marginVertical: 20,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: width*0.3,
        height: width*0.3,
        marginVertical: 20,
    },
    appTitle: {
        color: 'green',
        fontSize: width*0.13,
    },
    header: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 3,
    },
    footer: {
        flex: 2,
        justifyContent: 'center',
    },
});