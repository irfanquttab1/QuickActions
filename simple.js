import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuickActions from 'react-native-quick-actions';
import {DeviceEventEmitter} from 'react-native';
import HomeScreen from './Screens/Home/Home';
import NotificationScreen from './Screens/Notification/Notification';

const Stack = createStackNavigator();

const App = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    QuickActions.setShortcutItems([
      {
        type: 'Notification',
        title: 'See your notifications',
        subtitle: "See notifications you've received",
        icon: 'notification_screen',
        userInfo: {url: 'app://notification'},
      },
    ]);

    const listener = DeviceEventEmitter.addListener(
      'quickActionShortcut',
      data => {
        if (navigationRef.current) {
          navigationRef.current.navigate(
            data.type === 'Notification' ? 'Notification' : 'Home',
          );
        }
      },
    );

    return () => listener.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
