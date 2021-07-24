import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,TouchableOpacity, ScrollView,FlatList} from 'react-native'
import TestAPI from '../TestAPI';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NewArrivalItem from '../homeScreenFlatlist/HomeScreenArrivalsItems.js'
import StarRating from './StarRating';
import { editProduct } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction';
import { getListNewArrivals } from '../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction'
import UrlComponent from './UrlRender';
import { AddCart } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';

class DetailItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/sold.png"),
                require("../../Images/sold1.png"),
                require("../../Images/sold2.png"),
              ],
            url : "img",
            sold: false,
            listItem:[],
          };
    }
    componentDidMount() {
        console.log(this.props.route.params.data.sold)
        const product = this.props.route.params.data;
        this.setState({isLiked: product.isLiked});
        const listProduct = this.props.newArrivalsItems.data.listItem.filter((element) => {
            return element.key != product.key;
        })
        this.setState({listItem: listProduct});
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    itemSeparator = () => {
        return <View style={{ width: 15 }} />;
    }
    componentDidUpdate(prevProps) {
        if(prevProps.route.params.data.key != this.props.route.params.data.key){
            const product = this.props.route.params.data;
            this.setState({isLiked: product.isLiked});
            const listProduct = this.props.newArrivalsItems.data.listItem.filter((element) => {
                return element.key != product.key;
            })
            this.setState({listItem: listProduct});
        }
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    handleShoppingCart=()=>{
        this.props.AddCart(this.props.userKey,this.props.route.params.data.key);
    }
    render(){
        return(
            <View>
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Icon
                            size={20}
                            name="bars"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}>Detail</Text>
                        <View style={{height:60,backgroundColor:'#eee',opacity:0.5,width:Dimensions.get('window').width}}>
                        
                        </View>
                    </View>
                    <View style={{position:'absolute',right:30,marginTop:20,zIndex:10}}>
                            {
                                !this.props.route.params.data.sold ? <Image></Image> : <Image style={{height:100,width:100}} source={this.state.images[0]}></Image>
                            }
                                
                    </View>
                <ScrollView>
                    {/* item images */}
                    <View style={{height:320}}>
                        <Image style={{height:350,resizeMode: 'cover'}} source ={{uri : this.state.url}} />
                        
                    </View>
                    
                <View style={styles.boxContent}>
                    <View >
                        {/* item name and favarite icon */}
                        <View style={{paddingVertical:10,paddingHorizontal:20,marginTop:20 }}>
                            <Text style={styles.textTitles}>
                                {this.props.route.params.data.Name}
                            </Text>
                        </View>
                        {/* price and rate */}
                        <View style={{paddingHorizontal:20,paddingVertical:10}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{ color: "#000", fontSize: 21,width:Dimensions.get("window").width -150}}>
                                {this.props.route.params.data.prices} VNĐ
                            </Text>
                            <View>
                                <StarRating item={this.props.route.params.data}/>
                            </View>
                                
                        </View>
                        <View style={{marginTop:20}}>
                            <TouchableOpacity>
                                <View style={{height:70,flexDirection: 'row'}}>
                                    <UrlComponent item={{img:this.props.userInfo.Avatar}}/>
                                    <View style={{paddingVertical:20,flexDirection: 'row',width:Dimensions.get("window").width - 120}}>
                                        <Text style={{marginHorizontal:10,fontSize:18,justifyContent: 'center'}}>{this.props.route.params.data.ownerShop}</Text>
                                        
                                        <Text  style={styles.buttonInfoShop}>View shop</Text>
                                        
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                            

                        </View>
                        </View>
                        {/* maybe also like */}
                        <View>
                            <View style={{ flexDirection: 'row', padding:10}}>
                                <Text style={{ fontSize:14,width:Dimensions.get("window").width - 150}}>
                                    Maybe you also like 
                                </Text>
                                {/* <Text style={{ fontSize:14,padding:20}}>Show all</Text> */}
                            </View>
                            {/* flatlist item  */}
                            <View style={{paddingHorizontal:10}}>
                                <FlatList
                                data={this.state.listItem}
                                renderItem={({item = {navigate:this.props.navigate,...item}}) =>
                                    <NewArrivalItem item={item = {navigate:this.props.navigation,...item}}/>}
                                keyExtractor={item => item.Name}
                                horizontal
                                ItemSeparatorComponent={this.itemSeparator}
                                
                                />
                            </View>
                        </View>
                        {/* decriptions */}
                        <View style={{marginHorizontal:20,paddingVertical:10}}>
                            <Text style={styles.textTitles}>
                                Description
                            </Text>
                            <Text style={{lineHeight:20,paddingTop:10}}>
                                {/* {this.props.route.params.description} */}
                            Đây là những chiếc áo khoác được thiết kế theo phong cách hoàng gia Anh.
                            Thiết kế này giúp cho người mặc tăng thêm sự quyến rũ và duyên dáng.
                            Dù hiện nay nó không còn phổ biến nữa nhưng vẫn được rất nhiều người yêu thích. 
                            </Text>
                        </View>
                    </View>
                    
                    {/* add to card */}
                    <View style={styles.box}>
                        <TouchableOpacity onPress={this.handleShoppingCart}>
                            <Text style={styles.addToCard}>
                                Add to card
                            </Text>
                        </TouchableOpacity> 
                    </View>
                </View>
                </ScrollView>
            </View>           
        
        );
    }
}
function mapStateToProps(state) {
    // console.log(state.LoginReducer.user.data.user);
    return {
        newArrivalsItems: state.NewArrivalsReducer.items,
        userInfo : state.LoginReducer.user.data.user,
        userKey : state.LoginReducer.user.data.key
    };
  }
export default connect(mapStateToProps, {editProduct,AddCart})(DetailItem);
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1
    },
    imageStyle: {
        height: 150,
        width: Dimensions.get("window").width-40
      },
    textTitles : {
        fontSize:21,
        fontWeight: '700',
        width:Dimensions.get("window").width-80
    },
    box:{
        paddingHorizontal:10,
        position:'relative',
        bottom:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContent:{
        position:'relative',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        width: Dimensions.get("window").width,
        backgroundColor: "#fff",
        elevation:5
    },addToCard :{
        borderRadius:10,
        fontSize:16,
        padding:20,
        marginTop:20,
        color:'#fff',
        width: Dimensions.get("window").width - 40,
        backgroundColor:'#ea5310',
        textAlign:'center',
    },
    navigationIcon: {
        left:20,
        position:'absolute',zIndex:10
    },
    textHeader:{
        left:70,
        fontSize:21,
        fontWeight:'bold',
        color:'#000',
        position:'absolute',zIndex:10
    },
    buttonInfoShop:{
        position: 'absolute',
        right:10,top:20,
        borderRadius:3,
        color:'#dd5246',
        borderColor:'#dd5246',
        height:29,padding:5,
        fontSize:14,
        borderWidth:1
    },
});