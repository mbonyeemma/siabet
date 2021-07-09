import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {useTheme, Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import data from '../model/bets';
import StarRating from './StarRating';
import BetItem from '../components/betItem';
import moment from 'moment';
import PlayButton from '../components/Button';

const TopicCard = ({itemData, onPress}) => {
  const [showMore, setShowMore] = useState (false);
  const [month, setMonth] = useState ('');
  const [day, setDate] = useState ('false');
  const [inPlay, SetInPlay] = useState (false);

  const theme = useTheme ();
  const getMonth = date => {
    const local = moment.utc (date).local ().format ();
    const d = moment (local).format ('MMMM Do, yyyy H:mma');

    return moment (local).format ('MMMM');
  };

  const getRange = date => {
    const current = new Date ();

    const now = moment (current).utc ().format ();
    var end = moment (date); // another date

    var duration = moment.duration (end.diff (now));
    var seconds = duration.asSeconds ();

    return seconds;
  };

  const getDay = date => {
    const local = moment.utc (date).local ().format ();
    return moment (local).format ('Do');
  };
  const getYear = date => {
    const local = moment.utc (date).local ().format ();
    return moment (local).format ('yyyy');
  };

  const formatTime = date => {
    const d = moment (date).format ('MMMM Do, yyyy H:mma');
    setMonth (moment (date).format ('MMMM'));
    setDate (moment (date).format ('Do'));
  };

  const renderItem = ({item}) => {
    return (
      <BetItem
        itemData={item}
        itemInfo={itemData}
        onPress={() =>
          navigation.navigate ('CardItemDetails', {itemData: item})}
      />
    );
  };

  const renderImages = ({item}) => {
    return (
      <Avatar.Image size={24} style={styles.avatar} source={item.avatar} />
    );
  };

  const pressedAction = () => {
    setShowMore (!showMore);
  };

  return (
    <TouchableOpacity>

      <View style={styles.card}>

        <View style={styles.cardInfo}>

          <View style={{flexDirection: 'row'}}>

            <View
              style={{flex: 1, justifyContent: 'center', borderColor: '#CCC'}}
            >
              <Text style={styles.cardTime}>
                {getDay (itemData.topic_start_date)}
              </Text>
              <Text style={styles.cardTime}>
                {getMonth (itemData.topic_start_date)}
              </Text>
              <Text style={styles.cardTime}>
                {getYear (itemData.topic_start_date)}
              </Text>
            </View>

            <View style={{flex: 4}}>
              <Text numberOfLines={2} style={styles.cardCategory}>
                {itemData.topic_title}
              </Text>

              <Text style={styles.cardTitle}>{itemData.topic_question}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>

                <Text style={styles.cardDetails}>suggested by </Text>
                <Text style={styles.userText}>{itemData.username} </Text>
              </View>

            </View>
            {getRange (itemData.topic_start_date) < 0 || inPlay
              ? <View />
              : <PlayButton onPressed={onPress} />}
          </View>

          <View>
            {getRange (itemData.topic_start_date) < 0 || inPlay
              ? <View
                  style={{
                    backgroundColor: '#FF8C00',
                    margin: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      color: '#FFF',
                      fontSize: 16,
                    }}
                  >
                    Game Inprogress{' '}
                  </Text>
                </View>
              : <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={{textAlign: 'center'}}>starts in </Text>
                  <CountDown
                    size={15}
                    until={getRange (itemData.topic_start_date)}
                    onFinish={() => SetInPlay (true)}
                    digitStyle={{
                      backgroundColor: '#FFF',
                      borderWidth: 2,
                      borderColor: '#26AC79',
                    }}
                    digitTxtStyle={{color: '#26AC79'}}
                    timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                    separatorStyle={{color: '#26AC79'}}
                    timeToShow={['D', 'H', 'M', 'S']}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                  />
                </View>}
          </View>

          {itemData.bets_placed ||
            getRange (itemData.topic_start_date) < 0 ||
            inPlay == 0
            ? <View />
            : <View>
                <Divider style={{marginTop: 10, marginBottom: 10}} />

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <View style={{flex: 3, flexDirection: 'row'}}>

                    <ScrollView
                      horizontal
                      scrollEventThrottle={1}
                      showsHorizontalScrollIndicator={false}
                      height={50}
                      contentInset={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 10,
                      }}
                    >
                      {itemData.bets.map ((item, index) => (
                        <Avatar.Image
                          size={24}
                          style={styles.avatar}
                          source={{uri: item.avatar}}
                        />
                      ))}
                    </ScrollView>
                  </View>

                  <Text style={styles.cardPendingView}>
                    {itemData.bets_placed} pending players
                  </Text>
                  <TouchableOpacity
                    onPress={pressedAction}
                    style={{textAlign: 'right', flex: 1}}
                  >
                    <Icon
                      name="keyboard-arrow-down"
                      style={{textAlign: 'right', flex: 1}}
                      size={26}
                    />

                  </TouchableOpacity>
                </View>

                {showMore
                  ? <View style={styles.container}>
                      <FlatList
                        data={itemData.bets}
                        renderItem={renderItem}
                        keyExtractor={item => item.bt_id}
                      />
                    </View>
                  : <View />}
              </View>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopicCard;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
  },
  cardImgWrapper: {
    flex: 1,
  },
  avatar: {
    marginRight: 0,
    backgroundColor: '#999',
  },

  cardInfo: {
    flex: 1,
    margin: 3,
    padding: 10,
    borderWidth: 0,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  cardTime: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardPendingView: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 3,
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  userText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  cardCategory: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    fontWeight: 'bold',
  },
});
