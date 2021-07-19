import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';

export class RenderItemAddress extends React.Component{
    render(){
        console.log("propss",this.props.item);
        return(
            <TouchableOpacity style={styles.addressComponent}
                onPress={()=>{this.props.navigation.navigate("ChooseAddressScreen")}}>
                    <View style={{flex:8,flexDirection:'row'}}>
                        <View style={styles.home}>
                    <Icon name="home" size={30} color={"#2f7afb"}/>
                    </View>
                    <View style={{marginHorizontal:5, maxWidth:250}}>
                        <Text style={{fontWeight:'bold'}}>
                            {this.props.item.Number+', '+this.props.item.Street}
                        </Text>
                        <Text style={{color:'gray'}}>
                        {this.props.item.District+', '+this.props.item.City}
                        </Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                     {this.props.item.Default===true?
                    (
                    <View style={{justifyContent:'center', marginHorizontal:10,alignContent:'flex-end'}}>
                        <Icon name="check-circle" color={"#2f7afb"} size={18} />
                    </View>
                    )
                    :null
                    }
                </View>
               
            </TouchableOpacity>
        );
    }
}

const styles=StyleSheet.create({
    
    addressComponent:{
        alignSelf:'center',
        flexDirection:'row',
        backgroundColor:'#f3f3f3',
        padding:10,
        borderRadius:10,
        width:Dimensions.get("window").width - 20,
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