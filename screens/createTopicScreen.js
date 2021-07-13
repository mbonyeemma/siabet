import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const createTopicScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>

      <View style={{ alignItems: 'center' }}>

        <Text style={{ marginTop: 10,marginBottom: 20, fontSize: 18, fontWeight: 'bold' }}>
          suggest a topic
        </Text>
      </View>
      <TouchableOpacity

        onPress={() => navigation.navigate('CreatePublicTopic', { itemData: null })}>

        <View style={styles.card}>
          <View style={styles.cardInfo}>

            <View style={{ flex: 8 }}>
              <Text style={styles.cardTitle}>Suggest a public topic</Text>
              <Text style={styles.cardDetails}>Suggest a topic and stand a chance to win 500 SIA tokens. This suggestion will go under review and if approved, you will be awared with 500 SIA</Text>
            </View>
            <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
              <Icon name="arrow-forward-circle" color="#FFF" size={26} />
            </View>
          </View>

        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>Alert.alert("","Private topics coming soon")}>
        <View style={styles.card}>
          <View style={styles.cardInfoBottom}>

            <View style={{ flex: 8 }}>
              <Text style={styles.cardTitle}>Suggest a private topic</Text>
              <Text style={styles.cardDetails}>No approval needed for private topics. You and your friends can only see these topics. Be fair enough and submit correct results for every topic.</Text>
            </View>
            <View style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}>
              <Icon name="arrow-forward-circle" color="#FFF" size={26} />
            </View>
          </View>

        </View>
      </TouchableOpacity>



    </View>

  );
}

export default createTopicScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center'
  },

  card: {
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: '#26AC79',
  },
  cardInfoBottom: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: '#026c45',
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: "#FFF"

  },
  cardDetails: {
    color: '#FFF',
  },
});
