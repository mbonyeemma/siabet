
import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const PlayButton = ({ headerText, subHeader, onPressed, isLoading }) => {
    return (
        <View>
            {isLoading ? <View style={styles.commandButtonDisabled}  >
                <ActivityIndicator size='large' animating={isLoading} color="white" />
            </View > :

                <TouchableOpacity style={styles.commandButton} onPress={onPressed} >
                    <Text style={styles.panelButtonTitle}>{headerText}</Text>
                    <Text style={styles.panelButtonInfo}>{subHeader}</Text>
                </TouchableOpacity>}
        </View>

    );
};


export default PlayButton;


const styles = StyleSheet.create({
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#26AC79',
        alignItems: 'center',
        marginTop: 10,
    },
    commandButtonDisabled: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#9bd9b0',
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
