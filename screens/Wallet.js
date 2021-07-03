import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, RefreshControl, TouchableOpacity,FlatList, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption, Paragraph,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../components/context';

import Share from 'react-native-share';
import Card from '../components/Card';
import files from '../assets/filesBase64';
import utils from '../model/utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Wallet = ({navigation}) => {
  const { userData, account } = React.useContext(AuthContext);

  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [lost, setLost] = useState(0);
  const [played, setPlayed] = useState(0);
  const [won, setWon] = useState(0);
  const [data, setData] = useState([]);
  const [isRefreshing, setRefresh] = useState(false);


  useEffect(() => {
    get_profile();
  }, []);

  const get_profile = async () => {
    try {
      setRefresh(true)

      const response = await fetch(utils.ENDPONT + 'user/profile/' + userData.user_id);
      const json = await response.json();
      console.log(json);
      setFollowing(json.following);
      setFollowers(json.followers);
      setPlayed(json.played);
      setWon(json.won);
      setLost(json.lost);
      get_user_bets()

    } catch (error) {
      console.error(error);
    }
  };

  const get_user_bets = async () => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      const response = await fetch(utils.ENDPONT + 'bet/user_bets/' + userData.user_id);
      const json = await response.json();
      console.log(json);
      setData(json);
      setRefresh(false);
    } catch (error) {
      console.error(error);
      setRefresh(false);
    }
  };

  const getBalance = (account, currency) => {
    try {

      let balance = 0;
      if (currency == "XLM") {
        balance = Number.parseFloat(account.balances.find((b) => b.asset_type == "native").balance);
      } else {
        balance = Number.parseFloat(account.balances.find((b) => b.asset_code == currency).balance);
      }
      return balance;
    } catch (err) {
      return 0
    }


  };

  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
      />
    );
  };
  const goto =() =>{
    navigation.navigate('WalletReceive')
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>




        <View style={styles.section}>
          <Text style={styles.captiontext}>{getBalance(account, "SIA")} SIA</Text>
        </View>


      </View>



      <View style={styles.infoBoxWrapper}>

        <TouchableOpacity onPress={goto} style={styles.sectionBox}>
          <View>
            <FontAwesome5 color="#26AC79" style={{ alignSelf: 'center' }} name="arrow-down" size={24} />

            <Caption style={styles.caption}>Receive</Caption>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('WalletTransfer')} style={styles.sectionBox}>
          <FontAwesome5 color="red" style={{ alignSelf: 'center' }} name="arrow-up" size={24} />
          <Caption style={styles.caption}>Send</Caption>
        </TouchableOpacity>

        <View style={styles.sectionBox}>
          <FontAwesome5 color="blue" style={{ alignSelf: 'center' }} name="exchange-alt" size={24} />
          <Caption style={styles.caption}>Exchange</Caption>
        </View>

      </View>

      <View style={{ flex: 1, marginTop: 20, padding: 16, backgroundColor: '#FFF' }} >
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => get_profile()}
            />}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.bt_id}
        />
      </View>




    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  sectionBox: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    elevation: 5,
    alignSelf: 'center',
    padding: 10,


  },
  section: {
    margin: 16,
    alignSelf: 'center'
  },
  userInfoSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  captiontext: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  captionUser: {
    fontSize: 14,
    lineHeight: 14,
    color: '#26AC79',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
