import React,{useState} from 'react';

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
import PlayRequests from './PlayRequests';
import TopicItemDetail from './TopicItemDetail';
import CreatePublicTopic from './CreatePublicTopic';
import contactScreen from './contactScreen';
import Wallet from './Wallet';
import WalletReceive from './WalletReceive';
import WalletTransfer from './WalletTransfer';
import PlayEarn from './PlayEarn';
import TopicsApproval from './TopicsApproval';
import WalletStatement from './WalletStatement';

const TopicStack = createStackNavigator();
const mainStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import { AuthContext } from '../components/context';





const MainTabScreen = ({ navigation }) => {
  const { userData, Requests,account,updateBalance} = React.useContext(AuthContext);

  const { colors } = useTheme();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  
  

  const getBalance = (account, currency) => {
    try{
    
        let balance = 0;
        if (currency == "XLM") {
            balance = Number.parseFloat(account.balances.find((b) => b.asset_type == "native").balance);
        } else {
            balance = Number.parseFloat(account.balances.find((b) => b.asset_code == currency).balance);
        }
        return balance;
      }catch(err) {
        return "0"
      }
     

    };


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
        <Header navigation={navigation} balance={numberWithCommas(getBalance(account,"SIA"))} />
      ),
    }} component={HomeTabs} />


    <TopicStack.Screen
      name="TopicItemDetail"
      component={TopicItemDetail}
      options={() => ({
        title: "Play ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />
 
 <TopicStack.Screen
      name="Wallet"
      component={Wallet}
      options={() => ({
        title: "My Wallet ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />
 
 <TopicStack.Screen
      name="WalletReceive"
      component={WalletReceive}
      options={() => ({
        title: "Receive Assets ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />
    <TopicStack.Screen
      name="WalletTransfer"
      component={WalletTransfer}
      options={() => ({
        title: "Transfer Assets ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />

<TopicStack.Screen
      name="WalletStatement"
      component={WalletStatement}
      options={() => ({
        title: "Account Operations ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />

    
 <TopicStack.Screen
      name="PlayEarn"
      component={PlayEarn}
      options={() => ({
        title: "BackUp Wallet ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />
    <TopicStack.Screen
      name="TopicsApproval"
      component={TopicsApproval}
      options={() => ({
        title: "Admin Topics ",
        headerBackTitleVisible: false,
        tabBarVisible: false,
      })}
    />

 
<TopicStack.Screen
      name="contactScreen"
      component={contactScreen}
      options={() => ({
        title: "Search Player ",
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
  const { userData, Requests,account,updateBalance} = React.useContext(AuthContext);
  const v = 0

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
    {Requests>0?<Tab.Screen
      name="PlayRequests"
      component={PlayRequests}
      options={{
        tabBarLabel: 'Play Requests',
        tabBarBadge: Requests,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}

    />:
      <Tab.Screen
      name="PlayRequests"
      component={PlayRequests}
      options={{
        tabBarLabel: 'Play Requests',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}

    />
    }

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
