

import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { useTheme, Avatar, Divider } from 'react-native-paper';


const Button = ({text,onPressed}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPressed} style={{ justifyContent: 'flex-end' }}>
    <Text style={{ backgroundColor: colors.accent, padding: 5, borderRadius: 5, color: '#FFF' }} > {text==undefined?"Play":text} </Text>
</TouchableOpacity>
  );
};

export default Button;