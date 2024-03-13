

# PMF - Push React Native SDK plug-in
To add PSL MobileFoundation&trade; Push capabilities to an existing React Native app, you add the react-native-pmf & react-native-pmf-push plug-in to your app. The react-native-pmf plug-in contains the PSL Mobile Foundation SDK and the react-native-pmf-push contains all the APIs to work with Push Notifications.

Refer to the documentation links for more information.

## Installation
Download the react-native-pmf-push.tar.gz and run the following command to install Push plugin

`npm install <react-native-pmf-push.tar.gz>  --save`
	
## Getting Started 

### Pre-requisites 
1. Make sure you have all the pre-requisites for a React Native app covered. See the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page if you're new to this whole stuff. 
2. Setup of MobileFoundation server 


### Create React Native Project 

* The first step is to create a React Native project. Let's call our app as the MobileApp. Use the React Native CLI to create a new project. 

> `react-native init PMFPushApp`

* Next, add the react native plugin to your app

>`cd PMFPushApp `

>`npm install <react-native-pmf-push.tar.gz>  --save`

* Link your project so that all native dependencies are added to your React Native project. This step is not required for react-native version 0.60 and above.

>`react-native link`

* Install Mobilefoundation specific cocopods dependencies to the project. 

>`cd ios && pod install`

This step is applicable only for iOS platform.



### Configure the Application

#### Android

- Add the following lines to **AndroidManifest.xml** ({project-folder}/android/app/src/main/) :
 
	- `xmlns:tools="http://schemas.android.com/tools"` ---  within the **manifest** tag
	- `tools:replace="android:allowBackup"` --- within the **application** tag
	
- Register the application:
	 `pmfdev app register`
(NOTE: Double check the values in mfpclient.properties file)

- Register your app on Firebase Console. 
	- create a new Project 
	- go to Project Settings
	- click on **Add Firebase to your Android app**
	- give the package name **com.ibm.mobilefirstplatform.clientsdk.android.push**
	- click on Register app and skip the rest of the steps
	- add another app by clicking **add App** button
	- give the package name just as you have in your app. For eg. **com.myreactnativeapp**
	- click on Register app
	- download the config file — **google-services.json** and paste it inside `/<YOUR—REACT—NATIVE—APP>/android/app/` directory
- Configure your app
	- open AndroidManifest.xml and add the following
	in the **<manifest>** tag
	
		```
		<uses-permission android:name="android.permission.INTERNET" />
		<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
		<uses-permission android:name="android.permission.WAKE_LOCK"/>
		```
	in the **application** tag inside the Main Activity of the app add the following intent-filter:
	
		```
		<intent-filter>
		 	
		 	<action android:name="YOUR.PACKAGE_NAME.HERE.IBMPushNotification" />
			
			<category android:name="android.intent.category.DEFAULT" />
		
		</intent-filter>
		```
	also, add the following under the **application** tag:

		```
		<activity 
		 	android:name="com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushNotificationHandler" 
		 	android:theme="@android:style/Theme.NoDisplay"/>
	
		<!-- MFPPush Intent Service -->
		<service android:exported="true" android:name="com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushIntentService">
	  		<intent-filter>
		      	<action android:name="com.google.firebase.MESSAGING_EVENT" />
	      	</intent-filter>
		</service>
		
		<service android:name="com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPush" android:exported="true">
		   	<intent-filter>
	      		<action android:name="com.google.firebase.INSTANCE_ID_EVENT" />
	      	</intent-filter>
		</service>
		```
	
- open /MFPPushApp/android/build.gradle file
	- add the following line to dependencies{ … } inside the buildscript{ … }  block

		`classpath 'com.google.gms:google-services:4.0.0'`
- open /MFPPushApp/android/app/build.gradle file
	- add the following lines inside the dependencies{…}
	
		```
		implementation 'com.google.firebase:firebase-core:16.0.1'
		implementation 'com.google.android.gms:play-services-base:15.0.1'
		implementation 'com.google.firebase:firebase-messaging:17.1.0'
		```
	- finally add the following line at the end of the build.gradle file:

		 `apply plugin: 'com.google.gms.google-services'`

- To run the application :
 	`react-native run-android`


#### iOS 

- Make sure your iOS Application is configured with valid provisioning profile enabled with push capability
- By default, React Native creates a native iOS project built with application delegate class, therefore you will need to add the following code below to application delegate(`AppDelegate.m`) class file.

	```
	- (void) application:(UIApplication *) application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
	  [[NSNotificationCenter defaultCenter] postNotificationName:@"RNMFPPushDidRegisterForRemoteNotificationsWithDeviceToken" object:deviceToken];
	}
	
	- (void) application:(UIApplication*)application didFailToRegisterForRemoteNotifications: (NSError*) error {
	  [[NSNotificationCenter defaultCenter] postNotificationName:@"RNMFPPushDidFailToRegisterForRemoteNotificationsWithError" object:error];
	}
	
	- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
	  [[NSNotificationCenter defaultCenter] postNotificationName:@"RNMFPPushDidReceiveRemoteNotification" object:userInfo];
	}
	```

- To run the application :
	`react-native run-ios`

>**Note :** In XCode, in the project navigator, drag and drop **mfpclient.plist** from **ios** folder. This step is applicable only for iOS platform.


#### React Native App
- We need to add a Notification Event Listener in order to be notified when a Push Notification arrives. For this, add the following code to your JS file.
- Register a Notification Callback by using the **registerNotificationsCallback** API of **MFPPush** class:
	`MFPPush.registerNotificationsCallback("my_listener");`

	Finally add the following code to define a Event Listener:
		
	```
	import {Platform, DeviceEventEmitter, NativeAppEventEmitter} from 'react-native';
	import {MFPPush, MFPSimplePushNotification} from 'react-native-ibm-mobilefirst-push'

	const emitter = Platform.select({
	  	ios: NativeAppEventEmitter,
	  	android: DeviceEventEmitter,
	});
	
	emitter.addListener("my_listener", function(notification) {
		// Here 'notification' is an instance of MFPSimplePushNotification class
	  	console.log(notification.getAlert());
	});

	```

## Supported platforms
- Android
- iOS


