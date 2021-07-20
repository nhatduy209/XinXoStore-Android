import React from 'react'
import { View, Dimensions, StyleSheet,TextInput, Image, Text ,TouchableOpacity, ScrollView,Alert} from 'react-native'
import TestAPI from '../TestAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { FilePath } from '../../Config/FilePath';
import NewArrivalItem from '../homeScreenFlatlist/HomeScreenArrivalsItems.js'
import { editProduct } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction';
import * as ImagePicker from "react-native-image-picker";
import { getListNewArrivals } from '../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';


class EditScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/clothingHome.jpeg"),
                require("../../Images/clothingSlider.jpeg"),
                require("../../Images/clothingSlider2.jpeg"),
              ],
            url : "img",
            Name:this.props.route.params.data.Name,
            img:this.props.route.params.data.img,
            price: this.props.route.params.data.prices,
            publicDate:this.props.route.params.data.publicDate,
            describe: "",
            Rating: this.props.route.params.data.Rating,
            liked: this.props.route.params.data.liked,
            PathImageDevice: "",
            changed: false,
          };
    }
    componentDidMount() {
        // console.log(this.props.route.params.data);
        // this.setState({})
        // console.log(this.props);
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    handleSave = () => {
        let imagePath = this.state.img ;
        if(this.state.PathImageDevice.length > 0 ){
          imagePath = FilePath.ACCOUNT_IMAGE_STORAGE + '/' + this.state.img;
        }
        const data = {
            Name: this.state.Name,
            Rating: this.state.Rating,
            img: imagePath,
            Key: this.props.route.params.data.key,
            liked: this.state.liked,
            prices: this.state.price,
            publicDate: this.state.publicDate,
            PathImageDevice: this.state.PathImageDevice,
        }
        this.props.editProduct(data);
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
    handlePhotos = () => {
        const Options = {};
        ImagePicker.launchImageLibrary(Options, response => {
            if(response.assets){
                //   console.log('IMAGE CHOOSE ', response.assets[0].fileName)
                this.setState({ url: response.assets[0].uri })
                this.setState({ img: response.assets[0].fileName })
                this.setState({ PathImageDevice: response.assets[0].uri })
            }
        })
      }
    render(){
        return(
            <View style={{backgroundColor: '#fff'}}>
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() => this.props.navigation.goBack()}>
                            <Icon
                            size={20}
                            name="chevron-left"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}>Edit Product</Text>
                        <View style={{height:60,opacity:0.5,width:Dimensions.get('window').width}}>
                        
                        </View>
                </View>
                <View>
                <ScrollView>
                    <View style={{backgroundColor: '#fff',borderRadius:20}}>
                        <View>
                        <Image style={{height:250,width:250,borderRadius:20,left:80,marginTop:50}} source={{uri : this.state.url}}></Image>
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
                                <Text style={styles.itemTitle}>Name</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value => {
                                        this.setState({Name: value});
                                    }} style={{fontSize:16}} placeholder={'Type Name here'}>{this.state.Name}</TextInput>
                                </View>
                            </View>
                        
                            <View style={styles.infoBox}>
                                <Text style={styles.itemTitle}>Price</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value => {
                                        this.setState({price: value});
                                    }} style={{fontSize:16}} placeholder={'Type price here'}>{this.state.price}</TextInput>
                                </View>
                            </View>
                       
                            <View style={styles.infoBox}>
                                <Text style={styles.itemTitle}>Describe</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput style={{fontSize:16}} placeholder={'Type Describe here'}></TextInput>
                                </View>
                            </View>
                       
                            <View style={styles.infoBox}>
                                <Text style={styles.itemTitle}>Public Date</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value => {
                                        this.setState({publicDate: value });
                                    }} style={{fontSize:16}}>{this.state.publicDate}</TextInput>
                                </View>
                            </View>
                        
                        <View style={{backgroundColor: '#fff',paddingHorizontal:30,paddingBottom:20,alignItems: 'center',marginTop:10}}>
                            <TouchableOpacity onPress= {this.handleSave}>
                            {/* '#00a04f' */}
                                <View style={{backgroundColor: '#bbb',padding:15,borderRadius:10,width:Dimensions.get('window').width-140}}>
                                    <Text style={{marginHorizontal:20,fontSize:20,fontWeight:'bold',textAlign: 'center'}}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        
                    </View>
                    
                </ScrollView>
                </View>
            </View>           
        
        );
    }
}
function mapStateToProps(state) {
    // console.log(state);
    return {
        newArrivalsItems: state.NewArrivalsReducer.items,
    };
  }
export default connect(mapStateToProps, {editProduct,getListNewArrivals})(EditScreen);
const styles = StyleSheet.create({
    detailInfo: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 25,
        paddingHorizontal:10,
        borderRadius:10,
        
    },
    itemTitle:{
        marginVertical:10,
        marginHorizontal:20,
        fontSize:16,
    },
    cameraIcon: {
        alignSelf: 'center',
        position:'absolute',
        left:180,bottom:0,
        backgroundColor: '#eee',
        padding:10,
        borderRadius:50
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
        // marginBottom:10,
        // elevation:6,
    }
});