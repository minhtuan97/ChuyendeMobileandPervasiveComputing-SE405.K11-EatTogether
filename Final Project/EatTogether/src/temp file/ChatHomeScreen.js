import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

const data = [
  {
    id: '1',
    avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    name: 'Crush số 1',
    description: 'Crush số 1 waved at you!'
  },
  {
    id: '2',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 2',
    description: 'Em à, Em đã đánh cắp trái tim anh. Vì thế anh sẽ đánh cắp nụ hôn của em'
  },
  {
    id: '3',
    avatar: 'https://bellanyc.com/wp-content/uploads/2017/06/blake-lively.jpg',
    name: 'Crush số 3',
    description: 'Em là nguồn cảm hứng đằng sau tất cả những gì anh làm, làm nguồn gốc của những điều tốt lành trong cuộc sống của anh'
  },
  {
    id: '4',
    avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    name: 'Crush số 4',
    description: 'Cảm ơn chúa, bởi người đã gửi nữ thần xinh đẹp nhất của thiên đường vào cuộc sống của con.'
  },
  {
    id: '5',
    avatar: 'https://pbs.twimg.com/profile_images/652669289326092288/RsXc7UnS_400x400.jpg',
    name: 'Crush số 5',
    description: 'Anh rất hạnh phúc vì được gặp em, em là điều tuyệt vời nhất trong cuộc sống của anh.'
  },
  {
    id: '6',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Crush số 6',
    description: 'Khi anh yêu em, trái tim em trở nên ấm áp. Hãy để tình yêu ngọt ngào của chúng ta lớn lên theo từng ngày'
  },
  {
    id: '7',
    avatar: 'https://66.media.tumblr.com/2ffbcea054ae96a839d0583f4c56ce38/tumblr_ots4vdLKgl1w0bqvso2_250.gif',
    name: 'Crush số 7',
    description: 'Giữa chúng có một sự sợi dây. Nó buộc trái tim chúng ta lại với nhau vì vậy chúng ta luôn cảm thấy gần nhau dù có cách xa như thế nào?'
  },
  {
    id: '8',
    avatar: 'http://static.global.mnet.com/data/ucc/000/132/089',
    name: 'Crush số 8',
    description: 'Anh muốn tặng em trái tim này và em hãy giữ nó, bởi anh rất vụng về, anh sợ rằng anh sẽ làm mất hoặc dễ dàng tặng nó cho một ai khác'
  },
  {
    id: '9',
    avatar: 'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
    name: 'Crush số 9',
    description: 'Nếu em dám, hãy nắm lấy tay anh và dẫn anh đến trái tim của em. Anh muốn cảm nhận tình yêu của em.'
  }, 
  {
    id: '10',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 10',
    description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
  },
  {
    id: '11',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 10',
    description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
  },
  {
    id: '12',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 10',
    description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
  }, 
  {
    id: '13',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 10',
    description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
  }, 
  {
    id: '14',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 10',
    description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
  }, 
  {
    id: '15',
    avatar: 'https://data.whicdn.com/images/148584794/large.jpg',
    name: 'Crush số 10',
    description: 'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.'
  }
];

class App extends Component {
    static navigationOptions = {
        title: 'Trò Chuyện',
      }
    constructor(props) {
        super(props);
        this.state = {
            listType: 'FlatList',
            listViewData: Array(20)
                .fill('')
                .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
            sectionListData: Array(5)
                .fill('')
                .map((_, i) => ({
                    title: `title${i + 1}`,
                    data: [
                        ...Array(5)
                            .fill('')
                            .map((_, j) => ({
                                key: `${i}.${j}`,
                                text: `item #${j}`,
                            })),
                    ],
                })),
        };

        this.rowSwipeAnimatedValues = {};
        Array(20)
            .fill('')
            .forEach((_, i) => {
                this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
            });
    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

    deleteRow(rowMap, rowKey) {
        this.closeRow(rowMap, rowKey);
        const newData = [...this.state.listViewData];
        const prevIndex = this.state.listViewData.findIndex(
            item => item.key === rowKey
        );
        newData.splice(prevIndex, 1);
        this.setState({ listViewData: newData });
    }

    deleteSectionRow(rowMap, rowKey) {
        this.closeRow(rowMap, rowKey);
        const [section] = rowKey.split('.');
        const newData = [...this.state.sectionListData];
        const prevIndex = this.state.sectionListData[section].data.findIndex(
            item => item.key === rowKey
        );
        newData[section].data.splice(prevIndex, 1);
        this.setState({ sectionListData: newData });
    }

    onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ChatSearch')}
                style={styles.touchable} activeOpacity={0.6}
              >
                <Icon name='search' size={20} color={'blue'}/>
                <Text>Tim kiem</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChatDetail')}
              style={styles.touchable} activeOpacity={0.6}
              >
                <Icon name='arrow-left' size={20} color={'blue'}/>
                <Text>Chat Detail</Text>
              </TouchableOpacity>

                <View style={styles.standalone}>
                    <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
                        <View style={styles.standaloneRowBack}>
                            <Text style={styles.backTextWhite}>Left</Text>
                            <Text style={styles.backTextWhite}>Right</Text>
                        </View>
                        <View style={styles.standaloneRowFront}>
                            <Text>I am a standalone SwipeRow</Text>
                        </View>
                    </SwipeRow>
                </View>

                <View style={styles.controls}>
                    <View style={styles.switchContainer}>
                        {['FlatList', 'Advanced', 'SectionList'].map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.switch,
                                    {
                                        backgroundColor:
                                            this.state.listType === type
                                                ? 'grey'
                                                : 'white',
                                    },
                                ]}
                                onPress={() =>
                                    this.setState({ listType: type })
                                }
                            >
                                <Text>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {this.state.listType === 'Advanced' && (
                        <Text>(per row behavior)</Text>
                    )}
                </View>

