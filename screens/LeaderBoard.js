import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../components/BoardCard';
import {AuthContext} from '../components/context';
import utils from '../model/utils';

const LeaderBoard = ({route, navigation}) => {
  const {userData} = React.useContext (AuthContext);

  const [data, setData] = useState ([]);
  const [isRefreshing, setRefresh] = useState (false);
  const [query, setQuery] = useState ('');

  const GoItemBack = data => {
    route.params.onSelect (data);
    navigation.goBack ();
  };

  const renderItem = ({item}) => {
    return (
      <Card
        itemData={item}
        showButton={true}
        onPress={() => GoItemBack (item)}
      />
    );
  };

  useEffect (() => {
    get_all_users ('');
  }, []);

  const get_all_users = async query => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch (utils.ENDPONT + 'bet/leaderboard');
      const json = await response.json ();
      console.log (json);
      setData (json);
      setRefresh (false);
    } catch (error) {
      console.error (error);
      setRefresh (false);
    }
  };

  const get_following = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const response = await fetch (
        utils.ENDPONT + 'user/following/' + userData.user_id
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

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Leader Board</Text>

      <View style={{flexDirection:'row',padding:10}}>

        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.cardTitle}>Rank </Text>
           
          <Text style={styles.cardTitle}>Player</Text>

        </View>

        <Text style={styles.cardStake}>Winnings</Text>

      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#F1F1F1',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
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

