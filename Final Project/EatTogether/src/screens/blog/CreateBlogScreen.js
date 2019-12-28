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
  ToastAndroid,
} from 'react-native';
import uuid from 'uuid'
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from '../../api/FirebaseConfig';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class CreateBlogScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: {},      
      status: '',
      location: '',
      image: {},
      isCreateBlog: false,
    };
  }

  // Tải thông tin user 
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        let userRef = firebase.database().ref('/users/' + user.uid);
        userRef.once('value', (snapshot) => {
        //this.setState({user: snapshot.val()});
        })
      } else {
        // No user is signed in.
      }
    });
    // let userId = firebase.auth().currentUser.uid;
    // let userRef = firebase.database().ref('/users/' + userId);
    // userRef.once('value', (snapshot) => {
    //   this.setState({user: snapshot.val()});
    // });
  }

  static navigationOptions = {
    title: 'Tạo bài viết',
    headerStyle: {
      elevation: 0
    }
  }

  // Tải ảnh lên và trả về đường dẫn
  upLoadImage = (image) => {
    return new Promise(() => {
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('posts').child(uuid.v4());
      fs.readFile(image.uri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${image.type};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: `${image.type}` });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
        ToastAndroid.show('Lỗi tải ảnh', ToastAndroid.SHORT)
        return '';
      })
    })    
  }
  
  // Lưu bài post vào csdl
  savePost = (img) => {
    if(this.state.status !== '')
    {
      this.setState({ isCreateBlog: true });
      let imgURL = this.upLoadImage(img);
      ToastAndroid.show(imgURL, ToastAndroid.SHORT)
      // await firebase.database().ref('posts/').push({
      //   creator: this.state.user,
      //   time: Date.now(),
      //   status: this.state.status,
      //   location: this.state.location,
      //   imageURL: imgURL,
      //   countLike: 0,
      // }).then(
      //   ToastAndroid.show('Tạo bài biết thành công', ToastAndroid.SHORT)
      // ).catch( (error) => {
      //   ToastAndroid.show('Lỗi tạo bài viết', ToastAndroid.SHORT)
      //   ToastAndroid.show(error.message, ToastAndroid.SHORT)
      // })
      this.setState({ 
        isCreateBlog: false,
        status: '',
        location: '',
        image: {},
      })
    }
    else {
      ToastAndroid.show('Vui lòng nhập trạng thái', ToastAndroid.SHORT)
    }
  }

  // Chọn ảnh: state = image: response, thông tin toàn bộ về ảnh
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
      //console.log('Response = ', response);
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          image: response,
        });
      }
    });
  }

  render() {
    return(
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Trạng thái muốn chia sẻ *</Text>
            </View>
            <View style={styles.contentStatusBox}>
              <View style={styles.iconArea}>
                <Icon name="edit" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  autoCorrect={false}
                  style={styles.textInput}
                  onChangeText={text => this.setState({status: text})}
                  value={this.state.status}
                  multiline
                  numberOfLines={10}
                />
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.titleHeader}>Thêm vị trí</Text>
            </View>
            <View style={styles.contentBox}>
              <View style={styles.iconArea}>
                <Icon name="map-marker-alt" size={16} color="black" solid />
              </View>
              <View style={styles.inputArea}>
                <TextInput
                  autoCorrect={false}
                  style={styles.textLocationInput}
                  onChangeText={text => this.setState({location: text})}
                  value={this.state.location}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonArea}>
              <TouchableOpacity
                  style={styles.addEditImgButton}
                  onPress={this.chooseImage.bind(this)}
              >
                  { Object.keys(this.state.image).length === 0 ? (
                      <Text style={styles.buttonText}>Thêm ảnh</Text>
                  ) : ( 
                      <Text style={styles.buttonText}>Đổi ảnh</Text>
                  )}
              </TouchableOpacity>
              { Object.keys(this.state.image).length !== 0 &&
                <TouchableOpacity
                    style={styles.deleteImgButton}
                    onPress={() => this.setState({image: {}})}
                  >
                    <Text style={styles.buttonText}>Xóa ảnh</Text>
                </TouchableOpacity>
              }
          </View>
          { Object.keys(this.state.image).length !== 0 &&
            <View style={styles.imageArea}>
              <Image
                source={{uri: 'data:image/jpeg;base64,' + this.state.image.data}}
                style={styles.image}
              />
            </View>
          }
          <TouchableOpacity
            disabled={this.state.isCreateBlog}
            style={styles.createPostButton}
            onPress={() => this.savePost(this.state.image)}
          >
          { this.state.isCreateBlog ? (
            <ActivityIndicator size="small" color='white'/>
          ) : (
            <Text style={styles.createPostText}>Tạo bài viết</Text>
          )
          }
          </TouchableOpacity>
        </View>
      </ScrollView>   
    )
  }
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    width: width*0.9,
  },
  contentHeader: {
    //backgroundColor: 'pink',
  },
  titleHeader: {
    color: 'green',
    marginLeft: 10,
    marginVertical: 10,
  },
  contentStatusBox: {
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
  },
  iconArea: {
    flex: 1,
    alignItems: 'center',
  },
  inputArea: {
    flex: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 5,
  },
  textInput: {
    width: width*0.76,
    height: width*0.38,
  },
  textLocationInput: {
    width: width*0.76,
    height: 50,
  },
  buttonArea: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  addEditImgButton: {
    padding: 16,
    alignSelf: 'flex-start',
    margin: width*0.05,
    backgroundColor: 'green',
    borderRadius: 16,
  },
  deleteImgButton: {
    padding: 16,
    alignSelf: 'flex-start',
    marginVertical: width*0.05,
    backgroundColor: 'red',
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
  },
  imageArea: {
    width: width*0.9,
    height: width*0.9,
    marginBottom: width*0.05,
  },
  image: {
    width: width*0.9,
    height: width*0.9,
    borderColor: 'pink',
    borderRadius: 16,
    borderWidth: 1,
  },
  createPostButton: {
    width: width*0.9,
    marginBottom: width*0.05,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 16,
  },
  createPostText: {
    color: 'white',
  },
})