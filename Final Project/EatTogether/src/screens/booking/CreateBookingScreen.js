import React, { Component }  from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class CreateBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            user: '',
            name: '',
            content: '',
            location: '',
            //time: '',
            hiden: true,
            time: new Date(),
            date: new Date(),
            mode: 'date',
            show: false, 

            isBooking: false,
        }
    }

  // Ẩn date time picker và set date
  setDateTime = (event, dateTime) => {
    if(this.state.mode == 'date')
    {
        dateTime = dateTime || this.state.date;
        this.setState({
            show: false,
            date: dateTime,
          });
    } else {
        dateTime = dateTime || this.state.time;
        this.setState({
            show: false,
            time: dateTime,
          });
    }
  }

  // Hiện Date time theo chế độ
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  timepicker = () => {
    this.show('time');
  }

  static navigationOptions = ({ navigation }) => {
        return {
            title: 'Tạo lịch hẹn',
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={() => alert('Đã tạo lịch hẹn')}
            //     style={styles.createBookingButton} 
            //     activeOpacity={0.6}
            //   >
            //     <Icon name='check' size={20} color={'green'}/>
            //   </TouchableOpacity>
            // ),
            headerStyle: {
                elevation: 0,
            },
        }
    }

    render() {

        const { show, date, time, mode } = this.state;

    return(
        <ScrollView style={styles.wraper}>
            <View style={styles.container}>

                <View style={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleHeader}>Chọn ngày</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.contentBox}
                        onPress={this.datepicker}
                    >
                        <View style={styles.iconArea}>
                            <Icon name="calendar" size={16} color="black" solid />
                        </View>
                        <View style={styles.pickerDateArea}>
                            <Text>{moment(date).format('DD/MM/YYYY')}</Text>
                        </View>
                    </TouchableOpacity>
                    { show &&
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDateTime}
                        />
                    }
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleHeader}>Chọn giờ</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.contentBox}
                        onPress={this.timepicker}
                    >
                        <View style={styles.iconArea}>
                            <Icon name="clock" size={16} color="black" solid />
                        </View>
                        <View style={styles.pickerDateArea}>
                            <Text>{moment(time).format("LT")}</Text>
                        </View>
                    </TouchableOpacity>
                    { show &&
                        <DateTimePicker
                            value={time}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDateTime}
                        />
                    }
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleHeader}>Địa chỉ</Text>
                    </View>
                    <View style={styles.contentBox}>
                        <View style={styles.iconArea}>
                            <Icon name="map-marker-alt" size={16} color="black" solid />
                        </View>
                        <View style={styles.inputArea}>
                            <TextInput
                                autoCorrect={false}
                                style={styles.textInput}
                                onChangeText={text => this.setState({location: text})}
                                value={this.state.location}
                                ref='address'
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleHeader}>Nội dung cuộc hẹn</Text>
                    </View>
                    <View style={styles.contentBox1}>
                        <View style={styles.iconArea}>
                            <Icon name="edit" size={16} color="black" solid />
                        </View>
                        <View style={styles.inputArea}>
                            <TextInput
                                autoCorrect={false}
                                style={styles.textContentInput}
                                value={this.state.content}
                                onChangeText={text => this.setState({content: text})}
                                multiline={true}
                                numberOfLines={10}
                                ref='content'
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                >
                    { this.state.isRegister ? (
                        <ActivityIndicator size='small' color='white' />
                    ) : (
                        <Text style={styles.registerTextButton}>Tạo cuộc hẹn</Text>
                    )}
                </TouchableOpacity>

            </View>
        </ScrollView>   
    )}
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({

  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  wraper: {
    flex: 1,
    //alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  registerTitle: {
    padding: 20,
    alignSelf: 'flex-start',
  },
  registerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarAndGenderArea: {
    flex: 1,
    flexDirection: 'row',
    width: width*0.9,
  },
  avatarArea: {
    flex: 1,
    marginRight: width*0.025,
  },
  genderArea: {
    flex: 1,
    marginLeft: width*0.025,
  },
  contentContainer: {
    width: width*0.9,
  },
  contentHeader: {

  },
  pickerDateArea: {
    flex: 7,
  },
  avatarImage: {
    width: width*0.3,
    height: width*0.3,
    borderRadius: width*0.3,
  },
  avatarIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  titleHeader: {
    color: 'green',
    marginLeft: 10,
    marginVertical: 4,
  },
  avatarBox: {
    height: width*0.375,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 16,
  },
  // Box chọn giới tính
  genderBox: {
    flex: 1,
    flexDirection: 'row',
    height: width*0.375,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 16,
  },
  genderSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectGender: {
    margin: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  contentBox1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 16,
    height: width*0.4,
  },
  contentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 16,
    height: 50,
  },
  iconArea: {
    flex: 1,
    alignItems: 'center',
  },
  inputArea: {
    flex: 7,
    alignItems: 'flex-start',
  },
  textContentInput: {
    width: width*0.7,
    height: width*0.4,
  },
  textInput: {
    //flex: 9,
    width: width*0.8,
    height: 50,

  },
  registerButton: {
    width: width*0.9,
    backgroundColor: 'green',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: width*0.05,
  },
  registerTextButton: {
    color: 'white',
  },
})
