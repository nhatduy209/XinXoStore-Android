import React from 'react';
import {View ,Text,FlatList,ListItem,StyleSheet,StatusBar,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import RenderShoppingCartItem from './RenderShoppingCartItem';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteCart } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';


export class ShoppingCart extends React.Component {
  constructor(props){
    super(props);
  }
  
  renderItem = ({item}) => {
    return (
      <RenderShoppingCartItem
        item={item}
      />
    );
  }
  componentDidMount(){
    this.props.GetAllProduct(this.props.user.data.key);
  }
  deleteCart=async(item)=>{
    this.props.DeleteCart(item);
  }
  handleGoShopping=()=>{
    this.props.navigation.navigate('HomeScreen');
  }
  handleCheckout=()=>{
    this.props.navigation.navigate('Checkout');
  }
  handleInnerPressIn = () => this.setState({ outerScrollViewScrollEnabled: false });
    render(){
        return (
            <View style={styles.container}>
                      {this.props.numberCart===0 ?
                      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                        <Text style={{color:"gray"}}>Your shopping cart is empty</Text>
                        <Text style={{fontWeight:"bold"}}>Fortunately, there's an easy solution</Text>
                        <TouchableOpacity style={styles.btnCheckout}
                          onPress={this.handleGoShopping}>
                          <Text style={{color:"#fff",alignSelf:"center",fontWeight:"bold"}}>Go Shopping</Text>
                        </TouchableOpacity>
                      </View>
                      :
                      <View  style={{ flex: 1 }}>
                         <ScrollView 
                            nestedScrollEnabled>
                              <Text style={{color:"gray", paddingHorizontal:10}}>Swipe left to remove items</Text>                     
                          <Text style={styles.quantity}>{this.props.numberCart} items</Text>
                          <SwipeListView
                            data={this.props.carts}
                            renderItem={this.renderItem}
                            keyExtractor={data =>data.name}
                            renderHiddenItem={ (data, rowMap) => (
                              <View style={styles.btnDelete}>
                                  <Icon.Button name="trash" 
                                      paddingLeft={15}
                                      paddingVertical={15}
                                      borderRadius={30}
                                      alignItems={"center"}
                                      justifyContent={"center"}
                                      onPress={()=>this.deleteCart(data.item)}
                                      backgroundColor={"red"}
                                  >
                                  </Icon.Button>
                              </View>
                            )}
                            rightOpenValue={-75}
                            nestedScrollEnabled
                          />
                        </ScrollView>
                        <View style={styles.containerToTal}>
                          <View style={styles.itemTotal}>
                              <Text>Shipping fee</Text>
                              <Text>0</Text>
                          </View>
                          <View style={styles.itemTotal}>
                              <Text>Subtotal</Text>
                              <Text >{this.props.totalFee}</Text>
                          </View>
                          <View style={styles.itemTotal}>
                              <Text style={{fontWeight: "bold"}}>Total</Text>
                              <Text style={{fontWeight: "bold"}}>{this.props.totalFee}</Text>
                          </View>
                          <TouchableOpacity style={styles.btnCheckout} onPress={this.handleCheckout}>
                              <Text style={{color:"#fff",alignSelf:"center",fontWeight:"bold"}}>CHECKOUT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    }
            </View>
          );
    }
}

const mapStateToProps = state =>{
  return{
      numberCart:state.ShoppingCartReducer.numberCart,
      carts:state.ShoppingCartReducer.Carts,
      totalFee: state.ShoppingCartReducer.totalBill,
      user: state.LoginReducer.user
  }
}
export default connect(mapStateToProps,{GetAllProduct,DeleteCart})(ShoppingCart)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#fff",
      margin:0,
    },
    header:{
      fontSize:25,
      padding:10,
      fontWeight:"bold",
      borderBottomColor:"#e8e8e8",
      borderBottomWidth:2
    },
    quantity:{
      padding:10
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
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
    btnDelete:{
      justifyContent:'center',
      alignSelf:'flex-end',
      alignItems:'center',
    },
    innerbtnDelete:{
    }
  });