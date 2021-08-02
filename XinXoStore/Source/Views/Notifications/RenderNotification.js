import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,TouchableOpacity} from 'react-native'
import TestAPI from '../TestAPI'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { AddCart } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';

class RenderNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: require("../../Images/clothingHome.jpeg"),
    }
  }
  componentDidMount() {
    // var testApi = new TestAPI()
    // testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }
  render() {
    // console.log(this.state.url);
    return (
      <View style={[styles.item,{width:'90%',marginVertical:10}]} >
      <View style={{flexDirection:'row',width:'100%'}}>
            <Image source={this.state.url} style={{height:70,width:70,marginHorizontal:10,borderRadius:5}}/>
            <View style={{justifyContent:'center',maxWidth:'65%'}} >
                <Text style={{color:'#000'}}>Shop Name</Text>
                <Text style={{color:'#000'}}>Tui mới vừa đăng cái áo đẹp lắm á</Text>
                <Text style={{color:'#ddd'}}>Time</Text>
            </View>
            <Icon style={{position:'absolute',right:10,top:'30%'}} name='ellipsis-vertical' size={25} backgroundColor="#3b5998">
            </Icon>
      </View>
      </View>
    )
  }
}

const mapStateToProps = state =>{
  return{
    numberCart:state.ShoppingCartReducer.numberCart,
    user: state.LoginReducer.user,
  }
}
export default connect(mapStateToProps,{AddCart,GetAllProduct})(RenderNotification)

const styles = StyleSheet.create({
  item: {
    alignSelf:'center',
    elevation:6,
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:20,
    borderColor: '#eee',
    flexDirection:'row',
    backgroundColor:'#fff',
},
})