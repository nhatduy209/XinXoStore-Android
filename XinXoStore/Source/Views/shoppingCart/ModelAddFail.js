import React from 'react';
import Modal from 'react-native-modal';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModelAddFail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                 <Modal
                    animationType="fadeOut"                    
                    animationOutTiming={2000}
                    visible={this.props.isVisible}
                >
                    <View style={styles.content}>
                        <View >
                            <Icon name="times" 
                                color="#fff"
                                size={30}/>
                        </View>
                        <View>
                            <Text style={{color:"#fff",marginVertical:5}}>Item was in your cart!</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        fontWeight:'bold',
        fontSize:17,
        color:"#fff"
    },
    content:{
        backgroundColor:'#919294',
        borderRadius:20,
        paddingHorizontal:35,
        paddingVertical:20,
        alignSelf:'stretch',
        marginHorizontal:20,
        color:"#ffff",
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
})