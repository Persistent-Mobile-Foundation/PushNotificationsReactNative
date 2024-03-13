import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import React from 'react';

import {
  MFPPush,
  MFPSimplePushNotification,
} from 'react-native-ibm-mobilefirst-push';
import colors from './assets/styles/colors';

const App = () => {
  setTimeout(() => {
    MFPPush.initialize();
  }, 1000);
  const NOTIFICATION_CALLBACK_RECEIVER = 'NOTIFICATION_CALLBACK_RECEIVER';
  const SUCCESS = 'SUCCESS\n';
  const FAILURE = 'FAILURE\n';

  DeviceEventEmitter.addListener(
    NOTIFICATION_CALLBACK_RECEIVER,
    function (event) {
      var notification = new MFPSimplePushNotification(event);
      console.log('EVENT000', event);
      Alert.alert(notification.getAlert());
    },
  );
  const registerAppPush = () => {
    MFPPush.registerDevice()
      .then(data => {
        console.log('data',data);
        Alert.alert('Device registered for Push Successfully');
        MFPPush.registerNotificationsCallback(NOTIFICATION_CALLBACK_RECEIVER);
      })
      .catch(err => {
        Alert.alert('failed', JSON.stringify(err));
      });
  };
  const unregisterApp = () => {
    MFPPush.unregisterDevice()
      .then(data => {
        Alert.alert('Successfully unregistered device');
      })
      .catch(err => {
        Alert.alert('Error unregistering device', JSON.stringify(err));
      });
  };
  const getAlltags = () => {
    MFPPush.getTags()
      .then((data: any) => {
        Alert.alert(JSON.stringify(data));
      })
      .catch((err: any) => {
        Alert.alert('err', err);
      });
  };
  // const subscribeTags = () => {};
  return (
    <View style={styles.screenbg}>
      <View style={styles.containerImg}>
        <Image
          style={styles.imageStyle}
          source={require('./assets/images/side-menu-logo.jpeg')}
        />
      </View>
      <TouchableOpacity onPress={() => registerAppPush()}>
        <View style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Register App Push</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => unregisterApp()}>
        <View style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Unregister Device</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getAlltags()}>
        <View style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Get tags</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => subscribeTags}>
        <View style={styles.buttonStyle}>
          <Text>Subscribe to tags</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  containerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 150,
  },
  screenbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.buttonColor,
    padding: 10,
    margin: 20,
    borderRadius: 5,
    color: colors.textColor,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default App;
