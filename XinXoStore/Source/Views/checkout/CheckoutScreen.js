import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {getListAdress} from '../../redux/action/Adress/AdressAction';

export class CheckoutScreen extends React.Component{
    componentDidMount() {
        this.props.getListAdress("-McSVl4mVNzZPh65PqDv");
    }
    render(){
        return(
            <View>
                <Text>Shipping to</Text>
                <Icon.Button name="plus"/>
                <Text>Payment method</Text>
                <View style={styles.containerToTal}>
                          <View style={styles.itemTotal}>
                              <Text>Shipping fee</Text>
                              <Text>0</Text>
                          </View>
                          <View style={styles.itemTotal}>
                              <Text>Subtotal</Text>
                              <Text ></Text>
                          </View>
                          <View style={styles.itemTotal}>
                              <Text style={{fontWeight: "bold"}}>Total</Text>
                              <Text style={{fontWeight: "bold"}}></Text>
                          </View>
                          <TouchableOpacity style={styles.btnCheckout}>
                              <Text style={{color:"#fff",alignSelf:"center",fontWeight:"bold"}}>CHECKOUT</Text>
                          </TouchableOpacity>
                        </View>
            </View>
        );
    }
}

const mapStateToProps = state =>{
    return{
        adress:state.AdressReducer.adress
    }
  }
export default connect(mapStateToProps,{getListAdress})(CheckoutScreen)
  
const styles=StyleSheet.create({
    containerToTal:{
        flex: 0,
        justifyContent:"center",
        bottom:0
    },
    itemTotal:{
        flexDirection:'row',
        width:Dimensions.get("window").width,
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:5
    },
    btnCheckout:{
        justifyContent:"center",
        paddingVertical:10,
        alignContent:"center",
        backgroundColor: '#638adf',
        paddingHorizontal:50
    },
});