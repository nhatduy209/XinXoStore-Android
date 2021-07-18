import React from 'react';
import {Animated,View ,Text,FlatList,ListItem,StyleSheet,StatusBar,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import RenderShoppingCartItem from './RenderShoppingCartItem';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeleteCart } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import { DeleteItem } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';


export class ShoppingCart extends React.Component {
  constructor(props){
    super(props);
    this.state={
      animationIsRunning:false
    }
  }
  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };
  renderItem= ({item}) =>{
    return (
      <RenderShoppingCartItem
        item={item.data}
      />
    );
  }
  deleteCart=async( data,rowMap)=>{
    this.closeRow(rowMap, data.item.key)
    this.props.DeleteItem(this.props.user.data.key,data.item.key);
    this.props.GetAllProduct(this.props.user.data.key);

  }
  componentDidMount(){
    this.props.GetAllProduct(this.props.user.data.key);
  }
  handleGoShopping=()=>{
    this.props.navigation.navigate('Home');
  }
  handleCheckout=()=>{
    this.props.navigation.navigate('Checkout');
  }
  render(){
      return (
          <View style={styles.container}>
                    {this.props._products.data.length==0 ?
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
                            <Text style={{color:"gray", paddingHorizontal:10}}>{this.props._products.data.length} items</Text>                     
                        <SwipeListView
                        disableRightSwipe
                        data={this.props._products.data}
                        renderItem={this.renderItem}
                        keyExtractor={(rowData) => {
                          return rowData.key.toString();
                        }}
                        renderHiddenItem={this.renderHiddenItem}
                        renderHiddenItem={ (data, rowMap) => (
                          <View style={styles.btnDelete}>
                              <Icon.Button name="trash" 
                                  paddingLeft={15}
                                  paddingVertical={15}
                                  borderRadius={30}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  onPress={()=>this.deleteCart(data,rowMap)}
                                  backgroundColor={"red"}
                              >
                              </Icon.Button>
                          </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
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
                            <Text style={{fontWeight: "bold"}}>{this.props.totalBill}</Text>
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
function mapStateToProps(state){
  return{
      user: state.LoginReducer.user,
      _products: state.ShoppingCartReducer.items,
      totalBill: state.ShoppingCartReducer.totalBill
  }
}
export default connect(mapStateToProps,{GetAllProduct,DeleteCart,DeleteItem})(ShoppingCart)

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
    },
    
    rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
  });