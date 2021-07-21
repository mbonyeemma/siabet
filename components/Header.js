import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme, Avatar } from 'react-native-paper';
import token from '../assets/token.png'
import HeaderMenu from './HeaderMenu';
import { MenuProvider } from 'react-native-popup-menu';


import {
    Menu, MenuOptions, MenuOption, text, MenuTrigger,
} from 'react-native-popup-menu';

const Header = ({ navigation, onPress, balance }) => {
    const { colors } = useTheme();
    const [isOpen, setOpen] = useState(false)


    return (

        <View style={styles.main}>
            <Menu 
              onBackdropPress={() => setOpen(false)}
            opened={isOpen} >
                <MenuTrigger  onPress={() => setOpen(true)} style={styles.container} >
                    <Avatar.Image style={{backgroundColor: 'transparent'}} size={24} source={require('../assets/token.png')} />
                    <Text style={styles.Text}> {balance} </Text>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption >
                        <TouchableOpacity  onPress={() => {setOpen(false); navigation.navigate('Wallet')}} style={styles.menuOption}>
                            <Icon name="wallet" size={26} />
                            <Text style={{alignSelf:'center', marginLeft:5}}> My Wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity   onPress={() => {setOpen(false); navigation.navigate('WalletReceive')}}  style={styles.menuOption}>
                            <Entypo color="#26AC79" name="arrow-with-circle-down" size={26} />
                            <Text style={{alignSelf:'center' , marginLeft:5}}> Receive SIA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity   onPress={() => {setOpen(false); navigation.navigate('WalletTransfer')}}  style={styles.menuOption}>
                            <Entypo color="red" name="arrow-with-circle-up" size={26} />
                            <Text style={{alignSelf:'center' , marginLeft:5}}> Send SIA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity   onPress={() => {setOpen(false); navigation.navigate('WalletStatement')}}  style={[{marginBottom:20},styles.menuOption]}>
                            <MaterialCommunityIcons  name="swap-vertical-circle" size={26} />
                            <Text style={{alignSelf:'center' , marginLeft:5}}> Operations</Text>
                        </TouchableOpacity>


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
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text: {
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 18,
        alignContent: 'center'


    },
    container: {
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
    },
    menu: {
        padding: 10
    },
    menuOption: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop:10,
        paddingTop: 10

    },
    menuOptionLast: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 20

    }

});




