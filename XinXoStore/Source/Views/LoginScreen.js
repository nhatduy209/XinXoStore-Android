import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text
            style={styles.headerText}>
            Sign in
            </Text>
          <TextInput style={styles.InputText}
            placeholder="Email">
          </TextInput>

          <TextInput style={styles.InputText}
            placeholder="Password"
            secureTextEntry={true} >
          </TextInput>

          <TouchableOpacity
            style={styles.LoginBtn}>
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
     

          <Icon.Button name="google" backgroundColor="#bbbb">
            <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
            Google
            </Text>
          </Icon.Button>

        </View>
         

        </View>


        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: '#bbbbbb', textAlign: 'center', marginTop: 20 }}>Forgot your password ?</Text>
        </TouchableOpacity>



        <View style={styles.bottom}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 18, color: '#bbbbbb' }}> Don't have account ?</Text>
            <TouchableOpacity>
              <Text style={{ textDecorationLine: 'underline', textAlign: 'center', fontSize: 18, color: '#bbbbbb' }}> Sign up
               </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>


    );
  }
}

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