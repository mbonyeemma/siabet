import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet, Alert,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme, Avatar, Divider } from 'react-native-paper';
import { Modal, Portal, Button, Provider } from 'react-native-paper';

import { block } from 'react-native-reanimated';
import PlayButton from '../components/PlayButton.js'
import ContactsComponent from '../components/contactsComponent.js'
import utils from '../model/utils';
import BottomSheetUI from '../components/BottomSheetUI'

import RBSheet from "react-native-raw-bottom-sheet";
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 250;

const CardItemDetails = ({ route }) => {
  const refRBSheet = useRef();

  const itemData = route.params.itemData;
  const navTitleView = useRef(null);
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', flex: 1, marginTop: 20, padding: 20 };


  const initialMapState = {
    amounts: ['100', '500', '1K', '5K', '10K', '50K', '100K', '500K', '1000K'],
  };

  const [state, setState] = useState(initialMapState);
  const [selectedAmount, setAmount] = useState('');
  const [betChoice, setChoice] = useState('');
  const [playerChoice, setPlayer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [opponentId, setOpponentId] = useState('');
  
  const selectComponent = () => {
    setPlayer("Opponent")
    showModal();
  }

  const submitBet = async () => {
   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': utils.Auth },
      body: JSON.stringify({
        "user_id": "77f845bc-d8c1-11eb-b271-5820b1dbe674",
        "topic_id": itemData.topic_id,
        "bet_type": playerChoice,
        "opponent_user_id": "",
        "stake_amount": edited_stake_amount,
        "asset_code": "SIA",
        "answer": betChoice
      })
    };
    setIsLoading(true)




  };






  return (

    <ScrollView style={styles.container}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <ContactsComponent />
        </Modal>
      </Portal>


      <View style={{ backgroundColor: "#F1F1F1" }}>

        <View style={styles.titleContainer}>
          <Text style={styles.imageTitle}>{itemData.topic_question}</Text>

          <Text style={{ padding: 20 }}>Date: {itemData.topic_start_date}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 10, maxWidth: 200 }}>
              <TouchableOpacity onPress={() => setChoice("Yes")} style={(betChoice == 'Yes') ? styles.betChoiceSelected : styles.betChoice}>
                <Text style={styles.categoryTitle}>Yes</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 10, maxWidth: 200 }}>


              <TouchableOpacity onPress={() => setChoice("No")} style={(betChoice == 'No') ? styles.betChoiceSelected : styles.betChoice}>
                <Text style={styles.categoryTitle}>No </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <View style={{ padding: 16, flex: 1, backgroundColor: "#fff", marginTop: 15 }}>

          {betChoice == "" ? <View style={{ flex: 1, marginTop: '40%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 20, color: colors.gray }}>Select Yes or No above to start playing</Text>
          </View> : <View style={{ flex: 1 }}>

            {betChoice != "" ? <View>
              <Text style={styles.title}>How much SIA do you stake for your choice?</Text>

              <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.chipsScrollView}
                contentInset={{ // iOS only
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 20
                }}

              >
                {state.amounts.map((amount, index) => (
                  <TouchableOpacity key={index} onPress={() => setAmount(amount)}

                    style={(selectedAmount == amount) ? styles.chipsItemSelected : styles.chipsItem} >
                    <Text style={(selectedAmount == amount) ? styles.textItemSelected : styles.textItem}  >{amount}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Divider style={{ marginTop: 5, marginBottom: 10 }} />
            </View> : <View></View>}

            {selectedAmount == "" ? <View></View> : <View >
              <Text style={styles.title}>Who are you going to play against?</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => setPlayer("random")} style={(playerChoice == 'random') ? styles.playerChoiceSelected : styles.playerChoice}>
                  <Text style={{ color: '#FFF' }} >Random Player </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectComponent} style={(playerChoice == 'Opponent') ? styles.playerChoiceSelected : styles.playerChoice}>
                  <Text style={{ color: '#FFF' }}  >Select Opponent </Text>
                </TouchableOpacity>
              </View>
              <Divider style={{ marginTop: 15, marginBottom: 10 }} />
            </View>}

            {playerChoice == "" ? <View></View> :
              <View style={{ marginTop: 10, marginBottom: 10 }} >
                <Text style={styles.title}>You are playing random user for {selectedAmount} SIA</Text>
                <PlayButton  onPressed={() => refRBSheet.current.open()}  headerText="Play" subHeader="Possible return 2K SIA" />

              </View>}
          </View>
          }

          {isLoading ? <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={320}
          >
            <BottomSheetUI Opponent={opponentId} isMatchingBet={false} itemData={itemData} PlayerChoice={playerChoice} amount={selectedAmount} betChoice={betChoice} />
          </RBSheet>
            : <View></View>}





        </View>



      </View>
    </ScrollView>
  );
};

export default CardItemDetails;

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  playerChoiceSelected: { backgroundColor: '#26AC79', marginTop: 15, borderRadius: 50, padding: 15 },
  playerChoice: { backgroundColor: '#D3D3D3', marginTop: 15, borderRadius: 50, padding: 15 },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  betChoice: { backgroundColor: '#D3D3D3', borderRadius: 50, padding: 15 },
  betChoiceSelected: { backgroundColor: '#26AC79', borderRadius: 50, padding: 15 },
  name: {
    fontWeight: 'bold',
  },
  chipsScrollView: {
    marginTop: 15
  },
  amountItem: { backgroundColor: '#D3D3D3', padding: 10, borderRadius: 10 },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    color: "#FFF",
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 2,
    height: 35,
    elevation: 5,
  },
  chipsItemSelected: {
    flexDirection: "row",
    backgroundColor: '#26AC79',
    borderRadius: 20,
    color: "#FFF",
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 2,
    height: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderColor: '#000',
    elevation: 10,
  },
  textItem: {
    color: "#000"
  },
  textItemSelected: {
    color: "#FFF"

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  }, categoryTitle: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center'
  },
  titleContainer: {
    flex: 1,
    minHeight: 200,
    margin: 10,
    elevation: 5,
    margin: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: 24,
    textAlign: 'center'
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});
