import React, { Component } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, 
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from '../onbroading/SliderEntry';

const { width } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * width) / 100;
  return Math.round(value);
}
const sliderWidth = wp(75);
const itemHorizontalMargin = wp(2);

const itemWidth = sliderWidth;

const SLIDER_FIRST_ITEM = 1;

const ENTRIES = [
  {
    title: 'Hôm nay mình sẽ ăn gì đây nhỉ?',
    subtitle: 'Bún đậu, Phở bò, Cơm gà, Bánh xèo...',
    illustration: require('../../assets/images/food.jpg')
  },
  {
    title: 'Chia sẽ sở thích ăn uống',
    subtitle: 'Chia sẽ các địa điểm ăn ngon...',
    illustration: require('../../assets/images/share.jpg')
  },
  {
    title: 'Tìm bạn ăn chung dễ dàng',
    subtitle: 'Bạn không còn phải đi ăn một mình nữa...',
    illustration: require('../../assets/images/cheers.jpg')
  },
];

export default class OnbroadingScreen extends Component {
  
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props);
    this.state = {
      sliderActiveSlide: SLIDER_FIRST_ITEM
    };
  }

  _onPressButton() {
    this.props.navigation.navigate('SignIn');
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  render () {
    const { sliderActiveSlide } = this.state;
    return (
      <>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Bạn đang muốn</Text>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={ENTRIES}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              //inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
            />
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
          <View style={styles.footer}>
            <TouchableOpacity  onPress={this._onPressButton}>
              <View style={styles.button}>
                <Text style={styles.joinText}>Tham gia ngay!</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    flex: 8,
  },
  footer: {
    flex: 2,
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 40,
    color: 'green',
    fontSize: 16,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 6,
    marginTop: width*0.1,
    padding: 12,
    width: width*0.8,
  },
  joinText: {
    color: 'white'
  },
});
