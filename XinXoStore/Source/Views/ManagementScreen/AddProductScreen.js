import React from 'react'
import { View, Dimensions, StyleSheet,TextInput, Image, Text ,TouchableOpacity, ScrollView,Alert} from 'react-native'
import TestAPI from '../TestAPI';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { FilePath } from '../../Config/FilePath';
import * as ImagePicker from "react-native-image-picker";
import NewArrivalItem from '../homeScreenFlatlist/HomeScreenArrivalsItems.js'
import { addProduct } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction';
import { getListNewArrivals } from '../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';

class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/clothingHome.jpeg"),
                require("../../Images/clothingSlider.jpeg"),
                require("../../Images/clothingSlider2.jpeg"),
              ],
            emptyImg:require("../../Images/emptyImage.png"),
            url : "img",
            Name: "",
            Rating: 3,
            img: "img",
            liked: false,
            prices: "",
            ownerId: this.props.userInfo.key,
            ownerShop: this.props.userInfo.user.Username,
            PathImageDevice: "",
            Describe: "",
          };
    }
    componentDidMount() {
        // console.log('userinfo')
        // console.log(this.props.userInfo);
        // var testApi = new TestAPI()
        // testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    handlePhotos = () => {
        const Options = {};
        ImagePicker.launchImageLibrary(Options, response => {
            if(response.assets){
                console.log('IMAGE CHOOSE ', response.assets[0].fileName)
                this.setState({ url: response.assets[0].uri })
                this.setState({ img: response.assets[0].fileName })
                this.setState({ PathImageDevice: response.assets[0].uri })
            }
        })
      }
    handleSave=() => {
        let imagePath = this.state.img ;
        // console.log(typeof this.state.Name)
        if(this.state.PathImageDevice.length > 0 ){
          imagePath = FilePath.PRODUCT_IMAGE_STORAGE + '/' + this.state.img;
        }
        if(this.state.Name != "" && this.state.prices != "" && this.state.img != "") {
            this.props.addProduct(this.state.Name,imagePath,this.state.prices,this.state.ownerId,this.state.ownerShop,this.state.PathImageDevice);
            this.props.getListNewArrivals();
            const changed = {changed:true};
            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                  { text: "OK", onPress: () =>  this.props.navigation.navigate('ManagementScreen', changed)}
                ]
              );
        }

    }
    render(){
        return(
            <View style={{backgroundColor: '#fff'}}>
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() =>this.props.navigation.goBack()}>
                            <Icon
                            size={20}
                            name="chevron-left"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}>Add Product</Text>
                        <View style={{height:60,backgroundColor:'#eee',opacity:0.5,width:Dimensions.get('window').width}}>
                        
                        </View>
                    </View>
                
                <ScrollView>
                    <View style={{backgroundColor: '#fff',borderRadius:20}}>
                        <View style={{elevation:5,height:250,width:250,borderRadius:20,left:80,marginTop:50,marginBottom:10}}>
                            {
                                this.state.url != "img" ? 
                                <Image style={{height:250,width:250,borderRadius:20}} source={{uri : this.state.url}}></Image> :
                                <Image style={{height:250,width:250,borderRadius:20}} source={this.state.emptyImg}></Image>
                            }
                        
                        </View>
                        <TouchableOpacity style={styles.cameraIcon} onPress={this.handlePhotos}>
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
                                    <TextInput onChangeText={value=> this.setState({Name: value})} style={{fontSize:18}} placeholder={'Type Name here'}></TextInput>
                                </View>
                            </View>
                        
                            <View style={styles.infoBox}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Price</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({prices: value})} style={{fontSize:18}} placeholder={'Type price here'}></TextInput>
                                </View>
                            </View>
                       
                            <View style={styles.infoBox}>
                                <Text style={{marginTop:10,marginHorizontal:20,fontSize:20,fontWeight:'bold'}}>Describe</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({Describe: value})} style={{fontSize:18}} placeholder={'Type Describe here'}></TextInput>
                                </View>
                            </View>
                        <View style={{backgroundColor: '#fff',paddingHorizontal:30,paddingBottom:20,alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.handleSave}>
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
        userInfo : state.LoginReducer.user.data,
    };
  }
export default connect(mapStateToProps, {getListNewArrivals,addProduct})(AddScreen);
const styles = StyleSheet.create({
    detailInfo: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginHorizontal: 25,
    },
    cameraIcon: {
        alignSelf: 'center',
        position:'absolute',
        left:180,bottom:0,
        backgroundColor: '#eee',
        padding:10,
        borderRadius:50,
        elevation:6,marginBottom:10
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