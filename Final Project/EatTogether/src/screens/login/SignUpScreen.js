import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  View, 
  TextInput,
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ToastAndroid,
  ScrollView
} from 'react-native';
import uuid from 'uuid';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {w, h, totalSize} from '../../api/Dimensions';
import InputField from '../../components/login/InputField';
import firebase from "../../api/FirebaseConfig";

const email = require('../../assets/login/email.png');
const password = require('../../assets/login/password.png');
const repeat = require('../../assets/login/repeat.png');

import RNFetchBlob from 'rn-fetch-blob';

// Get a reference to the database service
const database = firebase.database();

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class SignUpScreen extends Component {

  // Header Navigation
  static navigationOptions = {
    title: 'Tạo tài khoản',
    headerStyle: {
      elevation: 0,
    },
  }

  // Chọn ảnh
  chooseImage = () => {
    var options = {
      title: 'Chọn ảnh',
      takePhotoButtonTitle: 'Chụp ảnh từ máy ảnh',
      chooseFromLibraryButtonTitle: 'Chọn ảnh từ thư viện',
      cancelButtonTitle: 'Hủy',
      maxWidth: 720,
      maxHeight: 720,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let source = response;
        this.upAvatar(source);
        this.setState({
          imagePath: source,
        })
      }
    });
  };

  state = {
    uid: '',
    email: '',
    password: '',
    repeatPassword: '',
    avatarURL: '',
    gender: true, // true nam, false nu
    name: '',
    address: '',
    character: '',
    hobby: '',
    intro: '',
    phone: '',
    // birthday
    date: new Date(),
    mode: 'date',
    show: false, 
    // Kiểm tra đang đăng ký
    isRegister: false,

    imagePath: {},
    imgURL: '',

    isEmailCorrect: false,
    isPasswordCorrect: false,
    isRepeatCorrect: false,
    isCreating: false,  // trạng thái tạo tài khoản qua firebase
  };

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

  // Hiển thị Date Picker
  datepicker = () => {
    this.show('date');
  }

  // Hiển thị Time Picker
  timepicker = () => {
    this.show('time');
  }

  // Kiểm tra hợp lệ thông tin nhập vào
  handleSignIn = () => {
    if(this.state.email !== '' && this.state.password !== '' 
      && (this.state.repeatPassword !== '' && this.state.repeatPassword === this.state.password) 
      && Object.keys(this.state.imagePath).length !== 0
      && this.state.name !== '' && this.state.address !== '' && this.state.character !== ''
      && this.state.hobby !== '' && this.state.intro !== '' && this.state.phone !== ''){
      this.createFireBaseAccount();
    } else if (this.state.repeatPassword !== this.state.password) {
      ToastAndroid.show('Vui lòng nhập đúng mật khẩu', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
    }
  };
  
  // Tải ảnh Avatar người dùng lên FireStorage và lấy đường dẫn, Biến đầu vào là một response của react-native-image-picker
  upAvatar = (image) => {
    if(Object.entries(image).length !== 0 )
    {
      return new Promise(() => {
        let uploadBlob = null
        const imageRef = firebase.storage().ref('avatars').child(uuid.v4());
        // Đọc file từ đường dẫn: mã hóa base64
        fs.readFile(image.uri, 'base64')
        .then((data) => {
        // Tạo Blob file hình ảnh với định dạng:(BASE64)
        return Blob.build(data, { type: `${image.type};BASE64` })
        })
        .then((blob) => {
        uploadBlob = blob
        // Up File ảnh lên ForeStorage
        return imageRef.put(blob, { contentType: `${image.type}` })
        })
        .then(() => {
        uploadBlob.close()
        // Trả về đường dẫn của file trên FireStorage
        return imageRef.getDownloadURL()
        })
        .then((url) => {
          console.warn(url)
          this.setState({imgURL: url})     
        })
        .catch((error) => {
          ToastAndroid.show('Lỗi tải lên ảnh đại diện', ToastAndroid.SHORT)
        })
      }) 
    } else {
      ToastAndroid.show('Vui lòng chọn ảnh', ToastAndroid.SHORT)
    }     
  }

  // Lưu thông tin người dùng vào Realtime Database
  writeUserData = (userId, avatarURL) => {
    firebase.database().ref('users/' + userId).set({
      uid: userId,
      email: this.state.email,
      password: this.state.password,
      avatarURL: avatarURL,
      gender: this.state.gender,
      name : this.state.name,
      birthday: Date.parse(this.state.date),
      address: this.state.address,
      character: this.state.character,
      hobby : this.state.hobby,
      intro: this.state.intro,
      phone: this.state.phone,
    });
  }

  // Tạo tài khoản Firebase và lưu thông tin người dùng
  createFireBaseAccount = () => {
    this.setState({ isCreating: true });
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>{
      // Lấy User Id
      let user = firebase.auth().currentUser;
      if (user != null) {
        let uid = user.uid;
        // Lưu thông tin người dùng vào Cloud Firestore
        this.writeUserData(uid, this.state.imgURL);
      }
      console.warn(this.state.imgURL)
      ToastAndroid.show('Tạo tài khoản thành công!', ToastAndroid.SHORT);
      this.props.navigation.navigate('SignIn');
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      ToastAndroid.show('Lỗi tạo tài khoản người dùng', ToastAndroid.SHORT);
    }).finally (() => {
      firebase.auth().signOut().then(() => {
        // ToastAndroid.show('Dang xuat thanh cong', ToastAndroid.SHORT);
      }).catch(() => {
        // ToastAndroid.show('Dang xuat khong thanh cong', ToastAndroid.SHORT);
      }).finally (() => {
        this.setState({ isCreating: false });
      })
    })
  };

  render() {

    const { show, date, mode } = this.state;

    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

          <View style={styles.registerTitle}>
            <Text style={styles.registerText}>Thông tin đăng nhập</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Email</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="address-book" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  keyboardType={'email-address'}
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({email: text})}
                  value={this.state.email}
                  onSubmitEditing={(event) => { this.refs.password.focus() }}
                  ref='email'
                />
              </View>
            </View>
          </View>
  
          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Mật khẩu</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="lock" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  secureTextEntry={true}
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({password: text})}
                  value={this.state.password}
                  onSubmitEditing={(event) => { this.refs.repeatpassword.focus() }}
                  ref='password'
                />
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Nhập lại mật khẩu</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="lock" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  secureTextEntry={true}
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({repeatPassword: text})}
                  value={this.state.repeatPassword}
                  onSubmitEditing={(event) => { this.refs.name.focus() }}
                  ref='repeatpassword'
                />
              </View>
            </View>
          </View>

          <View style={styles.registerTitle}>
            <Text style={styles.registerText}>Thông tin hồ sơ</Text>
          </View>

          <View style={styles.avatarAndGenderArea}>
            <View style={styles.avatarArea}>
              <View style={styles.contentHeader}>
                <Text style={styles.titleHeader}>Ảnh đại diện</Text>
              </View>
              <View style={styles.avatarBox}>
                <TouchableOpacity
                  onPress={this.chooseImage.bind(this)}
                >
                  <Image
                    source={{
                      uri: 'data:image/jpeg;base64,' + this.state.imagePath.data,
                    }}
                    style={styles.avatarImage}
                  />
                  <View style={styles.avatarIcon}>
                    { Object.keys(this.state.imagePath).length === 0 ? (
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
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({name: text})}
                  value={this.state.name}
                  onSubmitEditing={(event) => { this.refs.address.focus() }}
                  ref='name'
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
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({address: text})}
                  value={this.state.address}
                  onSubmitEditing={(event) => { this.refs.character.focus() }}
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
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({character: text})}
                  value={this.state.character}
                  onSubmitEditing={(event) => { this.refs.hobby.focus() }}
                  ref='character'
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
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({hobby: text})}
                  value={this.state.hobby}
                  onSubmitEditing={(event) => { this.refs.intro.focus() }}
                  ref='hobby'
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
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({intro: text})}
                  value={this.state.intro}
                  onSubmitEditing={(event) => { this.refs.phone.focus() }}
                  ref='intro'
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
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({phone: text})}
                  value={this.state.phone}
                  ref='phone'
                  keyboardType='phone-pad'
                  maxLength={10}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={this.state.isCreating}
            style={styles.registerButton}
            onPress={()=>this.handleSignIn(this)}
          >
            { this.state.isCreating ? (
              <ActivityIndicator size='small' color='white'/>
            ) : (
              <Text style={styles.registerTextButton}>Tạo tài khoản</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>  
    )
  }
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
    fontSize: totalSize(2.4),
    marginTop: h(7),
    marginBottom: h(4),
    fontWeight: '700',
  },
  signIn: {
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
  inputField: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginVertical: h(1),
  },
  button: {
    width: w(85),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    paddingVertical: w(2),
    borderRadius: w(10),
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginTop: h(4),
  },
  spinner: {
    height: h(5),
  },
  text: {
    color: 'white',
    fontWeight: '600',
    paddingVertical: h(1),
    fontSize: totalSize(2.2),
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  wraper: {
    flex: 1,
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
});