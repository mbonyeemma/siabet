import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View, Image,
    TextInput,
    StyleSheet, Platform, ScrollView
} from 'react-native';

import { useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Note from '../components/Note.js'
import calender from '../assets/calender.png'



const createPublicTopic = () => {

    const { colors } = useTheme();
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateTime, setTimeStamp] = useState(new Date(1598051730000));

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




    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.cardInfo}>




                    <Text style={[styles.text_footer, { color: colors.text, marginTop: 8 }]}> Topic's Category</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Select category"

                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                        />
                    </View>

                    <Text style={[styles.text_footer, { color: colors.text, marginTop: 8 }]}> Topic's title</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="eg, Premier League"

                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                        />
                    </View>
                    <Text style={[styles.text_footer, { color: colors.text, marginTop: 8 }]}> Topic's Question</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="eg, Will Chealse beat Arsenal?"

                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                            ]}
                        />
                    </View>

                    <Text style={[styles.text_footer, { color: colors.text, marginTop: 8 }]}> Start date and time</Text>
                    <View style={[styles.action, { flex: 1, flexDirection: 'row' }]}>
                        <TextInput
                            placeholder="Start date and time"
                            autoCorrect={false}
                            value={dateTime}
                            style={[
                                styles.textInput,
                                {
                                    color: colors.text, flex: 1
                                },
                            ]}
                        />
                        <TouchableOpacity onPress={showDatepicker} >
                            <Image source={calender} style={{ width: 35, height: 35 }} />

                        </TouchableOpacity>

                    </View>

                    <View>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <Note text="Note: When submitting a bet topic, the final result must be one of Yes or No, so make sure that you question can be answered by that. Once your suggestion has been approved, you will be awarded with 1K SIA." />



                    <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
                        <Text style={styles.panelButtonTitle}>Submit for review</Text>
                        <Text style={styles.panelButtonInfo}>500 SIA submission fee</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </ScrollView>


    );
};

export default createPublicTopic;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        elevation: 6
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
