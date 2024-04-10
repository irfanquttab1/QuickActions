import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../Home/Style';

const Warning = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: 'green'}]}>Warning Screen</Text>
    </View>
  );
};

export default Warning;
