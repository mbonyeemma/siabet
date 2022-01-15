import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import {Caption, Text} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../components/context';

import Card from '../components/Card';
import utils from '../model/utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Note from '../components/Note';

const Wallet = ({navigation}) => {
  const {userData, account} = React.useContext (AuthContext);

  const [following, setFollowing] = useState (0);
  const [followers, setFollowers] = useState (0);
  const [lost, setLost] = useState (0);
  const [played, setPlayed] = useState (0);
  const [won, setWon] = useState (0);
  const [data, setData] = useState ([]);
  const [isRefreshing, setRefresh] = useState (false);

  useEffect (() => {}, []);

  const get_profile = async () => {
    try {
      setRefresh (true);

      const response = await fetch (
        utils.ENDPONT + 'user/profile/' + userData.user_id
      );
      const json = await response.json ();
      console.log (json);
      setFollowing (json.following);
      setFollowers (json.followers);
      setPlayed (json.played);
      setWon (json.won);
      setLost (json.lost);
      get_user_bets ();
    } catch (error) {
      console.error (error);
    }
  };

  const openLink = () => {
    Linking.openURL ('https://siabet.org/about/');
  };

  const get_user_bets = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch (
        utils.ENDPONT + 'bet/user_bets/' + userData.user_id
      );
      const json = await response.json ();
      console.log (json);
      setData (json);
      setRefresh (false);
    } catch (error) {
      console.error (error);
      setRefresh (false);
    }
  };

  const getBalance = (account, currency) => {
    try {
      let balance = 0;
      if (currency == 'XLM') {
        balance = Number.parseFloat (
          account.balances.find (b => b.asset_type == 'native').balance
        );
      } else {
        balance = Number.parseFloat (
          account.balances.find (b => b.asset_code == currency).balance
        );
      }
      return Math.round (balance);
    } catch (err) {
      return 0;
    }
  };

  const renderItem = ({item}) => {
    return <Card itemData={item} />;
  };
  const goto = () => {
    navigation.navigate ('WalletReceive');
  };
  function numberWithCommas (x) {
    return x.toString ().replace (/\B(?=(\d{3})+(?!\d))/g, ',');
  }



  return (
    <SafeAreaView style={styles.container}>
   

      <View style={styles.userInfoSection}>
        <View style={styles.section}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, fontWeight: 'bold'}}>SIA</Text>
            <Text style={styles.captiontext}>
              {numberWithCommas (getBalance (account, 'SIA'))}{' '}
            </Text>

          </View>
          <Text style={{color: '#26AC79', textAlign: 'center'}}>
            {' '}Wallet Balance
          </Text>

        </View>

      </View>

      <View style={{flex: 1, backgroundColor: '#FFF', padding: 16}}>

        <View style={styles.infoBoxWrapper}>

          <TouchableOpacity onPress={goto} style={styles.sectionBoxLeft}>
            <View>
              <FontAwesome5
                color="#26AC79"
                style={{alignSelf: 'center'}}
                name="arrow-down"
                size={26}
              />

              <Caption style={styles.caption}>Receive</Caption>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate ('WalletTransfer')}
            style={styles.sectionBoxRight}
          >
            <FontAwesome5
              color="red"
              style={{alignSelf: 'center'}}
              name="arrow-up"
              size={26}
            />
            <Caption style={styles.caption}>Send</Caption>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate ('PlayEarn')}
            style={styles.sectionBoxRight}
          >
            <MaterialIcons
              color="black"
              style={{alignSelf: 'center'}}
              name="backup"
              size={26}
            />
            <Caption style={styles.caption}>Backup Wallet</Caption>
          </TouchableOpacity>

        </View>

        <View style={styles.infoBoxWrapper}>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL (
                'https://stellarterm.com/exchange/SIA-GCHV4EUCZ3T45WXLK573GFNBPRBQPFX654J4J6232P6TRZMBMEJPFYW2/XLM-native'
              )}
            style={styles.sectionBoxLeft}
          >
            <View>
              <AntDesign
                color="blue"
                style={{alignSelf: 'center'}}
                name="eye"
                size={26}
              />

              <Caption style={styles.caption}>View on stellarterm</Caption>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate ('BuySIA')}
            style={styles.sectionBoxRight}
          >
            <FontAwesome5
              color="red"
              style={{alignSelf: 'center'}}
              name="arrow-up"
              size={26}
            />
            <Caption style={styles.caption}>Buy SIA</Caption>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate ('WalletTransfer')}
            style={styles.sectionBoxRight}
          >
            <FontAwesome5
              color="red"
              style={{alignSelf: 'center'}}
              name="arrow-up"
              size={26}
            />
            <Caption style={styles.caption}>Swap SIA</Caption>
          </TouchableOpacity>

        </View>
        <View style={{flex: 2}}>
          <Note
            onPress={() => Linking.openURL ('https://siabet.org/about/')}
            text="What is SIA and how can I get it? Tap to read more about SIA and the stellar blockchain."
          />
        </View>

      </View>

    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  sectionBoxLeft: {
    flex: 1,
    height: '70%',
    marginRight: 10,
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
  sectionBoxRight: {
    flex: 1,
    height: '70%',
    marginLeft: 10,
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
    alignSelf: 'center',
  },
  userInfoSection: {
    marginTop: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  captiontext: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
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
