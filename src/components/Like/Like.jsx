import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableHighlight, View} from 'react-native';

import FavFilled from '../../assets/icons/HeartFilled.svg';
import Fav from '../../assets/icons/Heart.svg';
import colors from '../../config/colors';

export const Like = ({onPress, liked = false, size = 48}) => {
  return (
    <View
      style={[
        styles.icon,
        {width: size, height: size},
        liked ? styles.active : styles.default,
      ]}>
      <TouchableHighlight onPress={onPress}>
        {liked ? (
          <FavFilled width={24} height={21} />
        ) : (
          <Fav width={24} height={21} />
        )}
      </TouchableHighlight>
    </View>
  );
};

Like.propTypes = {
  onPress: PropTypes.func,
  liked: PropTypes.bool,
  size: PropTypes.number,
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 24,
    borderRadius: 36,
  },
  default: {
    backgroundColor: colors.blueChalk,
  },
  active: {
    backgroundColor: colors.heliotrope,
  },
});
