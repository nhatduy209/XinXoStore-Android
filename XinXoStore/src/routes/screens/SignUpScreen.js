import React from 'react';
import {View,Text,Image,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';
import ButtonPrimary from '../../Configs/ButtonPrimary';
import ButtonExtension from '../../Configs/ButtonExtension';
import LogoGoogle from '../../images/logo/google.png';
import LogoFacebook from '../../images/logo/facebook.png';

export default class SignUpScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:''
        }
    }
    textChangeHandler(value,type){
        switch(type){
            case 'username':
                this.setState({username:value});
                break;
            case 'password':
                this.setState({password:value});
                break;
            case 'email':
                this.setState({email:value});
        }
    }
    textOutput(){
        return (
            this.state.username+' ' +this.state.email+' '+ this.state.password
        );
    }
    render(){
        return(
            <View style={{backgroundColor:'#fcf8ee',height:'100%'}}>
                {/* sign up area */}
                <View style={styles.Container}>
                    <Text style={styles.HeaderText}>Sign Up</Text>
                    <View>
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Username"
                            onChangeText={value=>this.textChangeHandler(value,'username')}/>
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Email"
                            onChangeText={value=>this.textChangeHandler(value,'email')}/>
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Password"
                            onChangeText={value=>this.textChangeHandler(value,'password')}/>
                        
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
                        <ButtonPrimary />
                    </View>               
                </View>
                 {/* sign up with google or facebook */}
                <View>
                    <View style={styles.ExtensionContainer}>
                            <ButtonExtension text="Google" logo={LogoGoogle}/>
                            <ButtonExtension text="Facebook" logo={LogoFacebook}/>
                    </View>
                </View>
                {/* sign in link  */}
                <View style={styles.SignInLink}>
                    <Text style={styles.GrayText}>
                        Already have an account?  
                    </Text>
                    <Text style={{color:'#638adf',fontWeight:'bold',fontSize:18}}>
                        Sign in
                    </Text>
                </View>
                <Text>
                    result: {this.textOutput()}
                </Text>
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
    TextPolicy:{
        alignItems:'center',
        marginBottom:20
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