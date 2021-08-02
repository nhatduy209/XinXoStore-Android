import React from 'react';
import { Text, View, Dimensions,StyleSheet,TouchableOpacity,Image,ScrollView } from 'react-native';
import TestAPI from '../TestAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeedbackComponent from './RenderFeedback';
import { connect } from 'react-redux';
class AllReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            images: [
                require("../../Images/sold.png"),
                require("../../Images/sold1.png"),
                require("../../Images/sold2.png"),
            ],
            url: "img",
        }
    }

    componentDidMount() {
        // var testApi = new TestAPI()
        // testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    render() {
        return (
            <View >
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() =>this.props.navigation.goBack()}>
                            <Icon
                            size={20}
                            name="arrow-left"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <View style={{height:60,backgroundColor:'#fff',opacity:0.1,width:Dimensions.get('window').width}}>
                        
                        </View>
                </View>
                <View style={{backgroundColor:'#fff',height:60,justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center', fontSize:32,fontWeight:'bold'}}>All Review</Text>
                </View>
                <ScrollView style={{backgroundColor:'#fff',marginBottom:50}}>
                    {this.props.listReview.map((element,index)=>{
                            var item = {Content: element.Content,
                                UserName: element.UserName,
                                Rating:element.Rating,
                                Avatar:element.Avatar,
                                Img:element.Img,
                                key:element.key,
                            }
                        return (<FeedbackComponent key={index} item={item}/>);
                        })}
                </ScrollView>
                
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        listReview: state.ReviewReducer.items.data.listItem,
    };
  }
export default connect(mapStateToProps, { })(AllReviews);
const styles = StyleSheet.create({
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
    }
});