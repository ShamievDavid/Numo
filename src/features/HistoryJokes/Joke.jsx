import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {Like} from '../../components';
import colors from '../../config/colors';

export const Joke = ({joke, liked, onLike, id}) => {
  const handleLike = () => {
    onLike(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.jokeBox}>
        <Text style={styles.jokeText}>{joke}</Text>
      </View>
      <Like liked={liked} size={48} onPress={handleLike} />
    </View>
  );
};

Joke.propTypes = {
  joke: PropTypes.string,
  liked: PropTypes.bool,
  onLike: PropTypes.func,
  id: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
    borderBottomColor: colors.mercury,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  jokeBox: {
    flexShrink: 1,
    marginRight: 20,
  },
  jokeText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: colors.black,
  },
});
