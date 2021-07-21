import {connect} from 'react-redux'
import React from 'react';
import {ScrollView,StyleSheet, View,TouchableOpacity,Text,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setCurrentAddress } from '../../redux/action/Address/AddressAction';

export class RenderCurrentAddress extends React.Component{
   handleClick=()=>{
        console.log("current ",this.props.user);
        // this.props.setCurrentAddress(this.props.item);
        console.log("current ",this.props.current);
        this.props.navigation.goBack();
   }
    render(){
        console.log("=========",this.props.user)
        return(
            <TouchableOpacity style={{backgroundColor:"#fff",padding:10,flexDirection:"row"}} 
            onPress={this.handleClick}
            >
                <View style={{marginHorizontal:5, maxWidth:250}}>
                    <Text style={{fontWeight:'bold'}}>
                        {this.props.item.Number+', '+this.props.item.Street}
                    </Text>
                    <Text style={{color:'gray'}}>
                    {this.props.item.District+', '+this.props.item.City}
                    </Text>
                </View>
                {this.props.item.Default===true ?
                    (
                    <View style={{justifyContent:'flex-end', marginHorizontal:10}}>
                        <Icon name="check-circle" color={"#2f7afb"} size={20} />
                    </View>
                    )
                    :null
                }
            </TouchableOpacity>
        );
    }
}
const mapStateToProps=state=>{
    return {
        address:state.AddressReducer.address,
        user:state.LoginReducer.user,
        add:state.AddressReducer.add,
        current:state.AddressReducer.current,
    }
}
export default connect(mapStateToProps,{setCurrentAddress})(RenderCurrentAddress)