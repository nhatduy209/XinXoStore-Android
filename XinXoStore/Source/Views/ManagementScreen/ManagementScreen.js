import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Dimensions,LayoutAnimation, UIManager } from 'react-native';
// import {LinearGradient} from 'react-native-linear-gradient';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import TestAPI from '../TestAPI';
import UrlComponent from './UrlRender';

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
    renderItem=({ item}) => {
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
                        <View style={{backgroundColor: '#ddd',justifyContent: 'center',width:50}}>
                            <Text style={styles.itemOption}>
                                Edit
                            </Text>
                        </View>
                        <View style={{backgroundColor: '#ccc',justifyContent: 'center',width:70,borderTopEndRadius:10,
                    borderBottomEndRadius:10}}>
                            <Text style={styles.itemOption}>
                                Delete
                            </Text>
                        </View>
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
    render() {
        // console.log(this.state.url);
        return(
            <ScrollView style={{backgroundColor: '#fff'}}>
                <View style={{height:100,justifyContent: 'center',backgroundColor:'#fff'}}>
                        <Text style={{fontSize:36,fontWeight:'bold',left:40}}>Management</Text>  
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
        )
    }
}

function mapStateToProps(state) {
    return {
      newArrivalsItems: state.NewArrivalsReducer.items,
      userInfo : state.LoginReducer.user.data,
    };
  }
export default connect(mapStateToProps, {})(ManagementScreen);
  
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
    }
})