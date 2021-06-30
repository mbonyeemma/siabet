

import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme, Avatar, Divider } from 'react-native-paper';


const SubmitButton = ({ text, onPressed, isLoading }) => {
  const { colors } = useTheme();
  return (
    <View>
      {isLoading ? <View style={styles.commandButtonDisabled}  >
        <ActivityIndicator size='large' animating={isLoading} color="white" />
      </View > :

        <TouchableOpacity onPress={onPressed} style={styles.commandButton}>
          <Text style={{  fontSize:16,  color: '#FFF' }} > {text == undefined ? "Play" : text} </Text>
        </TouchableOpacity>}
    </View>


  );
};

export default SubmitButton;



const styles = StyleSheet.create({
  signIn:{width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10},
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#26AC79',
    alignItems: 'center',
    marginTop: 10,
  },
  commandButtonDisabled: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#9bd9b0',
    alignItems: 'center',
    marginTop: 10,
  }
})