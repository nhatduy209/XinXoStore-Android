import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import { connect } from 'react-redux';
export  class CheckoutSuccess extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.GetAllProduct(this.props.user.data.key);
    }
    handleCheckout=()=>{
        console.log("PROP",this.props);
        this.props.navigation.navigate('Home');
    }
    render(){
        
        return(
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <Text style={{fontSize:25}}>Thank you!</Text>
                <Text>Your order is completed.</Text>
                <TouchableOpacity style={styles.btnCheckout} onPress={this.handleCheckout}>
                    <Text style={{color:"#fff",alignSelf:"center",fontWeight:"bold"}}>Continue Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.LoginReducer.user,
    }
}
export default connect (mapStateToProps,{GetAllProduct})(CheckoutSuccess)
const styles= StyleSheet.create({
    btnCheckout:{
        justifyContent:"center",
        paddingVertical:10,
        alignContent:"center",
        backgroundColor: '#638adf',
        paddingHorizontal:50,
        marginTop:50
    },
})