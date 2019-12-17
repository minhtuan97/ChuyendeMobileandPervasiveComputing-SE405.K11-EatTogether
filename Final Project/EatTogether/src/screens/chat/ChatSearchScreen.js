import React from 'react';
import { 
  StyleSheet,
  Dimensions,
  View, 
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ChatSearchScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isSearch: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onChangeSearch: this.onChangeSearch,
    });
  }

  // Hàm tìm kiếm trả về List đối tượng dựa vào từ khóa tìm kiếm
  searchPeople = (textSearch) => {

  }

  // Xử lý setState khi thay đổi textInput
  onChangeSearch = (value) => {
    this.setState({
      searchText: value,
      isSearch: true,
    });
    this.props.navigation.setParams({
      searchText: value,
      //isSearch: true,
    });
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: () => (
        <View style={styles.inputSearchArea}>
          <TextInput
            autoFocus={true}
            autoCorrect={false}
            style={styles.TextInputSearch}
            placeholderTextColor={'grey'}
            underlineColorAndroid={'transparent'}
            placeholder={'Tìm kiếm'}
            onChangeText={(value) => params.onChangeSearch(value)}
            value={params.searchText}
          />
        </View>
      ),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.isSearch &&
          <ActivityIndicator size="small" color="#00ff00" />
        }
        <View style={styles.resultArea}>
          <Text>Kết quả tìm kiếm</Text>
          <Text>{this.state.searchText}</Text>
        </View>
      </View>
    )
  }
}

const { hieght, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'green',
  },
  backButton: {
    margin: 10,
  },
  inputSearchArea: {
    //marginLeft: 10,
  },
  TextInputSearch: {
    //color: 'red',
    //textDecorationLine: 'line-through',
  },
});