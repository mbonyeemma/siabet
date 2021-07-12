import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { LocalNotification } from './LocalPushController'


messaging().setBackgroundMessageHandler(async remoteMessage => {
      LocalNotification(remoteMessage.data.title,remoteMessage.data.message)
  });

AppRegistry.registerComponent(appName, () => App);
