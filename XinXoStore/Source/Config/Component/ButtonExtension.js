import React from 'react';
import {View,Text,Image,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';

export default class ButtonExtension extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:props.text,
            logo:props.logo
        }
    }
    render(){
        return(
            <TouchableOpacity style={styles.ButtonExtension} >
                <Image style={{height:20,width:20}} source={this.props.logo} />
                <Text
                    style={styles.TextExtension}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}
const styles= StyleSheet.create({
    TextExtension:{
        color:'gray',
        fontWeight:'bold',
        fontSize:18,
        textAlign: 'center', 
        paddingVertical: 15,
        fontWeight:'bold',
        letterSpacing:1,
        marginHorizontal:10,
        
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
    }
});
