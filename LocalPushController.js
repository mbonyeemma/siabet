import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },popInitialNotification: true,
  requestPermissions: true
})


export const LocalNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
    autoCancel: true,
    bigText:message,
    subText: '',
    title: title,
    message: 'see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  })
}