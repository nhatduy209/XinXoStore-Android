import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity, FlatList} from 'react-native';
import { connect } from 'react-redux';
import {getDefaultAddress} from '../../redux/action/Address/AddressAction';
import { RenderItemAddress } from './RenderItemAdress';
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';

export class CheckoutScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChecked:true,
            default:{}
        }
    }
    componentDidMount=async()=> {
        this.props.getDefaultAddress(this.props.user.data.key);
    }
    itemSeparator=()=>{
        return(
            <View style={{ width: 15 }} />
        );
    }
    render(){
        return(
            <View backgroundColor={"#fff"}>
                <Text>Shipping to</Text>
                {JSON.stringify(this.props.current.data)!=='{}' ?
                (
                    <RenderItemAddress item={this.props.current.data} navigation={this.props.navigation}/>
                ):
                 (
                    <TouchableOpacity style={styles.container} 
                    onPress={()=>this.props.navigation.navigate("AddAddress")}>
                        <Icon name="plus" size={20} color={"#2f7afb"}/>
                        <Text>
                             Thêm địa chỉ
                        </Text>
                    </TouchableOpacity>
                )}
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
        address:state.AddressReducer.address,
        user:state.LoginReducer.user,
        cart:state.ShoppingCartReducer.items,
        current:state.AddressReducer.current
    }
  }
export default connect(mapStateToProps,{getDefaultAddress,GetAllProduct})(CheckoutScreen)
  
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
    iconAdd:{
        borderColor:"#2f7afb",
        borderWidth:2,
        height:30,
        width:30,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30
    },
    addressComponent:{
        alignSelf:'center',
        flexDirection:'row',
        backgroundColor:'#f3f3f3',
        padding:10,
        borderRadius:10,
        width:200
    },
    home:{
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:40,
        borderRadius:10,
        marginHorizontal:5
    },
});