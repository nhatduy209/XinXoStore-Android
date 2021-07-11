import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Dimensions,LayoutAnimation, UIManager } from 'react-native';
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
            array.push({isExpanded: false, ...element});
        });
        
        this.setState({list: array});
    }
    renderItem=({ item}) => {
        var layoutWidthOptions = 0;
        var layoutHeightOptions = 0;
        var layoutWidth = Dimensions.get('window').width-100;
        var layoutWidthText = null;
        if(item.isExpanded){
            layoutWidthOptions = Dimensions.get('window').width - 310;
            layoutWidth = Dimensions.get('window').width- 200;
            layoutHeightOptions = 160;
            layoutWidthText = 130;
        }
        return(
            <View style={{paddingHorizontal:0}}>
                <View style={{flexDirection: 'row',width:Dimensions.get('window').width,paddingStart:10}}>
                    <TouchableOpacity style={{width: layoutWidth,height:180}} onPress={()=> this.changed(item)}>
                        <View style={{position:'absolute',zIndex:10,marginTop:10}}>
                            <UrlComponent item ={item}/>
                        </View>
                           
                        <View style={[styles.item,{paddingHorizontal:20, width: layoutWidth,borderBottomWidth:5,borderRightWidth:5,borderColor: '#aaa',boxShadow:'10px 5px 5px black',}]}>
                            <View style={{marginStart:70}}>
                                <Text style={styles.itemText}>{item.Name}</Text>
                                <Text style={styles.itemText}>{item.prices} VNĐ</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: layoutWidthOptions,height:layoutHeightOptions,
                        overflow: 'hidden',backgroundColor: '#eee',
                        marginTop:10,justifyContent: 'center',position:'relative',left:85
                        }}>
                        <View style={{backgroundColor: '#f00',borderRadius:100,borderBottomWidth:5,borderRightWidth:5,borderColor: '#ddd'}}>
                            <Text style={styles.itemOption}>
                                Edit
                            </Text>
                        </View>
                        <View style={{backgroundColor: '#16c05d',marginTop:10,borderRadius:100,borderBottomWidth:5,borderRightWidth:5,borderColor: '#ddd'}}>
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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
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
            <View style={{backgroundColor: '#eee'}}>
                    <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.Name}
                    ItemSeparatorComponent={this.itemSeparator}
                    style={{marginTop:50}}
                    />
                <View style={styles.AddButton}>
                    <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('AddScreen');
                        // console.log(this.props.route.params)
                    }}>
                     <Text style={styles.textButton}> Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
      newArrivalsItems: state.NewArrivalsReducer.items,
      check: 0,
    };
  }
export default connect(mapStateToProps, {})(ManagementScreen);
  
const styles = StyleSheet.create({
    item: {
        padding:10,
        backgroundColor:'#fff',
        marginTop:10,
        borderRadius:20,
        position: 'absolute',
        height:160,
        left:80,
    },
    itemOption:{
        fontSize:21,
        paddingVertical:15,
        height:60,
        textAlign: 'center',
        fontWeight:'bold',
        color: '#fff'
    },
    itemText:{
        fontSize:18,
        fontWeight:'bold',
    },
    AddButton:{
        position: 'absolute',
            backgroundColor:'#20a0f1',
            width: Dimensions.get('window').width,height:50,
            justifyContent: 'center',
            borderBottomRightRadius:15,
            borderBottomLeftRadius:15
    },
    textButton:{
        padding: 5,
        textAlign: 'center',
        fontSize:24,
        fontWeight:'bold',
        color: '#fff'
    }
})