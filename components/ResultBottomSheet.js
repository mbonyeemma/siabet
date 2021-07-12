import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import PlayButton from './PlayButton';
import utils from '../model/utils';

import StarRating from './StarRating';
import success from '../assets/success.png'
import Note from './Note'
import { AuthContext } from './context';


const ResultBottomSheet = ({refRBSheet, itemData, GameStatus }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [betChoice, setChoice] = useState(false);

    const { userData } = React.useContext(AuthContext);



    const submitBet = async () => {

        console.log(itemData)

        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': userData.jwt },
            body: JSON.stringify({
                "posted_by": userData.user_id,
                "topic_id": itemData.topic_id,
                "final_result": betChoice,
                "game_status": GameStatus
            })
        };
        console.log(requestOption)
        setIsLoading(true)



        try {

            const response = await fetch(utils.ENDPONT + 'bet/execute_bets', requestOption);
            const json = await response.json();
            console.log(json)
            setIsLoading(false);
            const status = json.status;
            const message = json.message;
            refRBSheet.current.close()

            if (status == 100) {
                Alert.alert("success", message);
            } else {
                Alert.alert("failed", message);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }

    };
    const getString = () => {
        return "Play for a return of " + $itemData.stake_amount * 2
    }

    return (
        <View style={styles.panel}>



            <View style={{ alignItems: 'center' }}>

                <Text style={styles.panelTitle}>Game result</Text>
                <Text style={styles.panelSubtitle}>
                    {itemData.topic_question}
                </Text>
               


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
            <Note onPress={()=>console.log("here")} text="Please enter the correct final result of the game. Be sure that it's correct." />

            <PlayButton onPressed={submitBet} isLoading={isLoading} headerText="Submit Result" subHeader={`Confirm status ${GameStatus} `} />



        </View>




    );
};

export default ResultBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    betChoice: { backgroundColor: '#D3D3D3', borderRadius: 50, padding: 15 },
    betChoiceSelected: { backgroundColor: '#26AC79', borderRadius: 50, padding: 15 },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    title:{
        marginTop:20,
        marginBottom:20,

    },

    categoryTitle: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center'
    },
    answer: {
        fontSize: 20,
        color: '#000',
        paddingTop: 5,
        paddingLeft: 5,
        fontWeight: 'bold',
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
