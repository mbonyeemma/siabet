import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';

const UserCard = ({itemData, onPress, showButton}) => {
  return (
      <View style={styles.card}>

        <View style={styles.cardInfo}>

          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.cardTitle}>#{itemData.position}  </Text>
            <Avatar.Image
              size={36}
              style={styles.avatar}
              source={{uri: itemData.avatar}}
            />
            <Text style={styles.cardTitle}>@{itemData.username}</Text>

          </View>

          <Text style={styles.cardStake}>{itemData.stake} SIA</Text>

        </View>
      </View>
  );
};

export default UserCard;

const styles = StyleSheet.create ({
  card: {
    marginVertical: 5,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    marginRight: 5,
    backgroundColor: '#999',
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
  },
  cardStake: {
    fontWeight: 'bold',
    marginLeft: 5,
    alignSelf: 'center',
  },

  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
