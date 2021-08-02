import React from 'react'
import { View, Dimensions, StyleSheet,TextInput, Image, Modal,Text ,TouchableOpacity, ScrollView,Alert} from 'react-native'
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
                require("../../Images/error.png"),
              ],
            url : "img",
            Name:this.props.route.params.data.Name,
            img:this.props.route.params.data.img,
            price: this.props.route.params.data.prices,
            publicDate:this.props.route.params.data.publicDate,
            Description: this.props.route.params.data.Description,
            Category: this.props.route.params.data.Category,
            Demension: this.props.route.params.data.Demension,
            PathImageDevice: "",
            changed: false,
            visible:false,
            blur:0,
          };
    }
    componentDidMount() {
        // this.setState({})
        // console.log(this.props);
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    handleSave = () => {
        if(this.state.Description !== "" && this.state.Name !== "" && this.state.price !== "" && this.state.publicDate !== ""){
            let imagePath = this.state.img ;
            if(this.state.PathImageDevice.length > 0 ){
              imagePath = FilePath.ACCOUNT_IMAGE_STORAGE + '/' + this.state.img;
            }
            const data = {
                Name: this.state.Name,
                img: imagePath,
                Key: this.props.route.params.data.key,
                prices: this.state.price,
                publicDate: this.state.publicDate,
                PathImageDevice: this.state.PathImageDevice,
                Demension: this.state.Demension,
                Description: this.state.Description,
                Category: this.state.Category,
            }
            this.props.editProduct(data);
            this.props.getListNewArrivals();
            if(this.props.route.params.prevScreen==="ManagementScreen"){
                this.props.navigation.navigate('ManagementScreen', {data,changed:true,prevScreen:'editScreen'})
            }else{
                this.props.navigation.navidate(this.props.route.params.prevScreen)
            }
        }else{
            this.setState({visible: true});
            this.setState({blur:Dimensions.get('window').height})
        }
        
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
                <View style={{height:this.state.blur,backgroundColor: '#ddd',position: 'absolute',zIndex:20,width: Dimensions.get('window').width,opacity:0.8}}></View>

                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() => this.props.navigation.goBack()}>
                            <Icon
                            size={20}
                            name="chevron-left"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}>Edit Product</Text>
                        <View style={{height:60,backgroundColor:'#eee',opacity:0.5,width:Dimensions.get('window').width}}>
                        
                        </View>
                </View>
                <View>
                <ScrollView>
                    <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                        <View style={{backgroundColor: 'rgb(255,255,255)',width:250,alignSelf: 'center',marginTop:'50%',padding:10,borderRadius:10}}>
                            <Text style={styles.detailTitle}>Please filling value for all fields</Text>
                            <Image style={{height:70,width:70,alignSelf: 'center'}} source={this.state.images[3]}/>
                                <TouchableOpacity
                                onPress={() => {
                                    this.setState({visible:false})
                                    this.setState({blur:0})
                                }}>
                                <Text style={[styles.textButton,{padding:10}]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View style={{backgroundColor: '#fff',borderRadius:20}}>
                        <View style={{elevation:5,height:250,width:250,borderRadius:20,left:80,marginTop:50,marginBottom:10}}>
                        <Image style={{height:250,width:250,borderRadius:20}} source={{uri : this.state.url}}></Image>
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
                                <Text style={styles.itemTitle}>Demension</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value => {
                                        this.setState({Demension: value});
                                    }} style={{fontSize:16}} placeholder={'Type Describe here'}>{this.state.Demension}</TextInput>
                                </View>
                            </View>

                            <View style={styles.infoBox}>
                                <Text style={styles.itemTitle}>Category</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value => {
                                        this.setState({Category: value});
                                    }} style={{fontSize:16}} placeholder={'Type Describe here'}>{this.state.Category}</TextInput>
                                </View>
                            </View>
                       
                            <View style={styles.infoBox}>
                                <Text style={styles.itemTitle}>Description</Text>
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value => {
                                        this.setState({Description: value});
                                    }} style={{fontSize:16}} placeholder={'Type Describe here'}>{this.state.Description}</TextInput>
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
                                <View style={{backgroundColor: '#003333',padding:10,marginTop:20,width:Dimensions.get('window').width-140}}>
                                    <Text style={{marginHorizontal:20,fontSize:18,fontWeight:'bold',textAlign: 'center',color:'#fff'}}>Save</Text>
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
        left:180,bottom:5,
        backgroundColor: '#eee',
        padding:10,
        borderRadius:50,
        elevation:6
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
    },
    detailTitle: {
        fontSize:18,
        alignSelf: 'center',
        marginVertical:20,
        fontWeight:'bold',
        textAlign: 'center',
    },
    textButton: {
        marginHorizontal:20,
        fontSize:18,
        fontWeight:'bold',
        textAlign: 'center',
        color:'#000'}
});