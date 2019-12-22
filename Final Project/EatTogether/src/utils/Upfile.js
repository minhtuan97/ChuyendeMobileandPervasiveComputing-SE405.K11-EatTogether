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

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

import uuid from 'uuid';

import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from '../api/FirebaseConfig';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class SignUpScreen extends Component {

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
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imagePath: source,
        });
      }
    });
  };

  state = {
    uid: '',
    isUpload: false,
    fileName: '',
    filePath: '',
    bucket: '',
    imagePath: {},
    imgURL: '',
  };

  // Tải ảnh Avatar người dùng lên FireStorage và lấy đường dẫn, Biến đầu vào là một response của react-native-image-picker
  UpAvatar = (image) => {
    if(Object.entries(image).length !== 0 )
    {
      return new Promise((resolve, reject) => {
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
          this.setState({
            imgURL: url,
            imagePath: {},
          })
          console.warn(url);
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
      }) 
    } else {
      ToastAndroid.show('Vui lòng chọn ảnh', ToastAndroid.SHORT)
    }     
  }

  render() {
    return(
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
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

                <TouchableOpacity
                    disabled={this.state.isCreating}
                    style={styles.registerButton}
                    onPress={()=>this.UpAvatar(this.state.imagePath)}
                >
                    { this.state.isCreating ? (
                    <ActivityIndicator size='small' color='white'/>
                    ) : (
                    <Text style={styles.registerTextButton}>up image</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={this.state.isCreating}
                  style={styles.registerButton}
                >
                  { this.state.isCreating ? (
                    <ActivityIndicator size='small' color='white'/>
                  ) : (
                    <Text style={styles.registerTextButton}>tai image</Text>
                  )}
                </TouchableOpacity>

              <Image 
                  source={{ uri: this.state.imgURL}} 
                  style={{width: 100, height: 100}} 
              />                       

            </View>
        </ScrollView>  
    )
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
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
});