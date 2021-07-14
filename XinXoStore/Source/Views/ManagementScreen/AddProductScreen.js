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
    componentDidMount() {
        // console.log(this.props);
        // var testApi = new TestAPI()
        // testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    render(){
        return(
            <View style={{backgroundColor: '#fff'}}>
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Icon
                            size={20}
                            name="bars"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}>Add Product</Text>
                        <View style={{height:60,backgroundColor:'#eee',opacity:0.5,width:Dimensions.get('window').width}}>
                        
                        </View>
                    </View>
                
                <ScrollView>
                    <View style={{backgroundColor: '#fff',borderRadius:20}}>
                        <View>
                        <Image style={{height:350,width:Dimensions.get('window').width,borderRadius:20}} source={require("../../Images/clothingSlider2.jpeg")}></Image>
                        </View>
                        <TouchableOpacity style={styles.cameraIcon} onPress={() =>this.props.navigation.toggleDrawer()}>
                                <Icon
                                size={30}
                                name="camera"
                                >
                                </Icon>
                        </TouchableOpacity>
                        
                    </View>
                    <View>
                        
                            <View style={styles.infoBox}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Name</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}} placeholder={'Type Name here'}></TextInput>
                                </View>
                            </View>
                        
                            <View style={styles.infoBox}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Price</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}} placeholder={'Type price here'}></TextInput>
                                </View>
                            </View>
                       
                            <View style={styles.infoBox}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Describe</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}} placeholder={'Type Describe here'}></TextInput>
                                </View>
                            </View>
                       
                            <View style={styles.infoBox}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Public Date</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:18}}></TextInput>
                                </View>
                            </View>
                        
                        <View style={{backgroundColor: '#fff',paddingHorizontal:30,paddingBottom:20,alignItems: 'center'}}>
                            <TouchableOpacity>
                            {/* '#00a04f' */}
                                <View style={{backgroundColor: '#ddd',padding:15,borderRadius:10,width:Dimensions.get('window').width-140}}>
                                    <Text style={{marginHorizontal:20,fontSize:20,fontWeight:'bold',textAlign: 'center'}}>Add</Text>
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
    detailInfo: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginHorizontal: 25,
    },
    cameraIcon: {
        alignSelf: 'center',
        position:'absolute',
        right:20,bottom:10,
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
    infoBox:{
        backgroundColor: '#fff',
        padding:10,
        // marginBottom:10,
        // elevation:6,
    }
});