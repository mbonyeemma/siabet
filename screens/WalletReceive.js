import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Share, StyleSheet, ToastAndroid, Linking, Image, TouchableOpacity } from 'react-native';
import {
    Caption, Text, Snackbar
} from 'react-native-paper';

import { AuthContext } from '../components/context';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';
import { block } from 'react-native-reanimated';
import Clipboard from '@react-native-clipboard/clipboard';

const WalletReceive = (navigation) => {
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const { userData, account } = React.useContext(AuthContext);

    const [image, setImageUri] = useState('');
    const copyToClipboard = () => {
        setVisible(true)
        Clipboard.setString(userData.public_key);

    };

    const ShareItem = async () => {
        try {
            const result = await Share.share({
                title: 'Account',
                message: userData.public_key
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };




    return (
        <SafeAreaView style={styles.container}>
 <Snackbar
        visible={visible}
        duration = {20}
        onDismiss={onDismissSnackBar}
         >
        copied to clicpboard!
      </Snackbar>
            <View>
                <Text style={styles.text}>Your account address</Text>
                <Text style={styles.textHeader} >{userData.public_key}</Text>
            </View>


            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>

                <QRCode
                    size={200}
                    value={userData.public_key}
                    logoBackgroundColor='#FFF'
                />




            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 16 }} >
                <TouchableOpacity onPress={ShareItem} style={styles.button}>
                    <Text style={styles.shareButton}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={copyToClipboard} style={styles.buttonCopy}>
                    <Text style={styles.shareButton}>Copy</Text>
                </TouchableOpacity>
            </View>
            <View >
                <Text style={styles.text}>Only send stellar assets to this address. You can send XLM or SIA token to this address. Incase sending SIA token fails, please ensure that you have added the SIA token trustline to your wallet. For more about truslines,</Text>

                <Text style={[styles.text, styles.TextStyle]} onPress={() => Linking.openURL('https://developers.stellar.org/docs/issuing-assets/anatomy-of-an-asset/')} >Read the stellar documentation.</Text>


            </View>







        </SafeAreaView>
    );
};

export default WalletReceive;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F1F1F1',
    },
    button: {
        backgroundColor: "#26AC79",
        flex: 1,
        padding: 16,
        borderRadius: 8
    },
    buttonCopy: {
        backgroundColor: "gray",
        padding: 16,
        marginLeft: 20,
        flex: 1,
        borderRadius: 8
    },
    shareButton: {
        color: "#FFF",
        textAlign: 'center',
        fontSize: 16
    },
    TextStyle: {

        color: '#E91E63',
        textDecorationLine: 'underline'

    },
    text: {
        fontSize: 16
    },

    textHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    }

});
