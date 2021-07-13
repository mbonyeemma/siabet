import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text, Dimensions,
  RefreshControl,
  Image,
  StyleSheet,Alert,
  StatusBar,
  TouchableOpacity, Button,
  ScrollView, FlatList
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '@react-navigation/native';
import Card from '../components/TopicCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from '../components/StarRating';
import SuccessModal from '../components/successModal'
import ModalTester from '../components/Modal'
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
import  utils from '../model/utils'

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
import { AuthContext } from '../components/context';





const HomeScreen = ({ navigation }) => {
  const { userData, setRequests,account,updateBalance} = React.useContext(AuthContext);

  const theme = useTheme();
  const refRBSheet = useRef();
  const [selectedCategory, setCategory] = useState('All');
  const [data, setData] = useState([]);
  const [isRefreshing, setRefresh] = useState(false);
  const [state, setState] = useState([]);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      load_account()
    });

    return () => {
      unsubscribe;
    };


  }, []);

 
  const load_account=()=>{
    get_account()
    get_categories()
  }
  const get_categories = async () => {
    setRefresh(true);
    try {
        const response = await fetch(utils.ENDPONT + 'bet/get_categories?q=home');
        const json = await response.json();
        console.log(json)
        setState(json);
        getFeed(selectedCategory);

    } catch (error) {
        console.error(error);
     }
};
 
 





const get_account = async () => {

 

  setRefresh(true);
  try {
      const response = await fetch(utils.HORIZON+'/accounts/'+userData.public_key);
      const json = await response.json();
      console.log(json)
      updateBalance(json)
  } catch (error) {
      console.error(error);
   }
};




 

  const getFeed = async (state) => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': utils.Auth },
    };
    setRefresh(true)
    try {
      const response = await fetch(utils.ENDPONT + 'bet/topics_feed/' + userData.user_id + '?q=' + state, requestOptions);
      const json = await response.json();
      console.log(json);
      setData(json);
      setRefresh(false);
      get_user_bets()
    } catch (error) {
      console.error(error);
      setRefresh(false);
    }
  };

  const get_user_bets = async () => {

    try {
      const response = await fetch(utils.ENDPONT + 'bet/get_requests/'+userData.user_id);
      const json = await response.json();
      console.log(json)
      console.log(json.length)

      setRequests(json.length)
       
    } catch (error) {
      console.error(error);
      setRefresh(false);
    }
  };


 

  const make_favorite = async (item) => {


    const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': userData.jwt },
        body: JSON.stringify({
            "user_id": userData.user_id,
            "category_name": item,
        })
    };
    console.log(requestOption)
    setRefresh(true);
  
  
  
    try {
  
        const response = await fetch(utils.ENDPONT + 'user/update_favorite', requestOption);
        const json = await response.json();
        console.log(json)
        getFeed(selectedCategory)
    
    } catch (error) {
        console.error(error);
        setRefresh(false);
    }
  
  };

  const renderCategories = ({ item }) => {
    return (
      <View>
        <View style={{ flexDirection: "row", flex: 1, alignContent: 'center', marginRight: 8, marginLeft: 8 }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: "bold", textAlign: 'center', alignSelf: "center" }}>{item.category_name}</Text>
          <TouchableOpacity onPress={()=>make_favorite(item.category_id)} style={{ marginLeft: 20, textAlign: 'center', alignSelf: "center" }}>
            <Ionicons color="#26AC79" name={item.isFavorite?"star":"star-outline"} size={24} />
          </TouchableOpacity>

        </View>
        <FlatList
          data={item.topics}
          renderItem={renderItem}
          keyExtractor={item => item.topics}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() => navigation.navigate('TopicItemDetail', { itemData: item })}
      />
    );
  };

 

  const changeCategory = (newState) => {
    setCategory(newState);
    getFeed(newState)
  };



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle={theme.dark ? 'light-content' : 'dark-content'} />



      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>




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
          contentContainerStyle={{
            paddingRight: Platform.OS === 'android' ? 20 : 0
          }}
        >
          {state.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => changeCategory(category.label)}
              style={(selectedCategory == category.label) ? styles.chipsItemSelected : styles.chipsItem} >
              <Text style={(selectedCategory == category.label) ? styles.textItemSelected : styles.textItem}  >{category.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>

 

        <View style={styles.cardsWrapper}>
          <FlatList
 refreshControl={
  <RefreshControl
    refreshing={isRefreshing}
    onRefresh={() => load_account()}
  />
}
            data={data}
            renderItem={renderCategories}
            keyExtractor={item => item.category_id}
          />



        </View>
     </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",

  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    width: '95%',
    marginBottom:60,
    alignSelf: 'center',
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
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  searchBox: {
    position: 'absolute',
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
  chipsScrollView: {
    marginTop: 10,
  },
  textItem: {
    color: "#000"
  },
  textItemSelected: {
    color: "#FFF"

  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: '#FFFF',
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
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
