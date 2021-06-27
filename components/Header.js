import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme, Avatar } from 'react-native-paper';
import token from '../assets/token.png'
import HeaderMenu from './HeaderMenu';
 import { MenuProvider } from 'react-native-popup-menu';

 
import {
    Menu,    MenuOptions,    MenuOption,    text,    MenuTrigger,
  } from 'react-native-popup-menu';

const Header = ({ navigation, onPress }) => {
    const { colors } = useTheme();

    return (

        <View style={styles.main}>
             
          


            <Menu>
        <MenuTrigger style={styles.container} >
        
                    <Avatar.Image size={24} source={require('../assets/token.png')} />
                    <Text style={styles.Text}> 120K </Text>
               
            
        </MenuTrigger>
        <MenuOptions>
        <MenuOption  onSelect={() => alert(`Save`)}  >
            <View style={styles.menuOption}>
            <Icon  name="wallet"   size={20}/> 
            <Text> My Wallet</Text>
            </View>
         </MenuOption>
       
         <MenuOption  onSelect={() => alert(`Save`)}  >
            <View style={styles.menuOption}>
            <Icon  name="wallet"   size={20}/> 
            <Text> Earn SIA</Text>
            </View>
         </MenuOption>

         <MenuOption  onSelect={() => alert(`Save`)}  >
            <View style={styles.menuOption}>
            <Icon  name="wallet"   size={20}/> 
            <Text> Watch Ads</Text>
            </View>
         </MenuOption>

         <MenuOption  onSelect={() => alert(`Save`)}  >
            <View style={styles.menuOptionLast}>
            <Icon  name="wallet"   size={20}/> 
            <Text> Buy SIA</Text>
            </View>
         </MenuOption>

        </MenuOptions>
      </Menu>



         </View>
    );
};

export default Header;

 
  
const styles = StyleSheet.create({
    main: {
        flexDirection: 'row', marginRight: 10,
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
    },
    Text: {
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 18,
        alignContent: 'center'


    },
    container: {
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
     },
     menu:{
         padding:10
     },
     menuOption:{
        flexDirection: 'row',
        paddingLeft:10,
        paddingTop:10

     },
     menuOptionLast:{
        flexDirection: 'row',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:20

     }
     
});




