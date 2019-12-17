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
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default class CreateBlogScreen extends Component {

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
          imagePath: source,
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
            
            time: new Date(),
            
            status: '',
            imagePath: {},

            isCreatrBlog: false,
        };
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Tạo bài viết',
            headerRight: () => (
                <TouchableOpacity
                onPress={() => alert('Đã tạo bài viết')}
                style={styles.createBookingButton} 
                activeOpacity={0.6}
                >
                <Icon name='check' size={20} color={'green'}/>
                </TouchableOpacity>
            ),
            headerStyle: {
                elevation: 0,
            }   
        }
    }

    render() {

        //const { show, date, mode } = this.state;

        const {item} = this.props;
        const {navigation} = this.props;

    return(
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>

                <View style={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleHeader}>Trạng thái muốn chia sẻ</Text>
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
                    <TouchableOpacity
                        style={styles.contentBox}
                        onPress={() => alert('Mở trang chọn vị trí')}
                    >
                        <View style={styles.iconArea}>
                            <Icon name="map-marker-alt" size={16} color="black" solid />
                        </View>
                        <View style={styles.pickerDateArea}>
                            <Text>123 Kha Vạn Cân, Trà sữa ToCoToCo</Text>
                        </View>
                        <View style={styles.iconXArea}>
                            <Icon name="times" size={16} color="red" solid />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.addEditImgButton}
                        onPress={this.chooseImage.bind(this)}
                    >
                        { Object.keys(this.state.imagePath).length === 0 ? (
                            <Text style={styles.buttonText}>Thêm ảnh</Text>
                        ) : ( 
                            <Text style={styles.buttonText}>Đổi ảnh</Text>
                        )}
                    </TouchableOpacity>
                    { Object.keys(this.state.imagePath).length !== 0 &&
                        <TouchableOpacity
                            style={styles.deleteImgButton}
                            onPress={() => this.setState({imagePath: {}})}
                        >
                            <Text style={styles.buttonText}>Xóa ảnh</Text>
                    </TouchableOpacity>
                    }
                </View>

                <View style={styles.imageArea}>
                    {/*<Image 
                        source={{ uri: this.state.imagePath.path}} 
                        style={{width: 100, height: 100}} />
                    */}
                    <Image
                        source={{
                        uri: 'data:image/jpeg;base64,' + this.state.imagePath.data,
                        }}
                        style={styles.image}
                    />
                </View>
            </View>
        </ScrollView>   
    )}
}

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
    createBookingButton: {
        margin: 16,
    },
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

    },
    pickerDateArea: {
        flex: 7,
    },
    titleHeader: {
        color: 'green',
        marginLeft: 10,
        marginVertical: 4,
    },
    contentStatusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'pink',
        borderWidth: 1,
        borderRadius: 16,
        height: width*0.3, 
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
    iconXArea: {
        flex: 1,
        //alignSelf: 'flex-end',
        alignItems: 'center',
    },
    inputArea: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textInput: {
        //flex: 9,
        width: width*0.8,
        height: width*0.3,
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
})