                {this.state.listType === 'FlatList' && (
                    <SwipeListView
                        data={this.state.listViewData}
                        renderItem={data => (
                            <TouchableHighlight
                                onPress={() => console.log('You touched me')}
                                style={styles.rowFront}
                                underlayColor={'#AAA'}
                            >
                                <View>
                                    <Text>
                                        I am {data.item.text} in a SwipeListView
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnLeft,
                                    ]}
                                    onPress={() =>
                                        this.closeRow(rowMap, data.item.key)
                                    }
                                >
                                    <Text style={styles.backTextWhite}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnRight,
                                    ]}
                                    onPress={() =>
                                        this.deleteRow(rowMap, data.item.key)
                                    }
                                >
                                    <Animated.View
                                        style={[
                                            styles.trash,
                                            {
                                                transform: [
                                                    {
                                                        scale: this.rowSwipeAnimatedValues[
                                                            data.item.key
                                                        ].interpolate({
                                                            inputRange: [
                                                                45,
                                                                90,
                                                            ],
                                                            outputRange: [0, 1],
                                                            extrapolate:
                                                                'clamp',
                                                        }),
                                                    },
                                                ],
                                            },
                                        ]}
                                    >
                                        <Image
                                            source={require('../../assets/images/trash.png')}
                                            style={styles.trash}
                                        />
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={this.onRowDidOpen}
                        onSwipeValueChange={this.onSwipeValueChange}
                    />
                )}

                {this.state.listType === 'Advanced' && (
                    <SwipeListView
                        data={this.state.listViewData}
                        renderItem={(data, rowMap) => (
                            <SwipeRow
                                disableLeftSwipe={
                                    parseInt(data.item.key) % 2 === 0
                                }
                                leftOpenValue={20 + Math.random() * 150}
                                rightOpenValue={-150}
                            >
                                <View style={styles.rowBack}>
                                    <Text>Left</Text>
                                    <TouchableOpacity
                                        style={[
                                            styles.backRightBtn,
                                            styles.backRightBtnLeft,
                                        ]}
                                        onPress={() =>
                                            this.closeRow(rowMap, data.item.key)
                                        }
                                    >
                                        <Text style={styles.backTextWhite}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.backRightBtn,
                                            styles.backRightBtnRight,
                                        ]}
                                        onPress={() =>
                                            this.deleteRow(
                                                rowMap,
                                                data.item.key
                                            )
                                        }
                                    >
                                        <Text style={styles.backTextWhite}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableHighlight
                                    onPress={() =>
                                        console.log('You touched me')
                                    }
                                    style={styles.rowFront}
                                    underlayColor={'#AAA'}
                                >
                                    <View>
                                        <Text>
                                            I am {data.item.text} in a
                                            SwipeListView
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </SwipeRow>
                        )}
                    />
                )}

                {this.state.listType === 'SectionList' && (
                    <SwipeListView
                        useSectionList
                        sections={this.state.sectionListData}
                        renderItem={data => (
                            <TouchableHighlight
                                onPress={() => console.log('You touched me')}
                                style={styles.rowFront}
                                underlayColor={'#AAA'}
                            >
                                <View>
                                    <Text>
                                        I am {data.item.text} in a SwipeListView
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>
                                <Text>Left</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnLeft,
                                    ]}
                                    onPress={() =>
                                        this.closeRow(rowMap, data.item.key)
                                    }
                                >
                                    <Text style={styles.backTextWhite}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnRight,
                                    ]}
                                    onPress={() =>
                                        this.deleteSectionRow(
                                            rowMap,
                                            data.item.key
                                        )
                                    }
                                >
                                    <Text style={styles.backTextWhite}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        renderSectionHeader={({ section }) => (
                            <Text>{section.title}</Text>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={this.onRowDidOpen}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    },
    trash: {
        height: 25,
        width: 25,
    },
});

export default App;
