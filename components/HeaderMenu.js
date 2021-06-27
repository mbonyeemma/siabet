import * as React from 'react';
import { View,Text } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

 

// somewhere in your app
import {
  Menu,
  MenuOptions,
  MenuOption,
  text,
  MenuTrigger,
} from 'react-native-popup-menu';
 const HeaderMenu = () => (
    <View>
      <Menu>
        <MenuTrigger text='Select action' />
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text='Save' />
          <MenuOption onSelect={() => alert(`Delete`)} >
            <Text style={{color: 'red'}}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
        </MenuOptions>
      </Menu>
    </View>
  );

export default HeaderMenu;