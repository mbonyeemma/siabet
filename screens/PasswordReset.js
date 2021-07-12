import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { useTheme, Button,ActivityIndicator,Colors } from 'react-native-paper';

import { AuthContext } from '../components/context';
import SubmitButton from '../components/SubmitButton'
import Users from '../model/users';
import utils from '../model/utils';

const PasswordReset = ({ navigation }) => {
    const { signUp } = React.useContext(AuthContext);
 
    const [loading, setIsLoading] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState(false)
    const { colors } = useTheme();


 
  
    const postInfo = async () => {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": username,
                "email": email,
            })
        };
        console.log(requestOptions)
        setIsLoading(true)



        try {
            console.log(requestOptions)

            const response = await fetch(utils.ENDPONT + 'user/password_reset_init', requestOptions);
            const json = await response.json();
            console.log(json)
            const status = json.status;
            const message = json.message;
            if (status == 100) {
                setIsLoading(false);
                navigation.navigate('PasswordResetConfirm', { username: username })
            } else {
                setIsLoading(false);
                Alert.alert("Failed", message);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            Alert.alert("Failed", "connection error");

        }

    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#26AC79' barStyle="light-content" />
            <View style={styles.header}>
            <Text style={styles.text_header}>Reset Password</Text>
            <Text style={{color:"#FFF"}}>Enter your username and email. we will send you a code to your email</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}> </Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => setUsername(val)}
                    />
          
                </View>
                


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 8
                }]}> </Text>
                <View style={styles.action}>
                    <Feather
                        name="mail"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => setEmail(val)}
                    />
                   
                </View>
              


      
                <View  style={{marginTop:20}}>
               
                <SubmitButton text="Request Code"  onPressed={postInfo} isLoading={loading} />

                <TouchableOpacity
                        onPress={() => navigation.navigate('SignInScreen')}
                        style={[styles.signUp, {
                            borderColor: '#26AC79',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#26AC79'
                        }]}>Back to Login</Text>
                    </TouchableOpacity>

                 

                    
                                      
                </View>
            </Animatable.View>
        </View>
    );
};

export default PasswordReset;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#26AC79'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#26AC79'
    },
    signUp:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth:4,
        borderColor:'#26AC79'
    },
    textSign: {
        fontSize: 16,
    }
});
