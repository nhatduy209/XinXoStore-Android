import React from 'react';
import { Text, View, Dimensions, TouchableOpacity,Image, TouchableNativeFeedbackBase } from 'react-native';
import TestAPI from '../TestAPI';
import UrlComponent from './UrlRender';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteReviews } from '../../redux/action/ReviewAction/ReviewAction.js';
import { connect } from 'react-redux';

class FeedbackComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            images: [
                require("../../Images/sold.png"),
                require("../../Images/sold1.png"),
                require("../../Images/sold2.png"),
            ],
            url: "img",
            like: false,
            Img:[],
        }
    }

    componentDidMount() {
        // console.log(this.props.userInfo.user.Username);
        const array = Object.values(this.props.item.Img);
        this.setState({Img:array})
    }
    getDate = () =>{
        var date = new Date();
        return date.getMonth() +'/'+date.getDate()+'/'+date.getFullYear();
    }
    deleteReview=()=>{
        console.log('nè')
        const data = {
            imageNamePath: this.state.Img,
            key: this.props.item.key
        }
        this.props.deleteReviews(data)
    }
    render() {
        return (
            <View>
                <View style={{paddingHorizontal:20,height:50,flexDirection: 'row',width:Dimensions.get("window").width,borderTopWidth:1,borderTopColor:'#eee'}}>
                    <UrlComponent item={{img:this.props.item.Avatar,demension: 40,radius:50}}/>
                    <View >
                        <View style={{width:100}}>
                            <Text style={{paddingTop:10,marginLeft:10,fontSize:14,justifyContent: 'center',color:'#000'}}>{this.props.item.Username}</Text>
                            <StarRating
                                fullStarColor='orange'
                                rating={this.props.item.Rating}
                                maxStars={5}
                                starSize={15}
                                starStyle={{paddingHorizontal:3,paddingTop:5}}
                                style={{marginLeft:20}}
                            />
                        </View>
                        
                    </View>
                    {
                        this.props.userInfo.user.Username===this.props.item.Username ?
                        <TouchableOpacity onPress={()=> this.deleteReview() } style={{marginTop:10,position:'absolute',right:20}}>
                        <Icon
                        name='trash'
                        size={25}
                        />
                        </TouchableOpacity> : <View/>
                    }
                    
                    
                </View>
                <View style={{padding:20,width:Dimensions.get("window").width}}>
                        <Text style={{marginHorizontal:10,fontSize:15,justifyContent: 'center'}}>{this.props.item.Content}</Text>
                        <View style={{flexDirection:'row'}}>
                        {
                            this.state.Img.map((element,index)=>{
                                return <UrlComponent key ={index} item={{img:element,demension: 100,radius:0}}/>
                            })
                        }
                        </View>
                        <Text style={{fontSize:14,color:'#bbb',marginLeft:20}}>{this.getDate()}</Text>
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
      newArrivalsItems: state.NewArrivalsReducer.items,
      userInfo : state.LoginReducer.user.data,
    };
  }
export default connect(mapStateToProps, {deleteReviews})(FeedbackComponent);