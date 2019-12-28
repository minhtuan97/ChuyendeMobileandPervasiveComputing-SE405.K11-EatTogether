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
  ScrollView,
} from 'react-native'
import uuid from 'uuid'
import moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'

import firebase from '../../api/FirebaseConfig'

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class ProfileHomeScreen extends Component {

  static navigationOptions = {
    title: 'Hồ sơ',
    headerStyle: {
      elevation: 0,
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      uid: '',
      email: '',
      avatarURL: '',
      gender: true, // true nam, false nu
      name: '',
      address: '',
      character: '',
      hobby: '',
      intro: '',
      phone: '',
      birthday: new Date(),

      mode: 'date',
      show: false, 
  
      oldPassword: '',
      newPassword: '',
      
      isUpdateInfo: false,
      isUpdatePassword: false,
      isEditInfo: false,
      isOnChangeInfo: false,
      isEditPassword: false,
      isOnChangePassword: false,
      isOnLogOut: false,
    }
  }

  // Tải lại thông tin người dùng
  loadUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ToastAndroid.show('lấy thông tin người dùng', ToastAndroid.SHORT)
        let userRef = firebase.database().ref('/users/' + user.uid);
        userRef.on('value', (dataSnapshot) => {
          this.setState({
            address: dataSnapshot.val().address,
            avatarURL: dataSnapshot.val().avatarURL,
            birthday: new Date(dataSnapshot.val().birthday),
            character: dataSnapshot.val().character,
            email: dataSnapshot.val().email,
            gender: dataSnapshot.val().gender,
            hobby: dataSnapshot.val().hobby,
            intro: dataSnapshot.val().intro,
            name: dataSnapshot.val().name,
            phone: dataSnapshot.val().phone,
            uid: dataSnapshot.val().uid,
          });
        })
      } else {
        //
      }
    }).bind(this);
  }

  // Tải thông tin user 
  componentDidMount() {
    this.loadUserInfo()
  }

  // Chọn ảnh
  chooseImage = () => {
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
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let source = response;
        this.upAvatar(source);
      }
    });
  };

  // Ẩn date time picker và set date
  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: false,
      birthday: date,
    });
  }

  // Hiện Date time theo chế độ
  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  }

  // Hiển thị Date Picker
  datepicker = () => {
    this.show('date');
  }
  
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
          //console.warn(url)
          this.setState({avatarURL: url})     
        })
        .catch((error) => {
          ToastAndroid.show('Lỗi tải lên ảnh đại diện', ToastAndroid.SHORT)
        })
      }) 
    } else {
      ToastAndroid.show('Vui lòng chọn ảnh', ToastAndroid.SHORT)
    }     
  }

  // Cập nhập thông tin người dùng vào Realtime Database
  updateUserData = () => {
    firebase.database().ref('users/' + this.state.uid).set({
      uid: this.state.uid,
      email: this.state.email,
      avatarURL: this.state.avatarURL,
      gender: this.state.gender,
      name : this.state.name,
      birthday: Date.parse(this.state.birthday),
      address: this.state.address,
      character: this.state.character,
      hobby : this.state.hobby,
      intro: this.state.intro,
      phone: this.state.phone,
    });
  }

  // Bấm nút xóa cập nhập thông tin người dùng
  cancelEditInfo = () => {
    this.loadUserInfo()
    this.setState({
      isEditInfo: false,
    })
  }

  // Bấm nút cập nhập thông tin người dùng
  updateUser = () => {
    if(!this.state.isEditInfo)
    {
      this.setState({
        isEditInfo: true,
      })
    } else if(this.state.name !== '' && this.state.name !== '' 
      && this.state.address !== '' && this.state.character !== ''
      && this.state.hobby !== '' && this.state.intro !== '' && this.state.phone !== '') {
      this.updateUserData()
      this.setState({
        isEditInfo: false,
      })
      ToastAndroid.show('Cập nhập thông tin thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
    }
  }

  // Bấm nút hủy thay đổi mật khẩu
  cancelEditPassword = () => {
    this.setState({
      isEditPassword : false,
      oldPassword: '',
      newPassword: '',
    })
  }

  // Đổi mật khẩu firebase Auth
  changePassword() {
    if(this.state.isEditPassword && this.state.oldPassword !== '' && this.state.newPassword !== '')
    {
      let newPassword = this.state.newPassword;
      let email = this.state.email;
      let { navigation } = this.props; 
      this.setState({ isOnChangePassword: true }); 
      firebase.auth().signInWithEmailAndPassword(email, this.state.oldPassword)
      .then(function(userCredential) {
        userCredential.user.updatePassword(newPassword);
        ToastAndroid.show('Đổi mật khẩu thành công\nVui lòng đăng nhập lại', ToastAndroid.SHORT);
        navigation.navigate('Auth');
      })  
      .catch(function(error) {
        ToastAndroid.show('Mật khẩu cũ của bạn không đúng', ToastAndroid.SHORT);
      });
      this.setState({ 
        isOnChangePassword: false,
        isEditPassword: false,
      });
    } else if(this.state.isEditPassword && (this.state.oldPassword === '' || this.state.newPassword === '')) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
    } else {
      this.setState({ isEditPassword: true })
    }
  };

  // Đăng xuất
  logOut = async ()  => {   
    this.setState({ isOnLogOut: true })
    await AsyncStorage.clear()
    firebase.auth().signOut().then(() => {
      ToastAndroid.show("Đăng xuất", ToastAndroid.SHORT);
      this.props.navigation.navigate('Splash');
    }).catch((error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      ToastAndroid.show("Lỗi không thể đăng xuất", ToastAndroid.SHORT);
    });
    this.setState({ isOnLogOut: false })
  }

  render() {
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoArea}>
          <View style={styles.avatarAndGenderArea}>
            <View style={styles.avatarArea}>
              <View style={styles.contentHeader}>
                <Text style={styles.titleHeader}>Ảnh đại diện</Text>
              </View>
              <View style={styles.avatarBox}>
                <TouchableOpacity
                  disabled={!this.state.isEditInfo}
                  onPress={this.chooseImage.bind(this)}
                >
                  <Image
                    source={{
                      uri: this.state.avatarURL ? this.state.avatarURL : 'fff',
                    }}
                    style={styles.avatarImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.genderArea}>
              <View style={styles.contentHeader}>
                <Text style={styles.titleHeader}>Giới tính</Text>
              </View>
              <View style={styles.genderBox}>
                <TouchableOpacity
                  disabled={!this.state.isEditInfo}
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
                  disabled={!this.state.isEditInfo}
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
                <Text style={styles.titleHeader}>Email *</Text>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.iconArea}>
                  <Icon name="address-book" size={16} color="black" solid />
                </View>
                <View style={styles.inputArea}>
                  <TextInput
                    editable={false}
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
                <Text style={styles.titleHeader}>Tên</Text>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.iconArea}>
                  <Icon name="user" size={16} color="black" solid />
                </View>
                <View style={styles.inputArea}>
                  <TextInput
                    editable={this.state.isEditInfo}
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
                disabled={!this.state.isEditInfo}
                style={styles.contentBox}
                onPress={this.datepicker}
              >
                <View style={styles.iconArea}>
                  <Icon name="calendar" size={16} color="black" solid />
                </View>
                <View style={styles.pickerDateArea}>
                  <Text>{moment(this.state.birthday).format('DD/MM/YYYY')}</Text>
                </View>
              </TouchableOpacity>
              { this.state.show &&
                <DateTimePicker
                  value={this.state.birthday}
                  mode={this.state.mode}
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
                    editable={this.state.isEditInfo}
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
                    editable={this.state.isEditInfo}
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
                    editable={this.state.isEditInfo}
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
                    editable={this.state.isEditInfo}
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
                    editable={this.state.isEditInfo}
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
        </View>     
        <View style={styles.optionArea}>
          <View style={styles.buttomArea}>
            { this.state.isEditInfo &&
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.cancelEditInfo()}
              >
                <Text style={styles.textWhite}>Hủy</Text>
              </TouchableOpacity>
            }  
            <TouchableOpacity
              disabled={this.state.isOnChangeInfo}
              style={styles.editOrAcceptButton}
              onPress={() => this.updateUser()}
            >
            { this.state.isOnChangeInfo ? (
                <ActivityIndicator size='small' color='white'/>
              ) : (
              <Text style={styles.textWhite}>{this.state.isEditInfo ? 'Cập nhập thông tin' : 'Sửa thông tin'}</Text>
              )
            }
            </TouchableOpacity>
          </View>
          <View style={styles.buttomArea}>
          { this.state.isEditPassword &&
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.cancelEditPassword()}
            >
              <Text style={styles.textWhite}>Hủy</Text>
            </TouchableOpacity>  
          }
            <TouchableOpacity
              disabled={this.state.isOnChangePassword}
              style={styles.editOrAcceptButton}
              onPress={() => this.changePassword()}
            >
            { this.state.isOnChangePassword ? (
              <ActivityIndicator size='small' color='white'/>
            ) : (
              <Text style={styles.textWhite}>{this.state.isEditPassword ? 'Cập nhập mật khẩu' : 'Đổi mật khẩu'}</Text>
            )}
            </TouchableOpacity>
          </View>
          { this.state.isEditPassword &&
            <View style={styles.passwordArea}>
              <View style={styles.contentContainer}>
                <View style={styles.contentHeader}>
                  <Text style={styles.titleHeader}>Mật khẩu cũ</Text>
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
                      onChangeText={text => this.setState({oldPassword: text})}
                      value={this.state.oldPassword}
                      onSubmitEditing={(event) => { this.refs.newPassword.focus() }}
                      ref='oldpassword'
                    />
                  </View>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.contentHeader}>
                  <Text style={styles.titleHeader}>Mật khẩu mới</Text>
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
                      onChangeText={text => this.setState({newPassword: text})}
                      value={this.state.newPassword}
                      ref='newPassword'
                    />
                  </View>
                </View>
              </View>
            </View>
          }
          <View style={styles.buttomArea}>
            <TouchableOpacity
              disabled={this.state.isOnLogOut}
              style={styles.logOutButton} 
              onPress={() => this.logOut()}
            >
            { this.state.isOnLogOut ? (
              <ActivityIndicator size='small' color='white'/>
            ) : (
              <Text style={styles.textWhite}>Đăng xuất</Text>
            )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>  
    )
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  infoArea: {
    flex: 1,
    alignItems: 'center',
    marginBottom: width*0.05,
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
  passwordContainer: {
    flex: 1,
    marginBottom: width*0.05,
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
  passwordArea: {
    flex: 1,
    marginBottom: width*0.05,
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
  buttomArea: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: width*0.05,
  },
  textWhite: {
    color: 'white',
  },
  optionArea: {
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    marginLeft: width*0.05,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 16,
    height: 50,
  },
  editOrAcceptButton: {
    flex: 3,
    marginHorizontal: width*0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 16,
    height: 50,
  },
  logOutButton: {
    width: width*0.9,
    backgroundColor: 'green',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});