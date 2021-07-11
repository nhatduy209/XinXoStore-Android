import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity, FlatList} from 'react-native';
import { connect } from 'react-redux';
import {getListAdress} from '../../redux/action/Adress/AdressAction';
import { RenderItemAdress } from './RenderItemAdress';
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';

export class CheckoutScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChecked:true
        }
    }
    componentDidMount=async()=> {
        this.props.getListAdress(this.props.user.data.key);
        // this.props.GetAllProduct(this.props.user.data.key);
        console.log("didmount");
       
    }
    renderItemAdress=(item)=>{
        console.log(item);
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
                {this.props.adress.data.length>0?
                (
                    <FlatList
                        paddingHorizontal={30}
                        data={this.props.adress.data.adress}
                        renderItem={({ item, index, separators }) => (
                            <RenderItemAdress item={item}
                            key={index}
                            />
                          )}
                        horizontal
                        ItemSeparatorComponent={this.itemSeparator}
                    />
                )
                : (
                <TouchableOpacity style={styles.iconAdd} onPress={()=>{this.props.navigation.navigate("AddAdress")}}>
                    <Icon name="plus" size={20} color={"#2f7afb"}/>
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
        adress:state.AdressReducer.adress,
        user:state.LoginReducer.user,
        cart:state.ShoppingCartReducer.items,
    }
  }
export default connect(mapStateToProps,{getListAdress,GetAllProduct})(CheckoutScreen)
  
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
});