import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet, 
  Dimensions,
  Image, 
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = wp(90);
const slideWidth = wp(95);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export default class SliderEntry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image () {
    const { data: {illustration} , parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={illustration}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        source={illustration}
        style={styles.image}
      />
    );
  }

  render () {

    const { data: { title, subtitle }, even } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        { title.toUpperCase() }
      </Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => { }}
        >
          <View style={styles.shadow} />
          <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
            { this.image }
            <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
          </View>
          <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
            { uppercaseTitle }
            <Text
              style={[styles.subtitle, even ? styles.subtitleEven : {}]}
              numberOfLines={2}
            >
              { subtitle }
            </Text>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: 0, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,//entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: 'black',
  },
  // title số lẻ
  title: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  // title số chẳn
  titleEven: {
    color: 'white',
  },
  // subtitle số lẻ
  subtitle: {
    marginTop: 6,
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic',
  },
  // subtitle số lẻ
  subtitleEven: {
    color: 'gray',
  }
});
