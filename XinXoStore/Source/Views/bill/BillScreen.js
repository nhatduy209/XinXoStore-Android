import React from "react";
import { View ,Text, FlatList,StyleSheet, Dimensions,TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import {getAll} from '../../redux/action/BillAction/BillAction'
import RenderBillItem from "./RenderBillItem";

export class BillScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getAll(this.props.user.key);
    }
    renderItem=(items)=>{
        return(
            <RenderBillItem
                item={items.item}/>
        );
        
    }
    handleGoShopping=()=>{
        this.props.navigation.navigate("Home");
    }

    render(){
        return(
            <View style={styles.container}>
                {typeof this.props.bill.listItem != "undefined" && this.props.bill.listItem.length>0  ?
                 (
                 <FlatList
                    ListHeaderComponent={
                        <Text style={styles.header}>My Bill</Text>
                    }
                    data={this.props.bill.listItem}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.key.itemID}
                >
                </FlatList>
                ):
                <View style={{flex:1,}}> 
                    <Text style={styles.header}>My Bill</Text>
                    <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
                        <Text style={{justifyContent:'center',alignItems:'center'}}>Empty</Text>
                            <TouchableOpacity style={styles.btnCheckout}
                                onPress={this.handleGoShopping}>
                                <Text style={{color:"#fff",alignSelf:"center",fontWeight:"bold"}}>Go Shopping</Text>
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
        user: state.LoginReducer.user.data,
        bill: state.BillReducer.items.data
    }
}
export default connect (mapStateToProps,{getAll})(BillScreen)

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        height:Dimensions.get('window').height,
        flex:1,
        // alignItems:'center',
        // justifyContent:'center'
    },
    header:{
        fontSize:25,
        paddingHorizontal:15,
        paddingVertical:10,
        fontWeight:'bold',
        letterSpacing:1
    },
    btnCheckout:{
        justifyContent:"center",
        paddingVertical:10,
        alignSelf:"center",
        backgroundColor: '#638adf',
        paddingHorizontal:50,
        width:Dimensions.get("window").width-120
    },
});