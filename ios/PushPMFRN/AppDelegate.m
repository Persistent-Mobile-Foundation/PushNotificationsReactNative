#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"PushPMFRN";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (void) application:(UIApplication *) application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"RNMFPPushDidRegisterForRemoteNotificationsWithDeviceToken" object:deviceToken];
}

- (void) application:(UIApplication*)application didFailToRegisterForRemoteNotifications: (NSError*) error {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"RNMFPPushDidFailToRegisterForRemoteNotificationsWithError" object:error];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"RNMFPPushDidReceiveRemoteNotification" object:userInfo];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
