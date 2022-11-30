import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

export const NoData = ({message = 'Nothing found'}) => {
  return <Text>{message}</Text>;
};

NoData.propTypes = {
  message: PropTypes.string,
};
