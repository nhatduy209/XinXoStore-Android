import React from 'react';
import {ScrollView,StyleSheet, View,TouchableOpacity,Text,Dimensions, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {getListAddress} from '../../redux/action/Address/AddressAction';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RenderCurrentAddress } from './RenderCurrentAddress';
import { setCurrentAddress } from '../../redux/action/Address/AddressAction';

export class ChooseAddressScreen extends React.Component{
    componentDidMount(){
        this.props.getListAddress(this.props.user.data.key);
    }
    renderItem = ({item}) => {
        handleClick=()=>{
            this.props.setCurrentAddress(item);
            this.props.navigation.goBack();
        }
        return(
            <TouchableOpacity style={{backgroundColor:"#fff",padding:10,flexDirection:"row"}} 
            onPress={handleClick}
            >
                <View style={{marginHorizontal:5, maxWidth:250}}>
                    <Text style={{fontWeight:'bold'}}>
                        {item.data.Number+', '+item.data.Street}
                    </Text>
                    <Text style={{color:'gray'}}>
                    {item.data.District+', '+item.data.City}
                    </Text>
                </View>
                {item.data.Default===true ?
                    (
                    <View style={{justifyContent:'flex-end', marginHorizontal:10}}>
                        <Icon name="check-circle" color={"#2f7afb"} size={20} />
                    </View>
                    )
                    :null
                }
            </TouchableOpacity>
        );
    }
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    );
    render(){
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
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                    useNativeDriver={false}
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
        current:state.AddressReducer.current,
    }
}
export default connect(mapStateToProps,{getListAddress,setCurrentAddress})(ChooseAddressScreen)

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
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});