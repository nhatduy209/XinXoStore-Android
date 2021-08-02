import React from 'react';
import { Text, View, Dimensions, TouchableOpacity,Image } from 'react-native';
import TestAPI from '../TestAPI';
import UrlComponent from './UrlRender';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FeedbackComponent extends React.Component {
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
        const array = Object.values(this.props.item.Img);
        // console.log(array);
        this.setState({Img:array})
    }
    getDate = () =>{
        var date = new Date();
        return date.getMonth() +'/'+date.getDate()+'/'+date.getFullYear();
    }
    like = () =>{
        this.setState({like: !this.state.like});
    }
    render() {
        return (
            <View >
                <View style={{height:50,flexDirection: 'row',width:Dimensions.get("window").width,borderTopWidth:1,borderTopColor:'#eee'}}>
                <UrlComponent item={{img:this.props.item.Avatar,demension: 40,radius:50}}/>
                    <View>
                        <Text style={{paddingTop:10,fontSize:14,justifyContent: 'center'}}>{this.props.item.UserName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {/* <StarRating item={{Rating: this.props.item.Rating}}/> */}
                            <StarRating
                            fullStarColor='yellow'
                            rating={this.props.item.Rating}
                            maxStars={5}
                            starSize={20}
                            starStyle={{paddingHorizontal:3}}
                            />
                            <Text style={{fontSize:12,color:'#bbb'}}>{this.props.item.Rating}/5</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{paddingTop:20,position: 'absolute',right:50}} onPress={()=>this.like()}>
                            <Icon
                            size={20}
                            name="heart"
                            color={this.state.like ? '#f00' : '#ccc'}
                            >
                            </Icon>
                    </TouchableOpacity>
                </View>
                <View style={{padding:20,width:Dimensions.get("window").width}}>
                        <Text style={{marginHorizontal:10,fontSize:15,justifyContent: 'center'}}>{this.props.item.Content}</Text>
                        <View style={{flexDirection:'row'}}>
                        {
                            this.state.Img.map((element,index)=>{
                                return <UrlComponent key ={index} item={{img:element,demension: 60,radius:0}}/>
                            })
                        }
                        </View>
                        <Text style={{fontSize:14,color:'#bbb'}}>{this.getDate()}</Text>
                </View>
            </View>
        )
    }
}