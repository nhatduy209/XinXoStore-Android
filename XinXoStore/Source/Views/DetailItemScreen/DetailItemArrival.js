import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,
    TouchableOpacity, ScrollView,FlatList,TextInput,KeyboardAvoidingView,} from 'react-native'
import TestAPI from '../TestAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NewArrivalItem from '../homeScreenFlatlist/HomeScreenArrivalsItems.js'
import StarRating from 'react-native-star-rating';
import { getListReviews } from '../../redux/action/ReviewAction/ReviewAction.js';
import {getPublisherInfo} from '../../redux/action/GetPublisherInfoAction/GetPublisherInfoAction'
import UrlComponent from './UrlRender';
import FeedbackComponent from './RenderFeedback';
import { AddCart } from '../../redux/action/ShoppingCartAction/ShoppingCartAction';
import DoReview from './DoReview';

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
            listReview:[],
          };
    }
    componentDidMount() {
        this.props.getListReviews(this.props.route.params.data.ownerId)
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    componentDidUpdate(prevProps) {
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    ShowAllReview = () => {
        this.props.navigation.navigate('AllReviews');
    }
    showReview =() => {
        return (
            <View>
                <TouchableOpacity style={{flexDirection: 'row',alignSelf: 'center'}}
                onPress={()=>this.ShowAllReview()}>
                    <Text style={{paddingVertical:10,fontSize:16,color:'#000'}}>
                            Show all reviews
                    </Text>
                    <Icon
                    size={13}
                    name="chevron-right"
                    style={{paddingVertical:15,paddingHorizontal:5,color:'#000'}}
                    >
                    </Icon>                    
                </TouchableOpacity>
            </View>
        )
    }
    soldHandle= ()=>{
        return(
            <View style={{backgroundColor: '#ccc',opacity:0.6,justifyContent: 'center',height:350,width:Dimensions.get("window").width}}>
                <View style={{borderWidth:10,borderColor:'#d00',borderRadius:100,width:200,height:200,alignSelf: 'center',alignContent: 'center',paddingVertical:50,transform:[{rotate:'-25deg'}]}}>
                    <Text style={{fontSize:56,fontWeight:'bold',textAlign: 'center',color:'#d00'}}>SOLD</Text>
                </View>
            </View>
        )
    }
    itemSeparator = () => {
        return <View style={{ width: 15 }} />;
    }
    
    
    addItem=async()=>{
        this.props.AddCart(this.props.userInfo.key,this.props.route.params.data.key)
      }
    getDate = () =>{
        var date = new Date();
        return date.getMonth() +'/'+date.getDate()+'/'+date.getFullYear();
    }

    goToPublisherScreen = () => {
        this.props.getPublisherInfo(this.props.route.params.data.ownerId);
        this.props.navigation.navigate('PublisherProfileScreen',this.props.route.params.data.ownerId);
    }
    render(){
        
        return(
            <View style={{backgroundColor: '#eee'}}>
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Icon
                            size={20}
                            name="bars"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}>Detail</Text>
                        <View style={{height:60,backgroundColor:'#fff',opacity:0.7,width:Dimensions.get('window').width}}>
                        
                        </View>
                </View>
                
                
                <ScrollView style={{height:'93%'}}>
                    {/* item images */}
                    <View style={{height:320}}>
                        <Image style={{height:350,resizeMode: 'cover'}} source ={{uri : this.state.url}} />
                        <View style={{zIndex:5,position:'absolute',}}>
                        {
                            !this.props.route.params.data.sold ? <View></View> : this.soldHandle()
                            
                        }
                        </View>
                    </View>
                    
                    <View style={styles.boxContent}>
                        <View >
{/* ------------------------------item name and favarite icon */}
                            <View style={{paddingVertical:10,paddingHorizontal:20,marginTop:20 }}>
                                <Text style={styles.textTitles}>
                                    {this.props.route.params.data.Name}
                                </Text>
                            </View>
{/* ------------------------------price and rate */}
                                <View style={{paddingHorizontal:20,paddingVertical:10}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{ color: "#000", fontSize: 21,width:'70%'}}>
                                        {this.props.route.params.data.prices}VNĐ
                                    </Text>
                                    <View>
                                        {/* <StarRating item={this.props.route.params.data}/> */}
                                        <StarRating
                                        fullStarColor='yellow'
                                        rating={this.props.route.params.data.Rating}
                                        maxStars={5}
                                        starSize={20}
                                        starStyle={{paddingHorizontal:3}}
                                        />
                                    </View>
                                        
                                </View>
{/* ------------------------------Shop profile */}
                                    <View style={{marginTop:20}}>
                                <TouchableOpacity onPress = { this.goToPublisherScreen }>
                                    <View style={{height:70,flexDirection: 'row'}}>
                                        <UrlComponent item={{img:this.props.userInfo.user.Avatar,demension:70,radius:50}}/>
                                        <View style={{paddingVertical:20,flexDirection: 'row',width:Dimensions.get("window").width - 120}}>
                                            <Text style={{marginHorizontal:10,fontSize:18,justifyContent: 'center'}}>{this.props.route.params.data.ownerShop}</Text>
                                            
                                            <Text  style={styles.buttonInfoShop}>View shop</Text>
                                            
                                        </View>
                                        
                                    </View>
                                </TouchableOpacity>
                                

                            </View>
                                </View>
{/* -------------------------------Another product */}
                            <View >
                                <View style={{ flexDirection: 'row', padding:10}}>
                                    <Text style={{ fontSize:14,width:Dimensions.get("window").width - 150}}>
                                        Maybe you also like 
                                    </Text>
                                    {/* <Text style={{ fontSize:14,padding:20}}>Show all</Text> */}
                                </View>
                                {/* flatlist item  */}
                                <View style={{paddingHorizontal:10}}>
                                    <FlatList
                                    data={this.props.newArrivalsItems.data.listItem.filter((element) => {
                                        return element.key != this.props.route.params.data.key;
                                    })}
                                    renderItem={({item = {navigate:this.props.navigate,...item}}) =>
                                        <NewArrivalItem item={item} navigation={this.props.navigation}/>}
                                    keyExtractor={item => item.Name}
                                    horizontal
                                    ItemSeparatorComponent={this.itemSeparator}
                                    
                                    />
                                </View>
                            </View>
{/* ------------------------------Decriptions */}
                            <View style={{marginHorizontal:20,paddingVertical:10}}>
                                <Text style={styles.textTitles}>
                                    Description
                                </Text>
                                <Text style={{lineHeight:20,paddingVertical:10}}>
                                    {this.props.route.params.description}
                                </Text>
                            </View>
                        </View>
{/* ------------------------------Review */}
                        <View>
                            <View style={{ flexDirection: 'row', paddingHorizontal:10,width:Dimensions.get("window").width,justifyContent: 'center'}}>
                                <Text style={[styles.textTitles,{padding:10}]}>
                                        Review
                                </Text>
                                <TouchableOpacity style={{flexDirection: 'row'}}>
                                    {this.showReview()}
                                </TouchableOpacity>
                                
                            </View>
                            <View>
                            {
                                this.props.listReview.data.listItem ? this.props.listReview.data.listItem.filter((element,index)=>{return index<2}).map((element,index) => {
                                    var item = {Content: element.Content,
                                            UserName: element.Username,
                                            Rating:element.Rating,
                                            Img:element.Img,
                                            Avatar:element.Avatar,
                                            key:element.key,
                                        }
                                    return (<FeedbackComponent key={index} item={item}/>);
                                }) : <View/>
                            }
                            </View>
                            <View style={{borderTopWidth:1,borderTopColor:'#eee'}}>
                                {this.showReview()}
                            </View>
                        </View>
                        <DoReview item ={this.props.route.params.data}/>
                    </View>
                </ScrollView>
                {/* add to Cart */}
                <View style={styles.addToCartButton}>
                    {
                        this.props.route.params.data.sold ?
                        <Text style={[styles.addToCart,{backgroundColor:'#aaa'}]}>
                            Add to cart
                        </Text> :
                        <TouchableOpacity onPress={()=>{this.addItem()}}>
                            <Text style={[styles.addToCart,{backgroundColor:'#003344'}]}>
                                Add to cart
                            </Text>
                        </TouchableOpacity> 

                    }
                    
                </View>
            </View>           
        
        );
    }
}
function mapStateToProps(state) {
    // console.log(state.ReviewReducer.items.data.listItem)
    return {
        newArrivalsItems: state.NewArrivalsReducer.items,
        userInfo : state.LoginReducer.user.data,
        listReview: state.ReviewReducer.items,
        publisher : state.PublisherInfoReducer.publisher ,
    };
  }
export default connect(mapStateToProps, {getPublisherInfo,getListReviews,AddCart})(DetailItem);
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
        width:'60%'
    },
    addToCartButton:{
        justifyContent: 'center',
        zIndex:10,
        height:'7%',
        
    },
    boxContent:{
        position:'relative',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        width: '100%',
        backgroundColor: "#fff",
        zIndex:6
    },addToCart :{
        fontSize:21,
        color:'#fff',
        fontWeight: '700',
        width: '100%',
        textAlign:'center',
        height:'100%',padding:10,
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