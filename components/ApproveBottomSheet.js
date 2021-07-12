import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import PlayButton from './PlayButton';
import utils from '../model/utils';

import StarRating from './StarRating';
import success from '../assets/success.png'
import fail from '../assets/fail.png'
import { AuthContext } from '../components/context';


const ApproveBottomSheet = ({ refRBSheet, itemData, Option}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = React.useContext(AuthContext);

 
 
  const submitBet = async () => {

    console.log(itemData)

    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': userData.jwt },
      body: JSON.stringify({
        "approved_by": userData.user_id,
        "topic_id": itemData.topic_id,
        "approval_status": Option,
       
      })
    };
    console.log(requestOption)
    setIsLoading(true)



    try {
 
      const response = await fetch(utils.ENDPONT + 'bet/approve_topic', requestOption);
      const json = await response.json();
      console.log(json)
      setIsLoading(false);
      const status = json.status;
      const message = json.message;
      refRBSheet.current.close()

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

   
      
      
      
      <View style={{ alignItems: 'center' }}>

        <Text style={styles.panelTitle}>Update Topic</Text>
        <Text style={styles.panelSubtitle}>
          {itemData.topic_question}
        </Text>

        <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
          <Text style={styles.answerHeader}>
            Action:
          </Text>
          <Text style={styles.answer}>
            {Option}
          </Text>
        </View>

    



        <PlayButton onPressed={submitBet} isLoading={isLoading} headerText="Submit" subHeader={`Confirm status ${Option} `} />

      </View>



 
    </View>
  );
};

export default ApproveBottomSheet;

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
