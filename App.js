import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Navigation} from './src/features/Navigation';

const App = () => {
  return (
    // <GlobalProvider>
    //   <View style={styles.container}>
    //     <MainScreen />
    //   </View>
    // </GlobalProvider>
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default App;
