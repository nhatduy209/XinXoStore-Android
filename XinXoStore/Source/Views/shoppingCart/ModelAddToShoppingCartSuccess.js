import React from 'react';
import Modal from 'react-native-modal';
import {View,Text,StyleSheet} from 'react-native';

export default class ModelAddToShoppingCartSuccess extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <Modal isVisible={this.props.isModalVisible}>
                    <View style={styles.modal}>
                    <Text>Item added to your cart!</Text>
                    </View>
                </Modal>
                </View>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        borderRadius:20
    },
    modal:{
        backgroundColor:"#fff",
        paddingVertical:15,
        paddingHorizontal:30,
        alignSelf:'center',
        borderRadius:5
    }
})