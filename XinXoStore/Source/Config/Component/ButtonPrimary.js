import React from 'react';
import { StyleSheet , Text, View, TouchableOpacity} from 'react-native';

export default class ButtonPrimary extends React.Component{
    render(){
        return(
            <View style={styles.ButtonSignUp}>
                <TouchableOpacity onPress={this.props.onPressFunction} >
                    <Text
                        style={styles.TextSignUp}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles=StyleSheet.create({
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
    }
});