import React from 'react';
import {ScrollView,StyleSheet, View,TouchableOpacity,Text,Dimensions, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {getListAddress} from '../../redux/action/Address/AddressAction';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RenderCurrentAddress } from './RenderCurrentAddress';

export class ChooseAddressScreen extends React.Component{
    componentDidMount(){
        this.props.getListAddress(this.props.user.data.key);
    }
    renderItem(item){
        console.log("ITEM",item.item);
        <RenderCurrentAddress item={item} />
    }
    handleDelete=()=>{
        
    }
    render(){
        console.log("ADDRESS  CHOOSE==========",this.props.address.data);
        console.log("ADDRESS  CURRENT ==========",this.props.current);
        return(
            <ScrollView>
                <TouchableOpacity style={styles.container} >
                 {/* onPress={()=>this.props.navigation.navigate("AddressScreen")}> */}
                    <Icon name="plus" size={20} color={"#2f7afb"}/>
                    <Text>
                         Thêm địa chỉ
                    </Text>
                </TouchableOpacity>
                <SwipeListView
                    data={this.props.address.data}
                    renderItem={this.renderItem}
                    keyExtractor={data =>data.Name}
                    renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.btnDelete}>
                        <Icon.Button name="trash" 
                            paddingLeft={15}
                            paddingVertical={15}
                            alignItems={"center"}
                            justifyContent={"center"}
                            backgroundColor={"red"}
                            onPress={()=>this.handleDelete}
                        >
                        </Icon.Button>
                    </View>
                    )}
                    rightOpenValue={-75}
                    nestedScrollEnabled
                />
            </ScrollView>
        )
    }
}
function mapStateToProps(state){
    return {
        address:state.AddressReducer.address,
        user:state.LoginReducer.user,
        current:state.AddressReducer.current,
        add:state.AddressReducer.add
    }
}
export default connect(mapStateToProps,{getListAddress})(ChooseAddressScreen)

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems:'center',
        borderColor:'gray',
        borderWidth:1,
        width: Dimensions.get("window").width - 20,
        borderRadius:5,
        padding:5
    },
    btnDelete:{
        justifyContent:'center',
        alignSelf:'flex-end',
        alignItems:'center',
    },
});