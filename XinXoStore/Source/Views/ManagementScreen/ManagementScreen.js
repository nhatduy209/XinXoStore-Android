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
        var layoutWidth = Dimensions.get('window').width - 20;
        var layoutWidthText = null;
        if(item.isExpanded){
            layoutWidthOptions = Dimensions.get('window').width - 290;
            layoutWidth = 270;
            layoutHeightOptions = 160;
            layoutWidthText = 130;
        }
        return(
            <View style={{flexDirection: 'row' }}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{width: layoutWidth,height:180}} onPress={()=> this.changed(item)}>
                        <View style={styles.item}>
                            <UrlComponent item ={item}/>
                            <View style={{paddingHorizontal:20, width: layoutWidthText}}>
                                <Text style={styles.itemText}>{item.Name}</Text>
                                <Text style={styles.itemText}>{item.prices}</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: layoutWidthOptions,height:layoutHeightOptions,
                        overflow: 'hidden',backgroundColor: '#aaa',borderRadius:10,
                        marginTop:10,justifyContent: 'center'
                        }}>
                        <View style={{backgroundColor: '#f00'}}>
                            <Text style={styles.itemOption}>
                                Edit
                            </Text>
                        </View>
                        <View style={{backgroundColor: '#16c05d'}}>
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
        console.log(this.state.url);
        return(
            <View style={{paddingHorizontal:10}}>
                    <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.Name}
                    ItemSeparatorComponent={this.itemSeparator}
                    style={{marginTop:50}}
                    />
                <View style={styles.AddButton}>
                    <TouchableOpacity>
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
        borderRadius:10,flexDirection: 'row',
    },
    itemOption:{
        fontSize:21,
        paddingVertical: 25,
        height:80,
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