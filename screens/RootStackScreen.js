import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import PasswordReset from './PasswordReset';
import PasswordResetConfirm from './PasswordResetConfirm';

const RootStack = createStackNavigator ();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen
      name="PasswordReset"
      options={() => ({
        title: 'Play ',
        headerBackTitleVisible: true,
        tabBarVisible: true,
      })}
      component={PasswordReset}
    />
    <RootStack.Screen
      name="PasswordResetConfirm"
      options={() => ({
        title: 'Play ',
        headerBackTitleVisible: true,
        tabBarVisible: true,
      })}
      component={PasswordResetConfirm}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
