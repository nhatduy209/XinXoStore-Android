import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';

export class RenderItemAdress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChecked:false
        }
    }
    handleChooseAdress=()=>{
        this.setState({isChecked:!this.state.isChecked});
        // do something
    }
    render(){
        console.log(this.props.item);
        return(
            <TouchableOpacity style={styles.addressComponent}
                    onPress={this.handleChooseAdress}>
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
                   {this.state.isChecked===true || this.props.item.Default===true?
                       (
                        <View style={{justifyContent:'center', marginHorizontal:10}}>
                            <Icon name="check-circle" color={"#2f7afb"} size={20} />
                        </View>
                       )
                       :null
                   }
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
        borderRadius:10
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