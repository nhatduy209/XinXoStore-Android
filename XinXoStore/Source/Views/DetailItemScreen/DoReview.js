import React from 'react';
import { Text, View,Dimensions, Modal,StyleSheet, TouchableOpacity, TextInput, Image, TouchableWithoutFeedback,ScrollView } from 'react-native';
import TestAPI from '../TestAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { FilePath } from '../../Config/FilePath';
import StarRating from 'react-native-star-rating';
import * as ImagePicker from "react-native-image-picker";
import { addReviews } from '../../redux/action/ReviewAction/ReviewAction.js';
import { getListReviews } from '../../redux/action/ReviewAction/ReviewAction.js';

class DoReviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            images: [
                require("../../Images/camera.png"),
                require("../../Images/gallery.png"),
              ],
            url: [],
            Rating: 0,
            Content:"",
            ProductId:this.props.item.key,
            ShopId:this.props.item.ownerId,
            UserId:this.props.userInfo.key,
            UserName:this.props.userInfo.user.Username,
            Img:[],
            Avatar:this.props.userInfo.user.Avatar,
            visible:false,
        }
    }

    componentDidMount() {
        // var testApi = new TestAPI()
        // testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    onStarRatingPress(rating) {
        this.setState({
          Rating: rating
        });
      }
    doReview =() =>{
        const data = {
            Content:this.state.Content,
            Img: this.state.Img,
            ProductId: this.state.ProductId,
            Rating: this.state.Rating,
            ShopId: this.state.ShopId,
            UserId: this.state.UserId,
            Username: this.state.UserName,
            Url:this.state.url,
            Avatar:this.state.Avatar
        }
        if(this.state.Content!==""){
            this.props.addReviews(data);
            this.props.getListReviews(this.state.ShopId);
        }
    }
    handleGallery = () => {
        const Options = {};
        var Url = this.state.url;
        var Img = this.state.Img;
        ImagePicker.launchImageLibrary(Options, response => {
            if(response.assets){
                // console.log('IMAGE CHOOSE ', response.assets[0].fileName)
                response.assets.forEach((element)=>{
                    Url.push(element.uri);
                    Img.push(FilePath.REVIEW_IMAGE_STORAGE + '/' +element.fileName)
                })
                this.setState({ url: Url })
                this.setState({ Img: Img })
            }
        })
      }
      handleCamera = () => {
        const Options = {};
        var Url = this.state.url;
        var Img = this.state.Img;
        ImagePicker.launchCamera(Options, response => {
            if(response.assets){
                response.assets.forEach((element)=>{
                    Url.push(element.uri);
                    Img.push(FilePath.REVIEW_IMAGE_STORAGE + '/' +element.fileName)
                })
                this.setState({ url: Url })
                this.setState({ Img: Img })
            }
        })
      }
    removeImage =(key) =>{
        const url = this.state.url.filter((element,index)=>{return index!==key});
        const Img = this.state.Img.filter((element,index)=>{return index!==key});
        this.setState({url:url})
        this.setState({Img:Img})
    }
    render() {
        return (
            <View style={{elevation:6,marginVertical:10}}>
                <View style={{height:this.state.blur,backgroundColor: '#ddd',position: 'absolute',zIndex:20,width: Dimensions.get('window').width,opacity:0.8}}></View>
                <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                    
                    <View style={{backgroundColor: 'rgb(255,8,74)',width:250,alignSelf: 'center',marginTop:600,padding:10,borderRadius:10,elevation:6}}>
                        <View style={{flexDirection:'row'}}>
                            <TouchableWithoutFeedback  onPress={()=>{this.setState({visible:false})
                        this.handleCamera()}}>
                            <View style={{width:'50%'}}>
                            <Image style={{height:70,width:70,alignSelf: 'center'}} source={this.state.images[0]}/>
                            </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{this.setState({visible:false})
                        this.handleGallery()}}>
                                <View style={{width:'50%'}}>
                            <Image style={{height:70,width:70,alignSelf: 'center'}} source={this.state.images[1]}/>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({visible:false})}>
                            <Icon
                            color='#fff'
                            size={20}
                            name="chevron-down"
                            style={{justifyContent:'center',alignSelf:'center'}}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Text style={[styles.textTitles,{width:'90%',padding:10}]}>Type Review</Text>
                <View style={{alignSelf:'center',width:'40%'}}>
                    <StarRating
                    fullStarColor='yellow'
                    rating={this.state.Rating}
                    maxStars={5}
                    starSize={20}
                    animation="rotate"
                    starStyle={{paddingHorizontal:3}}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TextInput onChangeText={value=> this.setState({Content: value})} placeholder="type review" style={{borderColor:'#ccc',borderBottomWidth:0.7,width:'85%',margin:10}}></TextInput>
                    <TouchableOpacity onPress={()=>this.doReview()}>
                        <Icon
                        size={20}
                        name="paper-plane"
                        style={{justifyContent:'center',marginTop:30}}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal style={{backgroundColor:'#eee',flexDirection: 'row'}}>
                    {
                        this.state.url !== null ? 
                        this.state.url.map((element,index)=>{
                            var key = index;
                            return(
                                <View key={key}>
                                    <Image key={key} style={{height:70,width: 70,marginVertical:20,marginHorizontal:10}} source={{uri : element}}/>
                                    <TouchableWithoutFeedback onPress={()=>this.removeImage(key)}>
                                        <Icon
                                        size={10}
                                        name='minus'
                                        style={{padding:5,backgroundColor:'rgba(255,255,255,1)',borderRadius:20, position: 'absolute',right:0,marginTop:15}}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            
                        )}) : <View></View>
                    }
                    <TouchableOpacity 
                    onPress={()=>{
                        this.setState({visible:true})
                    }} style={{padding:20,justifyContent: 'center'}}>
                    <Icon
                    size={30}
                    name='camera'
                    style={{alignSelf: 'center',opacity:0.7}}/>
                    <Text>Add Image</Text>
                    </TouchableOpacity>
                </ScrollView>
                
                
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
export default connect(mapStateToProps, {addReviews,getListReviews})(DoReviewComponent);
const styles = StyleSheet.create({
    textTitles : {
        fontSize:21,
        fontWeight: '700',
        width:'60%'
    },
    detailTitle: {
        fontSize:18,
        alignSelf: 'center',
        marginVertical:20,
        fontWeight:'bold',
        textAlign: 'center',
    },
});