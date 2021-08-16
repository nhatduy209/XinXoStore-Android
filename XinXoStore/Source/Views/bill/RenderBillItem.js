import React from "react";
import { View, StyleSheet,Image,Text ,Dimensions, TouchableOpacity} from "react-native";
import TestAPI from '../TestAPI'

export default class RenderBillItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'img'
          }
    }
    componentDidMount(){
        var testApi = new TestAPI()
        testApi.myPromise(this.props.item.data.img).then(res => this.setState({url : res })).catch(err => console.log(err));
      }
    componentDidUpdate(preProps){
        if(preProps.item.img!=this.props.item.data.img){
            var testApi = new TestAPI()
        testApi.myPromise(this.props.item.data.img).then(res => this.setState({url : res })).catch(err => console.log(err));
        }
    }
    handlePress=()=>{
        
    }
    render(){
        return(
            <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                <View style={{flex:3}}>
                    <Image
                        style={{ height: 100, width: 100 ,margin:5}}
                        source={{uri:this.state.url}}>
                    </Image>
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>
                        {this.props.item.data.Name}
                    </Text>
                    <Text style={{color:"gray"}}>
                        {this.props.item.data.prices}
                    </Text>
                    {this.props.item.key.reviewID==0 ?
                    ( 
                        <View style={styles.review}>
                            <Text style={{color:"#428af5"}}>Review</Text>
                        </View>
                    )
                    :null
                    }
                    
                </View>
                    
            </TouchableOpacity>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor:"#fff",
        paddingHorizontal:5,
        borderBottomColor:"#e8e8e8",
        borderBottomWidth:1,
    },
    name:{
        fontWeight:"bold",
        color: "black"
    },
    content:{
        display: "flex",
        
        // width:Dimensions.get("window").width - 120,
        padding:5,
        justifyContent:'flex-start',
        flex:6,
    },
    review:{
        borderWidth:1,
        borderColor:"#428af5",
        paddingHorizontal:10,
        // paddingVertical:5,
        alignSelf:'flex-end',
        borderRadius:10,
        
    }
});