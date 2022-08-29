import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import StackRoutes from './stack.routes';

import { colors } from '../styles';

const Routes: React.FC = () => {
  //const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      //navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray_dark }}>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </View>
  );
};

export default Routes;
