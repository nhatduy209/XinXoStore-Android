import { connect } from 'formik';
import React from 'react';
import {ScrollView,StyleSheet, View,TouchableOpacity,Text,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class RenderCurrentAddress extends React.Component{
   
    render(){
        console.log("=========",this.props.item)
        return(
            <TouchableOpacity style={{backgroundColor:"#fff",padding:10,flexDirection:"row"}} 
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
function mapStatetoProps(state){
    return{
        current:state.AddressReducer.current
    }
}
export default connect (mapStatetoProps,null)(RenderCurrentAddress)