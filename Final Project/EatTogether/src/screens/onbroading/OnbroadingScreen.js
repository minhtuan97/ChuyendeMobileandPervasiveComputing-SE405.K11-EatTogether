import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, 
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Mảng obj các onbroading
const ENTRIES = [
  {
    title: 'Hôm nay mình sẽ ăn gì đây?',
    subtitle: 'Bún đậu, Phở bò, Cơm gà, Bánh xèo...',
    illustration: require('../../assets/images/food.jpg')
  },
  {
    title: 'Tìm bạn ăn chung dễ dàng',
    subtitle: 'Bạn không còn phải đi ăn một mình nữa...',
    illustration: require('../../assets/images/cheers.jpg')
  },
  {
    title: 'Chia sẽ sở thích ăn uống',
    subtitle: 'Chia sẽ các địa điểm ăn ngon...',
    illustration: require('../../assets/images/share.jpg')
  },
];

export default class OnbroadingScreen extends Component {
  
  // Ẩn header
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props);
    this.state = {
      sliderActiveSlide: 0
    };
  }

  // Hàm xử lý khi nhấn nút tham gia ngay
  onPressButton() {
    this.props.navigation.navigate('SignIn');
  }

  // Hàm vẽ từng Item
  renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <View>
          <Image source={ item.illustration } style={styles.imageSlide} />
        </View>
        <View>
          <Text style={styles.titleSlide}>{ item.title }</Text>
          <Text style={styles.subtitleSlide}>{ item.subtitle }</Text>
        </View>
      </View>
    );
  }

  render () {
    const { sliderActiveSlide } = this.state;
    return (
      <>
        <StatusBar backgroundColor={'green'} barStyle={'light-content'}/>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.titleHeader}>Bạn đang muốn</Text>
          </View>
          <View style={styles.main}>
            <Carousel

              ref={(c) => {this._slider1Ref = c;}}

              // Required
              data={ENTRIES}
              renderItem={this.renderItem}
              itemWidth={width*0.8}
              sliderWidth={width}
              //itemHeight={width*1.2}
              //sliderHeight={width*1.2}

              // Behavior
              //hasParallaxImages={true}
              //firstItem={SLIDER_FIRST_ITEM}

              // Style and animation
              activeSlideAlignment={'center'}

              // Loop
              loop={true}
              loopClonesPerSide={3}

              // Autoplay
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={3000}

              // Callbacks
              onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }

            />
          </View>
          <View style={styles.footer}>
            <View>
            <Pagination
              dotsLength={ENTRIES.length}
              activeDotIndex={sliderActiveSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'green'}
              dotStyle={styles.paginationDot}
              inactiveDotColor={'black'}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
            </View>
            <View>
            <TouchableOpacity  onPress={() => this.onPressButton(this)}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Tham gia ngay!</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  // Layer
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 6,
  },
  footer: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Slide Item
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSlide: {
    resizeMode: 'contain',
    borderRadius: 4,
    width: width*0.8,
    height: width*0.8,
  },
  titleSlide: {
    marginVertical: 20,
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitleSlide: {
    color: 'gray',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  // Title Header
  titleHeader: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center'
  },
  // Pagination Dot
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  // Button 'Tham gia ngay'
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 6,
    marginBottom: width*0.1,
    padding: 12,
    width: width*0.8,
  },
  textButton: {
    color: 'white'
  },
});
