import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuickActions from 'react-native-quick-actions';
import {DeviceEventEmitter} from 'react-native';
import Notification from './Screens/Notification/Notification';
import Home from './Screens/Home/Home';
import Warning from './Screens/Warning/Warning';

const Stack = createStackNavigator();

const App = () => {
  const navigationRef = useRef(null);
  const [initialQuickAction, setInitialQuickAction] = useState(null);

  useEffect(() => {
    const handleQuickAction = action => {
      const screen =
        action?.type === 'Notification'
          ? 'Notification'
          : action?.type === 'Warning'
          ? 'Warning'
          : 'Home';
      if (navigationRef.current) {
        navigationRef.current.navigate(screen);
      } else {
        setInitialQuickAction({screen});
      }
    };

    QuickActions.setShortcutItems([
      {
        type: 'Notification',
        title: 'See your notifications',
        subtitle: "See notifications you've received",
        icon: 'notification_screen',
        userInfo: {url: 'app://notification'},
      },
      {
        type: 'Warning',
        title: 'See your warnings',
        subtitle: "See warnings you've received",
        icon: 'notification_screen',
        userInfo: {url: 'app://warning'},
      },
    ]);

    QuickActions.popInitialAction().then(handleQuickAction);

    const listener = DeviceEventEmitter.addListener(
      'quickActionShortcut',
      handleQuickAction,
    );

    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (initialQuickAction && navigationRef.current) {
      navigationRef.current.navigate(initialQuickAction.screen);
      setInitialQuickAction(null);
    }
  }, [initialQuickAction]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Warning" component={Warning} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
