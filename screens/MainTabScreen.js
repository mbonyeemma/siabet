import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './HomeScreen';
import Header from '../components/Header'
import createTopicScreen from './createTopicScreen';
import ProfileScreen from './ProfileScreen';

import { useTheme } from 'react-native-paper';
import { View } from 'react-native-animatable';
import NotificationScreen from './NotificationScreen';
import CardItemDetails from './CardItemDetails';
import CreatePublicTopic from './CreatePublicTopic';
const TopicStack = createStackNavigator();
const mainStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (<mainStack.Navigator>
    <mainStack.Screen name="MainTabScreen" options={{
      title: 'siabet',
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <Icon.Button
            name="ios-menu"
            size={25}
            color={colors.gray}
            backgroundColor={colors.background}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      ),
      headerRight: () => (
        <Header />
      ),
    }} component={HomeTabs} />


    <TopicStack.Screen
      name="CardItemDetails"
      component={CardItemDetails}
      options={() => ({
        title: "Suggest a topic ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />


    <TopicStack.Screen
      name="CreatePublicTopic"
      component={CreatePublicTopic}
      options={() => ({
        title: "Public Topic ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />

  </mainStack.Navigator>);
}

export default MainTabScreen;
const HomeTabs = () => {
  const { colors } = useTheme();

  return (<Tab.Navigator initialRouteName="Home"
    activeColor="#26AC79"
    shifting={false}
    inactiveColor={colors.gray}
    barStyle={{ backgroundColor: '#FFF'}}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}


      options={{

        showLabel: true,
        tabBarLabel: 'Home',
        tintColor: '#26AC79',
        headerShown: true,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Topics"
      component={createTopicScreen}

      options={{
        headerShown: true,
        adaptive: true,
        showLabel: true,

        tabBarLabel: 'Suggest',
        tabBarIcon: ({ color }) => (
          <MaterialIcon name="add-box" color={color} size={27} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        tabBarLabel: 'Notifications',
        tabBarBadge: 2,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}

    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />

  </Tab.Navigator>);
}
