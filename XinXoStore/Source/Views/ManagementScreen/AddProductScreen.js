import React from 'react'
import { Modal,View, Dimensions, StyleSheet,TextInput, Image, Text ,TouchableOpacity, ScrollView,Alert, TouchableWithoutFeedback} from 'react-native'
import TestAPI from '../TestAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { FilePath } from '../../Config/FilePath';
import * as ImagePicker from "react-native-image-picker";
import { addProduct } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction';
import { getListNewArrivals } from '../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';

class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/error.png"),
                require("../../Images/camera.png"),
                require("../../Images/camera (1).png"),
                require("../../Images/gallery.png"),
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
            Description: "",
            Category: "",
            Demension:"",
            visible: false,
            blur:0,
            height: 0,
          };
    }
    componentDidMount() {
        // var testApi = new TestAPI()
        // testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    handleGallery = () => {
        const Options = {};
        ImagePicker.launchImageLibrary(Options, response => {
            if(response.assets){
                this.setState({ url: response.assets[0].uri })
                this.setState({ img: response.assets[0].fileName })
                this.setState({ PathImageDevice: response.assets[0].uri })
            }
        })
      }
      handleCamera = () => {
        const Options = {};
        ImagePicker.launchCamera(Options, response => {
            if(response.assets){
                this.setState({ url: response.assets[0].uri })
                this.setState({ img: response.assets[0].fileName })
                this.setState({ PathImageDevice: response.assets[0].uri })
            }
        })
      }
    renderOption =() => {
        return(
            
                <View style={{height:this.state.height,width:'60%',alignSelf: 'center'}}>
                    <View style={{flexDirection: 'row',width:250,alignSelf: 'center',padding:10,borderRadius:10}}>
                            <TouchableOpacity style={{width:'50%'}} onPress={() => {
                                this.setState({height:0});
                                this.handleCamera();
                            }}>
                            <Image style={{height:50,width:50,alignSelf: 'center'}} source={this.state.images[1]}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'50%'}}  onPress={() => {
                                this.setState({height:0});
                                this.handleGallery();
                            }}>
                            <Image style={{height:50,width:50,alignSelf: 'center'}} source={this.state.images[3]}/>
                            </TouchableOpacity>
                    </View>
                </View>
            
        )
        
    }
    handleSave=() => {
        let imagePath = this.state.img ;
        if(this.state.PathImageDevice.length > 0 ){
          imagePath = FilePath.PRODUCT_IMAGE_STORAGE + '/' + this.state.img;
        }
        if(this.state.Name != "" && this.state.prices != ""){
        // if(this.state.Name != "" && this.state.prices != "" && this.state.img != "" && this.state.Demension != "" && this.state.Category != "" && this.state.Describe != "") {
            this.props.addProduct(this.state.Name,imagePath,this.state.prices,this.state.ownerId,this.state.ownerShop,this.state.PathImageDevice,this.state.Demension,this.state.Category,this.state.Description);
            if(this.props.route.params.prevScreen === 'ItemSoldScreen'){
                this.props.navigation.navigate('ItemSoldScreen')
            }
            else{
                this.props.navigation.navigate('ManagementScreen', {changed:true,prevScreen:'addScreen',reload:true})
            }
        }else{
            this.setState({visible: true})
            this.setState({blur :Dimensions.get('window').height})
        }

    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={()=>this.setState({height:0})}>
            <View style={{backgroundColor: '#fff'}} >
                <View style={{height:this.state.blur,backgroundColor: '#ddd',position: 'absolute',zIndex:20,width: Dimensions.get('window').width,opacity:0.8}}></View>
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
                        <TouchableOpacity style={styles.cameraIcon} onPress={()=>{this.setState({height : 70})}}>
                                <Icon
                                size={30}
                                name="camera"
                                >
                                </Icon>
                        </TouchableOpacity>
                    </View>
                    {
                        this.renderOption()
                    }
                    <Modal animationType="slide" transparent={true} visible={this.state.visible}>
                        <View style={{backgroundColor: 'rgb(255,255,255)',width:250,alignSelf: 'center',marginTop:'50%',padding:10,borderRadius:10}}>
                            <Text style={styles.detailTitle}>Please filling value for all fields</Text>
                            <Image style={{height:70,width:70,alignSelf: 'center'}} source={this.state.images[0]}/>
                                <TouchableOpacity
                                onPress={() => {
                                    this.setState({visible:false})
                                    this.setState({blur:0})
                                }}>
                                <Text style={[styles.textButton,{padding:10}]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View>
                            <View style={styles.infoBox}>
                                {/* <Text style={styles.detailTitle}>Name</Text> */}
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({Name: value})} style={{fontSize:16}} placeholder={'Name'}></TextInput>
                                </View>
                            </View>
                        
                            <View style={styles.infoBox}>
                                {/* <Text style={styles.detailTitle}>Price</Text> */}
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({prices: value})} style={{fontSize:16}} placeholder={'Price'}></TextInput>
                                </View>
                            </View>
                            
                            <View style={styles.infoBox}>
                                {/* <Text style={styles.detailTitle}>Category</Text> */}
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({Category: value})} style={{fontSize:16}} placeholder={'Category'}></TextInput>
                                </View>
                            </View>

                            <View style={styles.infoBox}>
                                {/* <Text style={styles.detailTitle}>Demension</Text> */}
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({Demension: value})} style={{fontSize:16}} placeholder={'Demension'}></TextInput>
                                </View>
                            </View>

                            <View style={styles.infoBox}>
                                {/* <Text style={styles.detailTitle}>Describe</Text> */}
                                <View style={styles.detailInfo}>
                                    <TextInput onChangeText={value=> this.setState({Describe: value})} style={{fontSize:16}} placeholder={'Describe'}></TextInput>
                                </View>
                            </View>

                        <View style={{backgroundColor: '#fff',paddingBottom:20,alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>this.handleSave()}>
                            {/* '#00a04f' */}
                                <View style={[styles.button,{ width:250}]}>
                                    <Text style={styles.textButton}>Add</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        
                    </View>
                </ScrollView>
            </View>           
        </TouchableWithoutFeedback>
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
        paddingHorizontal:10,
        fontSize:18
    },
    detailTitle: {
        fontSize:18,
        alignSelf: 'center',
        marginVertical:20,
        fontWeight:'bold',
        textAlign: 'center',
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
        paddingTop:20
        // marginBottom:10,
        // elevation:6,
    },
    button:{
        backgroundColor: '#003333',
        padding:10,marginTop:20,
        width:'50%',height:50,
        paddingVertical:10,
        borderRadius:10
    },
    textButton: {
        marginHorizontal:20,
        fontSize:24,
        fontWeight:'bold',
        textAlign: 'center',
        color:'#fff',
        
    }
});