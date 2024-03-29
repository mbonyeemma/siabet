import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Note from '../components/Note.js';
import PlayButton from '../components/PlayButton.js';
import calender from '../assets/calender.png';
import DropDownPicker from 'react-native-dropdown-picker';
import utils from '../model/utils';
 import {AuthContext} from '../components/context';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SubmitButton from '../components/SubmitButton'
import moment from 'moment';
const createPublicTopic = () => {
  const {userData} = React.useContext (AuthContext);
  const [visible, setVisible] = React.useState (false);

  const showModal = () => setVisible (true);
  const hideModal = () => setVisible (false);
  const [open, setOpen] = useState (false);
  const [value, setValue] = useState (null);
  const [utcDate, setUTCDate] = useState (null);

  const [loading, setLoading] = useState (false);
  const [isSending, setSending] = useState (false);
  const [items, setItems] = useState ([]);

  const {colors} = useTheme ();
  const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState ('date');
  const [show, setShow] = useState (true);
  const [displayDate, setDisplayDate] = useState ('');
  const [league, setLeague] = React.useState ('');
  const [question, setQuestion] = React.useState ('');

  const ref_input2 = useRef ();
  const ref_input3 = useRef ();
  useEffect (() => {
    getRequests ();
  }, []);
  const getRequests = async () => {
    setLoading (true);
    try {
      const response = await fetch (
        utils.ENDPONT + 'bet/get_categories?q=topic'
      );
      const json = await response.json ();
      setLoading (false);
      console.log (json);
      setItems (json);
    } catch (error) {
      console.error (error);
      setLoading (false);
    }
  };
  const formatTime = ()=>{
    const fdate = moment(date).utc().format();
    console.log(fdate)
    const local = moment.utc(date).local().format();
    console.log(local)

   const d =  moment(date).format('MMMM Do, yyyy H:mma')

    setUTCDate(fdate)
    setDisplayDate(d)
    setVisible(false)

}
  const submitData = async () => {
    if (value == '' || league == '' || question == '') {
      return Alert.alert ('Error', 'please fill all the fields');
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userData.jwt,
      },
      body: JSON.stringify ({
        user_id: userData.user_id,
        topic_title: league,
        topic_type_id: '2',
        topic_question: question,
        topic_start_date: date,
        topic_category_id: value,
      }),
    };
    setSending (true);
    try {
      const response = await fetch (
        utils.ENDPONT + 'bet/create_topic',
        requestOptions
      );
      const json = await response.json ();
      setSending (false);

      console.log (json);
      const status = json.status;
      const message = json.message;
      if (status == 100) {
        Alert.alert ('success', message);
      } else {
        Alert.alert ('failed', message);
      }
    } catch (error) {
      console.error (error);
      setSending (false);
    }
  };

   

  const showMode = currentMode => {
    setShow (true);
    setMode (currentMode);
  };



  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20};
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cardInfo}>

          <Text
            style={[styles.text_footer, {color: colors.gray, marginTop: 8}]}
          >
            {' '}Sport Category
          </Text>
          <View style={styles.action}>

            <DropDownPicker
              loading={loading}
              open={open}
              placeholder="Select a category"
              value={value}
              items={items}
              searchable={true}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              dropDownContainerStyle={{
                backgroundColor: '#000',
              }}
            />
          </View>

          <Text
            style={[styles.text_footer, {color: colors.gray, marginTop: 8}]}
          >
            {' '}Game League
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="eg, Premier League"
              onSubmitEditing={() => ref_input2.current.focus ()}
              blurOnSubmit={false}
              returnKeyType="next"
              onChangeText={text => setLeague (text)}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <Text
            style={[styles.text_footer, {color: colors.gray, marginTop: 8}]}
          >
            {' '}Bet Question
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="eg, Will Chealse beat Arsenal?"
              ref={ref_input2}
              onChangeText={text => setQuestion (text)}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>

          <Text
            style={[styles.text_footer, {color: colors.gray, marginTop: 8}]}
          >
            
          </Text>
          <View style={[styles.action, {flex: 1, flexDirection: 'row'}]}>
            <TextInput
              placeholder="Start date and time"
              value={displayDate}

              style={[
                styles.textInput,
                {
                  color: colors.text,
                  flex: 1,
                },
              ]}
            />
            <TouchableOpacity  onPress={()=>setVisible(true)}  >
              <Image source={calender} style={{width: 35, height: 35}} />

            </TouchableOpacity>

          </View>

          
          <Note text="Note: When submitting a bet topic, the final result must be one of Yes or No, so make sure that you question can be answered by that. Once your suggestion has been approved, you will be awarded with 500 SIA." />

          <PlayButton
            isLoading={isSending}
            onPressed={submitData}
            headerText="Submit for review"
            subHeader="100 SIA submission fee"
          />

          <Portal>
            <Modal
              visible={visible}
              overlayAccessibilityLabel = "hide"
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
                <View>
                <View style={{alignItems:'flex-end'}}>
                <Ionicons onPress={()=>setVisible(false)}  name="ios-close-circle-outline" size={26} />
                </View>
                <Note text="Select the date and time this game will start in your localtime." />
                
                <DatePicker
                minimumDate = {new Date()}
                mode="datetime"
                date={date}
                onDateChange={setDate}
                androidVariant="nativeAndroid"
              />
              <SubmitButton text="Done" onPressed={formatTime}/>
             
             
               

              

                </View>

             

            </Modal>
          </Portal>
          

        </View>
      </View>

    </ScrollView>
  );
};

export default createPublicTopic;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    margin: 16,
    elevation: 6,
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

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#26AC79',
    alignItems: 'center',
    marginTop: 10,
  },
  text_footer: {
    fontSize: 18,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
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
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelButtonInfo: {
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
    fontSize: 16,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
