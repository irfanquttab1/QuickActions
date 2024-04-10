import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../Home/Style';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: 'blue'}]}>Notification Screen</Text>
    </View>
  );
};

export default Notification;
