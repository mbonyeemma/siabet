import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import PlayButton from './PlayButton';
import utils from '../model/utils';

import StarRating from './StarRating';
import success from '../assets/success.png'
import fail from '../assets/fail.png'
import { AuthContext } from '../components/context';


const Card = ({ itemData, PlayerChoice, amount, betChoice, isMatchingBet,Opponent ,OpponentBetId}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setComplete] = useState("");
  const { userData } = React.useContext(AuthContext);

  var userChoice = betChoice
  var stake_amount = itemData.stake_amount
  if (isMatchingBet) {
    if (betChoice == "Yes") {
      userChoice = "No"
    } else {
      userChoice = "Yes"
    }
  }else{
    amount = amount.replace("K", "000");

  }


  const submitBet = async () => {

    console.log(itemData)

    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': userData.jwt },
      body: JSON.stringify({
        "user_id": userData.user_id,
        "opponent_bet_id": OpponentBetId,
        "topic_id": itemData.topic_id,
        "bet_type": PlayerChoice,
        "opponent_user_id": Opponent,
        "stake_amount": amount,
        "asset_code": "SIA",
        "answer": userChoice
      })
    };
    console.log(requestOption)
    setIsLoading(true)



    try {
 
      const response = await fetch(utils.ENDPONT + 'bet/place_bet', requestOption);
      const json = await response.json();
      console.log(json)
      setIsLoading(false);
      const status = json.status;
      const message = json.message;
      if (status == 100) {
        Alert.alert("success",message);
      } else {
        Alert.alert("failed",message);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }

  };
 

  return (
    <View style={styles.panel}>

      {isComplete!=""?<View style={{flex:1,alignContent:'center'}}>
        <Image source={success} style={{width:100,height:100,marginBottom:30,alignItems:'center'}}/>
        <Text style={styles.panelTitle}>Success</Text>
        <Text style={styles.answerHeader}>Your bet has been placed, sit back, relax and wait for the game results.</Text>

      </View>:
      
      
      
      <View style={{ alignItems: 'center' }}>

        <Text style={styles.panelTitle}>Place Bet</Text>
        <Text style={styles.panelSubtitle}>
          {itemData.topic_question}
        </Text>

        <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
          <Text style={styles.answerHeader}>
            Your choice:
          </Text>
          <Text style={styles.answer}>
            {userChoice}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.answerHeader}>
            Possible return:
          </Text>
          <Text style={styles.answer}>
            {amount*2} SIA
          </Text>
        </View>



        <PlayButton onPressed={submitBet} isLoading={isLoading} headerText="Play" subHeader={`Confirm to stake ${amount} SIA`} />

      </View>





  }
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  answer: {
    fontSize: 20, 
    color: '#000',
    paddingTop: 5,
    paddingLeft: 5,
    fontWeight:'bold',
    paddingBottom: 10
  },
  answerHeader: {
    fontSize: 20, 
    color: 'gray',
    paddingTop: 5,
    paddingBottom: 5,
    },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    padding: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#26AC79',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
