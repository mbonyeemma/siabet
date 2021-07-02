/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import { configureFonts } from 'react-native-paper';

import { MenuProvider } from 'react-native-popup-menu';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null); 

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userData, setData] = useState([]);



  const initialLoginState = {
    isLoading: false,
    userName: null,
    userToken: null,
    userId: null,
  };

  const fontConfig = {

    ios: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }
  };
  const CustomDefaultTheme = {
    fonts: configureFonts(fontConfig),
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      primary: '#6200ee',
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      gray: '#808080',
      accent: "#26AC79",
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    fonts: configureFonts(fontConfig),
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      primary: '#6200ee',
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      gray: '#808080',
      accent: "#26AC79",
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userName: action.username,
          UserId: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.username,
          UserId: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.username,
          UserId: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);



  const authContext = {
    userData:userData,
    signIn: async (data) => {

      try {
        await AsyncStorage.setItem('data', data);
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', id: data.user_id, username: data.username, token: data.jwt });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('data');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async (data) => {
      try {
        console.log(data)
 
        await AsyncStorage.setItem('data', data);
        data = JSON.parse(data)
        setUpdates(data);


      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'REGISTER', id: data.user_id, username: data.username, token: data.jwt });
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);

      let userToken;
      userToken = null;
      try {
        data = await AsyncStorage.getItem('data');

        data = JSON.parse(data)
        userToken = data.user_id
        console.log()
         
         setData(data) 
        dispatch({ type: 'RETRIEVE_TOKEN', id: data.user_id, username: data.username, token: userToken });
        return;
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

    }, 1000);
  }, []);

  const click = async () => {
    const currentState = await setUsername(data.username)
    console.log(currentState);
  };

  const  setUpdates =  (data) => {
    setData(data)
  }



  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <MenuProvider>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null  ? (
              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
                <Drawer.Screen name="SupportScreen" component={SupportScreen} />
                <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
                <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
              </Drawer.Navigator>
            )
              :
              <RootStackScreen />
            }
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </MenuProvider>
  );
}

export default App;
