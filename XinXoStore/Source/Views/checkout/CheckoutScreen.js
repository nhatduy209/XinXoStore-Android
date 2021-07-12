import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {getListAdress} from '../../redux/action/Adress/AdressAction';

export class CheckoutScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChecked:true
        }
    }
    componentDidMount() {
        // this.props.getListAdress(this.props.user.data.key);
        this.props.getListAdress("-McSVl4mVNzZPh65PqDv");
        console.log("ADRESS",this.props.adress);
    }
    handleChooseAdress=()=>{
        this.setState({isChecked:!this.state.isChecked});
        // do something
    }
    render(){
        console.log(this.state.isChecked);
        return(
            <View backgroundColor={"#fff"}>
                <Text>Shipping to</Text>
                <TouchableOpacity style={styles.iconAdd}>
                    <Icon name="plus" size={20} color={"#2f7afb"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addressComponent}
                    onPress={this.handleChooseAdress}>
                    <View style={styles.home}>
                        <Icon name="home" size={30} color={"#2f7afb"}/>
                    </View>
                   <View style={{marginHorizontal:5, maxWidth:250}}>
                       <Text style={{fontWeight:'bold'}}>
                           309, Nguyen Thi Ranh
                       </Text>
                       <Text style={{color:'gray'}}>
                           Cu Chi, HCM
                       </Text>
                   </View>
                   {this.state.isChecked===true ?
                       (
                        <View style={{justifyContent:'center', marginHorizontal:10}}>
                            <Icon name="check-circle" color={"#2f7afb"} size={20} />
                        </View>
                       )
                       :null
                   }
                   
                </TouchableOpacity>
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
        user:state.LoginReducer.user
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
    home:{
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        width:40,
        borderRadius:10,
        marginHorizontal:5
    },
    addressComponent:{
        alignSelf:'center',
        flexDirection:'row',
        backgroundColor:'#f3f3f3',
        padding:10,
        borderRadius:10
    }
});