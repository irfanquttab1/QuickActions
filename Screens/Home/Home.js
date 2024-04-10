import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './Style';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: 'black'}]}>Home Screen</Text>
    </View>
  );
};

export default Home;
