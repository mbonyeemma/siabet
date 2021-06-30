import React from 'react';
import { View, TextInput, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Share from 'react-native-share';
import { data } from '../model/data';
import Card from '../components/Card';
import files from '../assets/filesBase64';

const contactsComponent = (navigation) => {
 

  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => navigation.navigate('CardItemDetails', { itemData: item })}
      />
    );
  };
  const HeaderComponent = ({ item }) => {
    return (
      <View style={{ marginLeft: 10 ,textAlign:'center',flexDirection:'row'}}>
      <MaterialIcons
        name="cancel"
        size={25}
        onPress={() => goback}
      />
              <Text style={{fontSize:15,marginLeft:10,fontWeight:'bold'}}>  Select user</Text>

    </View>
  );
  }

  return (
    <SafeAreaView style={styles.container}>
<HeaderComponent/>
     


      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>


      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />




    </SafeAreaView>
  );
};

export default contactsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
