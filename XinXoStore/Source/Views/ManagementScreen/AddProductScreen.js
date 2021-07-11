import React from 'react'
import { View, Dimensions, StyleSheet,TextInput, Image, Text ,TouchableOpacity, ScrollView,FlatList} from 'react-native'
import TestAPI from '../TestAPI';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NewArrivalItem from '../homeScreenFlatlist/HomeScreenArrivalsItems.js'
import { editProduct } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction';

class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/clothingHome.jpeg"),
                require("../../Images/clothingSlider.jpeg"),
                require("../../Images/clothingSlider2.jpeg"),
              ],
            url : "img",
          };
    }
    // componentDidMount() {
    //     var testApi = new TestAPI()
    //     testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    // }
    render(){
        return(
            <View>
                <ScrollView>
                    <View style={{backgroundColor: '#04f',height:200,borderBottomRightRadius:100,borderTopLeftRadius:0,flexDirection: 'row'}}>
                        <Text style={{ fontSize:28,fontWeight:'bold',color:'#fff',top:80,right:40,position: 'absolute'}}>Add Product</Text>
                        <View style={{width:160,height:160,position: 'absolute',top:20,left:30,borderRadius:80,padding:10,backgroundColor:'#004dad',}}>
                            <Image style={{width:140,height:140,borderRadius:80}} source={require("../../Images/clothingSlider2.jpeg")}></Image>
                            <TouchableOpacity>
                                <Icon
                                size={24}
                                name="camera"
                                style={styles.cameraIcon}
                                >
                                </Icon>
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                    <View style={{backgroundColor: '#04f'}}>
                        <View style={{backgroundColor: '#eef',borderTopLeftRadius:100,paddingHorizontal:30,paddingVertical:20}}>
                            <View style={{backgroundColor: '#c0dfff',padding:15,borderRadius:70}}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Name</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}}> tao nè</TextInput>
                                </View>
                            </View>
                            
                        </View>
                        <View style={{backgroundColor: '#eef',paddingHorizontal:30,paddingBottom:20}}>
                            <View style={{backgroundColor: '#c0dfff',padding:15,borderRadius:70}}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Price</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}}> 500000VNĐ</TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#eef',paddingHorizontal:30,paddingBottom:20}}>
                            <View style={{backgroundColor: '#c0dfff',padding:15,borderRadius:70}}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Describe</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}}> leather</TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#eef',paddingHorizontal:30,paddingBottom:20}}>
                            <View style={{backgroundColor: '#c0dfff',padding:15,borderRadius:70}}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Public Date</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}}> 30/2/2000</TextInput>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{backgroundColor: '#eef',paddingHorizontal:30,paddingBottom:20,alignItems: 'center'}}>
                            <TouchableOpacity>
                                <View style={{backgroundColor: '#00a04f',padding:15,borderRadius:70,width:Dimensions.get('window').width-140}}>
                                    <Text style={{marginHorizontal:20,fontSize:20,fontWeight:'bold',textAlign: 'center'}}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        
                    </View>
                    
                </ScrollView>
            </View>           
        
        );
    }
}
function mapStateToProps(state) {
    return {
        newArrivalsItems: state.NewArrivalsReducer.items,
    };
  }
export default connect(mapStateToProps, {editProduct})(AddScreen);
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
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        width: Dimensions.get("window").width,
        backgroundColor: "#fff",
        elevation:5
    },
    detailInfo: {
        borderBottomWidth: 1,
        borderColor: '#fff',
        marginHorizontal: 25,
      },cameraIcon: {
        height: 30, width: 30, alignSelf: 'center', marginLeft: 80,bottom:10, color: '#000'
      },
});