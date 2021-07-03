import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View, Image,
    TextInput,
    StyleSheet, Platform, ScrollView, Alert
} from 'react-native';

import { useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Note from '../components/Note.js'
import PlayButton from '../components/PlayButton.js'
import calender from '../assets/calender.png'
import DropDownPicker from 'react-native-dropdown-picker';
import utils from '../model/utils'
import { Root, Popup, Toast } from 'popup-ui'
import { AuthContext } from '../components/context';


const WalletTransfer = () => {
    const { userData } = React.useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSending, setSending] = useState(false);
    const [items, setItems] = useState([]);

    const { colors } = useTheme();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateTime, setTimeStamp] = useState('');
    const [league, setLeague] = React.useState('');
    const [question, setQuestion] = React.useState('');

    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const submitData = async () => {
        if (value == "" || league == "" || question == "") {
            return Alert.alert("Error", "please fill all the fields");
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': userData.jwt },
            body: JSON.stringify({
                "user_id": userData.user_id,
                "topic_title": league,
                "topic_type_id": "2",
                "topic_question": question,
                "topic_start_date": "2021-06-29 15:00:50",
                "topic_category_id": value
            })
        };
        setSending(true)
        try {
            const response = await fetch(utils.ENDPONT + 'bet/create_topic', requestOptions);
            const json = await response.json();
            setSending(false);

            console.log(json);
            const status = json.status
            const message = json.message
            if (status == 100) {
                Alert.alert("success", message)
            } else {
                Alert.alert("failed", message)

            }

        } catch (error) {
            console.error(error);
            setSending(false);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        if (mode == "date") {
            setTimeStamp(currentDate)
            showMode('time');
        } else {
            var currentTimeStamp = dateTime
            currentTimeStamp = currentTimeStamp + "" + currentDate
            setTimeStamp(currentTimeStamp)

            console.log(currentTimeStamp)
        }

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };

    const showTimepicker = () => {
        showMode('time');
    };

    const ShowSuccess = () => {
        Toast.show({
            title: 'User created',
            text: 'Your user was successfully created, use the app now.',
            color: '#2ecc71',
            timing: 2000,
            icon: (
                <Image
                    source={require('../assets/fail.png')}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                />
            ),
        })
    }


    return (
        <ScrollView style={{ backgroundColor: '#F1F1F1' }}>
            <View style={styles.container}>
                <View style={styles.cardInfo}>







                    <Text style={[styles.text_footer, { color: colors.gray, marginTop: 8 }]}> Receiver Address</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="eg, GB4LHBRH53LPXIVUEEBA2DA3S36HWU4VJGZ4CVYERFVA4ZAG47IX4SGW"
                            onSubmitEditing={() => ref_input2.current.focus()}
                            blurOnSubmit={false}
                            returnKeyType="next"
                            onChangeText={text => setLeague(text)}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                        />
                    </View>

                    <Text style={[styles.text_footer, { color: colors.gray, marginTop: 8 }]}> Enter amount</Text>


                    <View style={{ flex: 1,   flexDirection: 'row' }}>

                        <View style={{ flex: 2,borderColor:'#000',borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1 }}>

                       

                        <TextInput
                            placeholder="Amount"
                            ref={ref_input2}
                            onChangeText={text => setQuestion(text)}
                            style={{ color: colors.text, flex: 1, width: '60%' }}
                        />
                         </View>
                         <View style={{ flex: 1 }}>


                        <DropDownPicker
                            loading={loading}
                            disableBorderRadius={true}
                            open={open} 
                            placeholder="..."
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            listMode="MODAL"
                          
                        />
                         </View>
                    </View>

                    <Text style={[styles.text_footer, { color: colors.gray, marginTop: 8 }]}>Memo</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="MeMo"
                            onSubmitEditing={() => ref_input2.current.focus()}
                            blurOnSubmit={false}
                            returnKeyType="next"
                            onChangeText={text => setLeague(text)}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                        />
                    </View>






                    <PlayButton isLoading={isSending} onPressed={submitData} headerText="Send" />

                </View>
            </View>


        </ScrollView>


    );
};

export default WalletTransfer;

const styles = StyleSheet.create({
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
        fontSize: 18
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
