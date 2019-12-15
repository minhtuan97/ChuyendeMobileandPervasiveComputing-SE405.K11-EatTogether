// thanh header co input text tim kiem

<View style={styles.searchHeader}>
<View style={styles.backButton}>
  <TouchableOpacity
    onPress={() => this.props.navigation.goBack()}
    style={styles.touchable} activeOpacity={0.6}
  >
    <Icon name='arrow-left' size={20} color={'blue'}/>
  </TouchableOpacity>
</View>
<View style={styles.inputSearchArea}>
  <TextInput
    style={styles.TextInputSearch}
    placeholderTextColor={'grey'}
    underlineColorAndroid='transparent'
    placeholder={'Tìm kiếm'}
    onChangeText={(searchText) => this.setState({searchText})}
    value={this.state.searchText}
  />
</View>
</View>