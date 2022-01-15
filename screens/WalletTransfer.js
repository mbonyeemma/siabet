import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View, Image,

    StyleSheet, Platform, ScrollView} from 'react-native';

import { useTheme, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../components/context';
import SubmitButton from '../components/SubmitButton'
import SendBottomPopUp from '../components/SendBottomPopUp'

import RBSheet from "react-native-raw-bottom-sheet";



const WalletTransfer = () => {
    const refRBSheet = useRef();

    const { userData,account } = React.useContext(AuthContext);

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

    const [receiver, setReceiver] = React.useState('');
    const [memo, setMeMo] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [issuer, setIssuer] = React.useState('');
    const tokens = [
        {label:"XLM",value:"XLM"},
        {label:"SIA",value:"SIA"},
    ]
    const [data, setData] = React.useState(tokens);

    const ref_input2 = useRef();
    const ref_input3 = useRef();


    useEffect(() => {
        setItems(tokens)
    }, []);


    const get_issuer = (asset_code) => {
        console.log(account)
        try {
           var issuer = account.balances.find((b) => b.asset_code == asset_code).asset_issuer;
            console.log(issuer)
            setIssuer(issuer)

            return issuer;
        } catch (e) {
            console.log(e)

            return "";
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
                <View style={styles.cardInfod}>






                    <TextInput
                        mode="outlined"
                        label="Receiver Account"
                        placeholder="eg, GB4LHBRH53L..."
                        onSubmitEditing={() => ref_input2.current.focus()}
                        blurOnSubmit={false}
                        returnKeyType="next"
                        onChangeText={text => setReceiver(text)}

                    />

                    <Text style={[styles.text_footer, { color: colors.gray, marginTop: 8 }]}> </Text>


                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>

                            <TextInput
                                label="Enter amount"
                                mode="outlined"
                                keyboardType='numeric'
                                ref={ref_input2}
                                onSubmitEditing={() => ref_input3.current.focus()}
                                returnKeyType="next"
                                onChangeText={text => setAmount(text)}
                            />
                        </View>

                        <View style={{ flex: 1, marginTop: 6, marginLeft: 10, alignItems: 'center', alignSelf: 'center' }}>

                            <DropDownPicker
                                style={{ height: 57, }}
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

                    <Text style={[styles.text_footer, { color: colors.gray, marginTop: 8 }]}></Text>
                    <TextInput
                        label="Memo"
                        mode="outlined"
                        ref={ref_input3}
                        onChangeText={text => setMeMo(text)}

                    />

                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        height={400}
                    >
            <SendBottomPopUp refRBSheet={refRBSheet} amount={amount} asset={value} assetIssuer={issuer} receiver={receiver} memo={memo} />

                    </RBSheet>

                    <View style={{ marginTop: 20 }}>


                        <SubmitButton isLoading={isSending} onPressed={() => {get_issuer(value); refRBSheet.current.open()}} text="Next" />

                    </View>

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
