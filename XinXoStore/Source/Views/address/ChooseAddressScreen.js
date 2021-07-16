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
    renderItem = ({item}) => {
        return(
        <RenderCurrentAddress item={item.data}/>
            );
    }
    handleDelete=()=>{
        
    }
    componentDidUpdate(){
        
    }
    render(){
        console.log("ADDRESS  CHOOSE==========",this.props.address.data);
        console.log("ADDRESS  CHOOSE==========",JSON.stringify(this.props.address.data.data));
        return(
            <ScrollView>
                <TouchableOpacity style={styles.container}
                 onPress={()=>this.props.navigation.navigate("AddressScreen")}>
                    <Icon name="plus" size={20} color={"#2f7afb"}/>
                    <Text>
                         Thêm địa chỉ
                    </Text>
                </TouchableOpacity>
                {JSON.stringify(this.props.address.data)!='{}'?
                <SwipeListView
                          data={this.props.address.data}
                          renderItem={this.renderItem}
                          keyExtractor={data =>data.key}
                          renderHiddenItem={ (data, rowMap) => (
                            <View style={styles.btnDelete}>
                                <Icon.Button name="trash" 
                                    paddingLeft={15}
                                    paddingVertical={15}
                                    borderRadius={30}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    onPress={()=>this.handleDelete}
                                    backgroundColor={"red"}
                                >
                                </Icon.Button>
                            </View>
                          )}
                          rightOpenValue={-75}
                          nestedScrollEnabled
                        />
                : null
                }
                
            </ScrollView>
        )
    }
}
function mapStateToProps(state){
    return {
        address:state.AddressReducer.address,
        user:state.LoginReducer.user,
        add:state.AddressReducer.add,
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