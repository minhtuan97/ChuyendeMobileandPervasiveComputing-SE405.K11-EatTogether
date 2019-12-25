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

  // Chọn ảnh
  chooseFile = () => {
    var options = {
      title: 'Chọn ảnh',
      takePhotoButtonTitle: 'Chụp ảnh từ máy ảnh',
      chooseFromLibraryButtonTitle: 'Chọn ảnh từ thư viện',
      cancelButtonTitle: 'Hủy',
      maxWidth: 480,
      maxHeight: 480,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user: '',
      name: '',
      dothich: '',
      tinhcach: '',
      address: '',
      intro: '',
      gender: true, // true nam, false nu
      location: '',
      time: '',
      title: '',
      phone: '',
      hiden: true,

      date: new Date(),
      mode: 'date',
      show: false, 

      isRegister: false,

      filePath: {},
    };
  }

  // Ẩn date time picker và set date
  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: false,
      date,
    });
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

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: 'Tạo hồ sơ',
  //     // headerRight: () => (
  //     //   <TouchableOpacity
  //     //     onPress={() => alert('Đã tạo lịch hẹn')}
  //     //     style={styles.createBookingButton} 
  //     //     activeOpacity={0.6}
  //     //   >
  //     //     <Icon name='check' size={20} color={'green'}/>
  //     //   </TouchableOpacity>
  //     // ),
  //   }
  // }

  render() {

    const { show, date, mode } = this.state;

    const {item} = this.props;
    const {navigation} = this.props;

    return(
      <ScrollView style={styles.wraper}>
        <View style={styles.container}>

          <View style={styles.registerTitle}>
            <Text style={styles.registerText}>Tạo hồ sơ</Text>
          </View>

          <View style={styles.avatarAndGenderArea}>
            <View style={styles.avatarArea}>
              <View style={styles.contentHeader}>
                <Text style={styles.titleHeader}>Avatar</Text>
              </View>
              <View style={styles.avatarBox}>
                <TouchableOpacity
                  onPress={this.chooseFile.bind(this)}
                >
                  {/*<Image 
                    source={{ uri: this.state.filePath.path}} 
                    style={{width: 100, height: 100}} />
                  */}
                  <Image
                    source={{
                      uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                    }}
                    style={styles.avatarImage}
                  />
                  <View style={styles.avatarIcon}>
                    { Object.keys(this.state.filePath).length === 0 ? (
                      <Icon name="plus" size={30} color='#4b60c9' solid />
                    ) : ( 
                      <Icon name="edit" size={30} color="#4b60c9" solid />                
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.genderArea}>
              <View style={styles.contentHeader}>
                <Text style={styles.titleHeader}>Giới tính</Text>
              </View>
              <View style={styles.genderBox}>
                <TouchableOpacity
                  style={styles.genderSection}
                  onPress={() => this.setState({gender: true})}
                >
                  <Icon name='male' size={30} color="#596fff"/>
                  <Text>Nam</Text>
                  { this.state.gender &&
                    <View style={styles.selectGender}></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.genderSection}
                  onPress={() => this.setState({gender: false})}
                >
                  <Icon name='female' size={30} color="#ff69cd"/>
                  <Text>Nữ</Text>
                  { !this.state.gender &&
                    <View style={styles.selectGender}></View>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Tên</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="user" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  //autoFocus={true}
                  style={styles.textInput}
                  onChangeText={text => this.setState({name: text})}
                  value={this.state.name}
                  onSubmitEditing={(event) => { this.refs.address.focus() }}
                />
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Ngày sinh</Text>
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
                onChange={this.setDate}
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
                  style={styles.textInput}
                  onChangeText={text => this.setState({address: text})}
                  value={this.state.address}
                  onSubmitEditing={(event) => { this.refs.tinhcach.focus() }}
                  ref='address'
                />
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Tính cách</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="grin-hearts" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({tinhcach: text})}
                  value={this.state.tinhcach}
                  onSubmitEditing={(event) => { this.refs.sothich.focus() }}
                  ref='tinhcach'
                />
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Sở thích</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="guitar" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({sothich: text})}
                  value={this.state.sothich}
                  onSubmitEditing={(event) => { this.refs.loigioithieu.focus() }}
                  ref='sothich'
                />
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Lời giới thiệu</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="feather" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({intro: text})}
                  value={this.state.intro}
                  onSubmitEditing={(event) => { this.refs.sdt.focus() }}
                  ref='loigioithieu'
                />
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Số điện thoại</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="phone" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.setState({phone: text})}
                  value={this.state.phone}
                  ref='sdt'
                  keyboardType='phone-pad'
                  maxLength={10}
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
              <Text style={styles.registerTextButton}>Tạo hồ sơ</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>   
    )
  }
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
    alignItems: 'center',
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
