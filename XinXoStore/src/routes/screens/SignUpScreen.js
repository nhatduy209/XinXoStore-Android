import React from 'react';
import {View,Text,Image,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';

export default class SignUpScreen extends React.Component{
    // constructor(prop){
    //     super(props);
    //     this.state={
    //         username:'',
    //         password:'',
    //         email:''
    //     }
    // }

    render(){
        return(
            <View style={{backgroundColor:'#fcf8ee',height:'100%'}}>
                {/* sign up area */}
                <View style={styles.Container}>
                    <Text style={styles.HeaderText}>Sign Up</Text>
                    <View>
                        <TextInput  style={styles.TextInput}
                            placeholder="Email"/>
                        <TextInput  style={styles.TextInput}
                            placeholder="Password"/>
                        <TextInput  style={styles.TextInput}
                            placeholder="Phone"/>
                        <View style={styles.ButtonSignUp}>
                            <TouchableOpacity  >
                                <Text
                                    style={styles.TextSignUp}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.TextPolicy}>
                            <Text 
                                style={{color:'gray'}}>
                                By clicking this button, you agree with our
                            </Text>
                            <Text
                                style={{color:'#638adf',fontWeight:'bold'}}>
                                Terms and Conditions
                            </Text>
                        </View>
                        
                    </View>               
                </View>

                {/* sign up with google or facebook */}
                <View>
                    <View style={styles.ExtensionContainer}>
                            <TouchableOpacity style={styles.ButtonExtension} >
                                <Image style={{height:20,width:20}} source={require('../../images/logo/google.png')} />
                                <Text
                                    style={styles.TextExtension}>
                                    Google
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ButtonExtension} >
                                <Image style={{height:20,width:20}} source={require('../../images/logo/facebook.png')} />
                                <Text
                                    style={styles.TextExtension}>
                                    Facebook
                                </Text>
                            </TouchableOpacity>
                    </View>
                </View>
                {/* sign in link */}
                <View style={styles.SignInLink}>
                    <Text style={styles.GrayText}>
                        Already have an account?  
                    </Text>
                    <Text style={{color:'#638adf',fontWeight:'bold',fontSize:18}}>
                        Sign in
                    </Text>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    GrayText:{
        color:'gray',
        fontSize:18
    },
    Container:{
        // flex:1,
        height:400,
        alignItems:'center',
        display:'flex',
        borderRadius:30,
        flexDirection:'column',
        margin:20,
        backgroundColor:'#fff'
    },
    HeaderText:{
        fontSize:30,
        fontWeight:"bold",
        color:'#232848',
        marginTop:10,
        letterSpacing:1
    },
    TextInput:{
        padding:0,
        margin:0,
        fontSize:18,
        flex:0.28,
        width:350,
        borderBottomWidth: 1,
        borderBottomColor: '#d2d2d2',
        marginBottom:15
    },
    TextSignUp:{
        color:'#fff',
        textAlign: 'center', 
        fontSize: 20, 
        paddingVertical: 15,
        fontWeight:'bold',
        letterSpacing:1
    },
    ButtonSignUp:{
        backgroundColor:'#638adf',
        borderWidth:0,
        borderRadius:30,
        marginTop:15,
        marginBottom:15,
        
    },
    TextPolicy:{
        alignItems:'center',
        marginBottom:20
    },
    //extension
    TextExtension:{
        color:'gray',
        fontWeight:'bold',
        fontSize:18,
        textAlign: 'center', 
        paddingVertical: 15,
        fontWeight:'bold',
        letterSpacing:1,
        marginHorizontal:10
    },
    ButtonExtension:{
        backgroundColor:'#fff',
        borderWidth:0,
        borderRadius:30,
        marginTop:15,
        marginBottom:15,
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        flex:1
    },
    ExtensionContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginHorizontal:20
    },
    SignInLink:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
        
    }
});