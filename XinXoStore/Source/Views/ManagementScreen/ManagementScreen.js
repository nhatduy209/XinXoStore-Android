import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView,Alert } from 'react-native'
import { Dimensions,LayoutAnimation, UIManager } from 'react-native';
// import {LinearGradient} from 'react-native-linear-gradient';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import TestAPI from '../TestAPI';
import UrlComponent from './UrlRender';
import { deleteProduct } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction';
import { getListNewArrivals } from '../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';

const options = ['Edit','Delete'];
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
class ManagementScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            list: [],
        }
    }
    componentDidMount() {
        const array = this.state.list;
        this.props.newArrivalsItems.data.listItem.forEach((element, index) => {
            // console.log(this.props.userInfo.key)
            if(element.ownerId === this.props.userInfo.key)
            {
                array.push({isExpanded: false, ...element});
            }
        });
        
        this.setState({list: array});
    }
    componentDidUpdate(){
        // console.log( 'params' );
        // console.log(this.props.route.params);
        // console.log(this.props.newArrivalsItems.data.listItem);
        if(this.props.route.params.changed){
            console.log('true')
            const array = [];
            this.props.newArrivalsItems.data.listItem.forEach((element, index) => {
                // console.log(this.props.userInfo.key)
                if(element.ownerId === this.props.userInfo.key)
                {
                    array.push({isExpanded: false, ...element});
                }
            });
            this.setState({list: array});
            this.props.route.params.changed = false;
        }
        
    }
    deleteHandle = (item)=>{
        var list = this.props.newArrivalsItems.data.listItem.filter((element)=>{return element.key != item.key})
        
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                {text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
              { text: "OK", onPress: () =>  {this.props.deleteProduct(item.img,item.key)
                this.props.getListNewArrivals();
                this.props.newArrivalsItems.data.listItem = list;
                this.props.route.params.changed = true;
                console.log('deleted')
            }}
            ]
          );
    }
    renderItem=({ item}) => {
        
        const data = {data: item,navigation: this.props.navigation};
        var layoutWidthOptions = 0;
        var layoutHeightOptions = 0;
        var layoutWidth = Dimensions.get('window').width-200;
        var layoutWidthText = null;
        var icon = 'chevron-left';
        var leftRange = 15;
        if(item.isExpanded){
            layoutWidthOptions = Dimensions.get('window').width - 290;
            layoutHeightOptions = 120;
            layoutWidth = Dimensions.get('window').width-240;
            layoutWidthText = 130;
            icon = 'chevron-right';
            leftRange = -30;
        }
        return(
            <View style={{paddingHorizontal:10,marginBottom:10}}>
                <View style={{flexDirection: 'row',width:Dimensions.get('window').width,paddingStart:10,}}>
                    <View style={{width: Dimensions.get('window').width-150,height:140,flexDirection: 'row',left: leftRange}} >
                        <View style={{marginVertical:10}}>
                            <UrlComponent item ={item}/>
                        </View>
                           
                        <View style={[styles.item,{ width: layoutWidth}]}>
                            <View>
                                <Text style={styles.itemText}>{item.Name}</Text>
                                <Text style={styles.itemText}>{item.prices} VNĐ</Text>
                            </View>
                            <TouchableOpacity style={{right:25,top:50,position: 'absolute',padding:5,borderRadius:50}} onPress={()=> this.changed(item)}>
                                <Icon name={icon} backgroundColor="#3b5998">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{ width: layoutWidthOptions,height:layoutHeightOptions,
                        overflow: 'hidden',backgroundColor: '#eee',
                        marginTop:20,flexDirection: 'row',left:15
                        }}>
                        <TouchableOpacity style={{backgroundColor: '#ddd',justifyContent: 'center',width:50}}
                            onPress={()=> {
                            this.props.navigation.navigate('EditScreen',data);
                        }}>
                            <Text style={styles.itemOption}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#ccc',justifyContent: 'center',width:70,borderTopEndRadius:10,
                        borderBottomEndRadius:10}} onPress={() => this.deleteHandle(item)}>
                            <Text style={styles.itemOption}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
            

        )
        
    }

    changed = (item) => {
        // LayoutAnimation.configureNext();
        const array = this.state.list;
        const indexItem = array.indexOf(item);
        array.forEach((item, index)=>{
            // console.log(index +' ' + indexItem);
            index === indexItem ? array[index].isExpanded = !array[index].isExpanded:array[index].isExpanded = false;
        })
        this.setState({list:array})
    }
    componentWillUnmount() {
        // console.log('unmounted')
        this._isMounted = true;
    }
    render() {
        // console.log(this.state.url);
        return(
            <View>
                <View style={{position: 'absolute',zIndex:10,justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.navigationIcon} onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Icon
                            size={20}
                            name="bars"
                            >
                            </Icon>
                    </TouchableOpacity>
                        <Text style={styles.textHeader}></Text>
                        <View style={{height:60,backgroundColor:'#eee',opacity:0.5,width:Dimensions.get('window').width}}>
                        
                        </View>
                </View>
                <ScrollView style={{backgroundColor: '#fff'}}>
                    <View style={{height:150,backgroundColor:'#fff'}}>
                            <Text style={{fontSize:36,fontWeight:'bold',top:80,left:20}}>Management</Text>  
                    </View>
                    <View style={styles.AddButton}>
                            <TouchableOpacity onPress={()=> {
                                this.props.navigation.navigate('AddScreen');
                            }}>
                            <Text style={styles.textButton}> Add</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.Name}
                    ItemSeparatorComponent={this.itemSeparator}
                    />
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
export default connect(mapStateToProps, {getListNewArrivals,deleteProduct})(ManagementScreen);
  
const styles = StyleSheet.create({
    item: {
        elevation:6,
        padding:10,
        backgroundColor:'#fff',
        marginTop:20,
        borderRadius:10,
        height:120,
        paddingHorizontal:10,
        borderColor: '#aaa',
    },
    itemOption:{
        fontSize:16,
        paddingVertical:20,marginHorizontal:10,
        height:60,
        fontWeight:'bold',
        color: '#000',
    },
    itemText:{
        fontSize:14,
        fontWeight:'bold',
        width:150
    },
    AddButton:{
    backgroundColor:'#000',
    width: Dimensions.get('window').width,height:50,
    justifyContent: 'center',
    elevation:6
    },
    textButton:{
        padding: 5,
        textAlign: 'center',
        fontSize:24,
        fontWeight:'bold',
        color: '#fff'
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
})