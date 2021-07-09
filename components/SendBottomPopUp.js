import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import SubmitButton from './SubmitButton';
import utils from '../model/utils';

import StarRating from './StarRating';
import success from '../assets/success.png'
import fail from '../assets/fail.png'
import { AuthContext } from '../components/context';


const SendBottomPopUp = ({ amount, asset, assetIssuer, receiver, memo }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setComplete] = useState("");
    const { userData } = React.useContext(AuthContext);



    const submitBet = async () => {

        var signature = userData.user_id+amount*3333+receiver+memo+assetIssuer
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': userData.jwt },
            body: JSON.stringify({
                "user_id": userData.user_id,
                "asset_code": asset,
                "asset_issuer": assetIssuer,
                "amount": amount,
                "memo": memo,
                "receiver": receiver,
                "signature": signature
            })
        };
        console.log(signature)
        setIsLoading(true)



        try {

            const response = await fetch(utils.ENDPONT + 'user/make_transfer', requestOption);
            const json = await response.json();
            console.log(json)
            setIsLoading(false);
            const status = json.status;
            const message = json.message;
            if (status == 100) {
                Alert.alert("success", message);
            } else {
                Alert.alert("Failed", message);
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





            <View  >

                <Text style={styles.panelTitle}>Confirm Transaction</Text>

                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.answerHeader}>
                        Receiver Address:
                    </Text>
                    <Text style={styles.answer}>
                        {receiver}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.answerHeader}>
                        Sending Asset
                    </Text>
                    <Text style={styles.answer}>
                        {asset}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.answerHeader}>
                        Asset Issuer
                    </Text>
                    <Text style={styles.answer}>
                        {assetIssuer}
                    </Text>
                </View>


                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.answerHeader}>
                        Sending Amount
                    </Text>
                    <Text style={styles.answer}>
                        {amount}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.answerHeader}>
                        Memo
                    </Text>
                    <Text style={styles.answer}>
                        {memo}
                    </Text>
                </View>





                <SubmitButton onPressed={submitBet} isLoading={isLoading} text="Submit" />

            </View>






        </View>
    );
};

export default SendBottomPopUp;

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
        flex: 3,
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 5,
    },
    answerHeader: {
        flex: 2,
        fontSize: 14,
        color: 'gray',
        paddingTop: 5,
        paddingBottom: 5,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
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
