import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

const useNotification = (navigation: any) => {
  const onBackground = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(remoteMessage);
    });
  };

  useEffect(() => {
    onBackground();
  }, []);
};

export default useNotification;
