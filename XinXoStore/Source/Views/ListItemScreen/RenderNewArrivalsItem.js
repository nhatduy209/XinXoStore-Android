import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,TouchableOpacity} from 'react-native'
import TestAPI from '../TestAPI'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { AddCart } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import { GetAllProduct } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import ModelAddToShoppingCartSuccess from '../shoppingCart/ModelAddToShoppingCartSuccess';
import ModelAddFail from '../shoppingCart/ModelAddFail';
import { getFontScaleSync } from 'react-native-device-info';

export  class RenderNewArrivalsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "img",
      isVisible:false,
      isVisibleFail:false,
    }
  }
  componentDidMount() {
    var testApi = new TestAPI()
    testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }
  addItem=async()=>{
    this.props.AddCart(this.props.user.data.key,this.props.item.key)
  }
  handleDetail = () => {
    const data = {data:this.props.item};
    this.props.navigation.push('DetailItemScreen',data);
  }
  componentDidUpdate(preProps){
    if(preProps.numberCart.status!=this.props.numberCart.status){
      this.setState({
        isVisible: true
      }, () => {
        setTimeout(() => {
          this.setState({
            isVisible: false
          });
        }, 2500);
      });
    }
    if(this.state.isAdd==true && this.props.numberCart.status=="FAIL"){
      this.setState({
        isVisibleFail: true
      }, () => {
        setTimeout(() => {
          this.setState({
            isVisibleFail: false
          });
        }, 2500);
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ModelAddToShoppingCartSuccess isVisible={this.props.isAdded}/>
        <ModelAddFail isVisible={this.state.isVisibleFail}/>
        <View>
          <Image
            style={{ height: 150, width: 120 }}
            source={{ uri: this.state.url }}>
          </Image>
        </View>
        <View style={styles.detailView}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 17 }}>{this.props.item.Name}</Text>
              <Text style={{ color: "#bbbbbb" }}>{this.props.item.prices}VNĐ</Text>
              <Text style={{ color: "#bbbbbb", fontStyle: 'italic' }}>
                <Text>
                  Ngày đăng bán {" "}
                </Text>
                {this.props.item.publicDate}</Text>
            </View>

            <TouchableOpacity  style={styles.iconStyle}>
            <Icon
              size={35}
              name="shopping-cart"
              color="#dc143c"
              onPress={this.addItem}
            ></Icon>
            </TouchableOpacity>
          </View>

          {/* go to detail screen */}
          <TouchableOpacity onPress = {this.handleDetail}>
            <Text style={{ marginLeft: 'auto', fontSize: 20, color: 'blue'  , fontStyle : 'italic'}}>
              Details {' '}
            </Text>
          </TouchableOpacity>


        </View>
      </View>
    )
  }
}

const mapStateToProps = state =>{
  return{
    numberCart:state.ShoppingCartReducer.items,
    user: state.LoginReducer.user,
    isAdded:state.ShoppingCartReducer.isAdded
  }
}
export default connect(mapStateToProps,{AddCart,GetAllProduct})(RenderNewArrivalsItem)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  detailView: {
    backgroundColor: '#ffff',
    marginLeft: 5,
    elevation: 0.5,
    width: Dimensions.get("window").width - 120,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 1
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  }
})