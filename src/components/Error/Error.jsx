import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

export const Error = ({message = 'Something went wrong...Try later'}) => {
  return <Text>{message}</Text>;
};

Error.propTypes = {
  message: PropTypes.string,
};
