import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Login} from '../redux/action/LoginAction/LoginAction'
import { connect } from 'react-redux';
import { Status } from '../Config/dataStatus';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import Authentication  from '../Config/Component/Authentication';
import PushNotification from "react-native-push-notification";


export class LoginScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email : "",
      password : ""
    }
  }

  //handle input 
  handleEmail = (value) => {
    this.setState({ email : value });
  }
  //handle input 
    handlePassword = (value) => {
      this.setState({ password : value });
    }

  //handle login 
  handleLogin =async () => { 
    this.props.Login(this.state.email , this.state.password);  
  }
  
  componentDidMount() {
    console.log("USER : "  , this.props.user);
  }
  _signIn = async () => {
    try {
      GoogleSignin.configure(
      {
        //webClientId is required if you need offline access
        offlineAccess: false,
        webClientId:'1020094745628-l6k4731ug31m72vvjv8kd1ksejn441d0.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });
      await GoogleSignin.hasPlayServices();
      console.log("reached google sign in");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({ userInfo });
      this.props.navigation.navigate('HomeScreen');

    } catch (error) {
      if (error.code === "SIGN_IN_CANCELLED") {
        console.log("error occured SIGN_IN_CANCELLED");
        // user cancelled the login flow
      } else if (error.code === "IN_PROGRESS") {
        console.log("error occured IN_PROGRESS");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
        console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        console.log(error)
        console.log("error occured unknow error");
      }
    }
  };

  componentDidUpdate(prevProps) {
    if(this.props.user.status != prevProps.user.status){
      this.props.navigation.navigate('RootDrawer');
    }    
  }

  Test = () => {

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text
            style={styles.headerText}>
            Sign in
            </Text>
          <TextInput style={styles.InputText}
            placeholder="Email"
            onChangeText = { value => this.handleEmail(value)}>
          </TextInput>

          <TextInput style={styles.InputText}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText = { value => this.handlePassword(value)} >
          </TextInput>

          <TouchableOpacity
            style={styles.LoginBtn}
            onPress = {this.handleLogin.bind(this)}>
            <Text style={styles.loginText}>
              Login
            </Text>
          </TouchableOpacity>

        <View style = {{ padding : 10 , flexDirection : 'row', justifyContent : 'center'}}>
          <View style = {{ marginRight : 50}}> 
          <Icon.Button name="facebook" backgroundColor="#3b5998">
            <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
              Facebook
            </Text>
          </Icon.Button>
          </View>
         
        </View>
         
         
        </View>
        

        <TouchableOpacity onPress = {this.Test}>
          <Text style={{ fontSize: 18, color: '#bbbbbb', textAlign: 'center', marginTop: 20 }}>Forgot your password ?</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 18, color: '#bbbbbb' }}> Don't have account ?</Text>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{ textDecorationLine: 'underline', textAlign: 'center', fontSize: 18, color: '#bbbbbb' }}> 
              Sign up
               </Text>
            </TouchableOpacity>

          </View>
        </View>
        <Authentication onGoogleButtonPress={this._signIn} />
      </View>
    );
  }
}

function mapStateToProps(state) {  
  return {
    user : state.LoginReducer.user,
    // user: firebase.auth().currentUser,
  };
}
export default connect(mapStateToProps, {Login})(LoginScreen);

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff8dc',
      justifyContent: 'center'
    },
    headerText: {
      fontSize: 40,
      alignSelf: 'center',
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#bbb'
    },
    body: {
      backgroundColor: '#ffffff',
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 20,
      elevation: 1,
    },
    InputText: {
      marginHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#bbbbbb'
    },
    LoginBtn: {
      borderRadius: 18,
      backgroundColor: '#00bfff',
      padding: 10,
      marginTop: 20,
    },
    loginText: {
      alignSelf: 'center',
      fontSize: 15,
      color: '#ffffff',
      fontWeight: "bold"
    },
    bottom: {
      bottom: 0,
      position: 'absolute',
      width: Dimensions.get("window").width,
    }
  }
)