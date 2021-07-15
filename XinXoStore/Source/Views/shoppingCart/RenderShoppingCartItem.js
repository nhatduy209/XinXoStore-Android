import React from "react";
import { View, StyleSheet,Image,Text ,Dimensions} from "react-native";
import TestAPI from '../TestAPI'

export default class RenderShoppingCartItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:''
          }
    }
    componentDidMount(){
        var testApi = new TestAPI()
        testApi.myPromise(this.props.item.img).then(res => this.setState({url : res })).catch(err => console.log(err));
      }
    render(){
        return(
            <View style={styles.container}>
                    <View>
                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{uri:this.state.url}}>
                        </Image>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.name}>
                            {this.props.item.Name}
                        </Text>
                        <Text style={{color:"gray"}}>
                            {this.props.item.prices}
                        </Text>
                        <Text style={{color:"gray"}}>
                            {this.props.item.publicDate}
                        </Text>
                    </View>
                
            </View>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor:"#fff",
        alignItems: 'center',
    },
    name:{
        fontWeight:"bold",
        color: "black"
    },
    content:{
        display: "flex",
        borderBottomColor:"#e8e8e8",
        borderBottomWidth:2,
        width:Dimensions.get("window").width - 120,
        padding:10
    }
});