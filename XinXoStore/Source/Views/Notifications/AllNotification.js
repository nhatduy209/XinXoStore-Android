import React from 'react'
import {View , Text, StyleSheet , FlatList,TouchableOpacity, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import RenderNotification from './RenderNotification'
class AllNotifications extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            list: [1,2,3,4,5,6,7,8],
        }
    }


  renderItem = (item) => {
    // console.log(item)
    var navigation = this.props.navigation;
    return(
        <RenderNotification key={item} item  = {item} navigation={navigation}/>
          
    );
  }

  itemSeparator = () => {
    return <View style={{ height: 10}} />;
  };

  render(){
    return(
      
        <View style = {styles.container}>
          {/* <LinearGradient start={{x:0.0, y:0.0}} end={{x:1, y:1}} colors={['rgba(137,213,201,1)','rgba(255,255,255,0)',]} > */}
              <View style={{position:'absolute',elevation:10,zIndex:100,width:'100%',padding:20,flexDirection:'row'}}>
                    <TouchableOpacity style={styles.headerIcon} onPress={() =>this.props.navigation.goBack()}>
                            <Icon
                            size={20}
                            name="chevron-left"
                            color='#000'
                            >
                            </Icon>
                    </TouchableOpacity> 
                        <TouchableOpacity style={[styles.headerIcon,{right:10}]} onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Icon
                            size={20}
                            name="bell"
                            color='#000'
                            >
                            </Icon>
                    </TouchableOpacity>
                </View>
              <ScrollView>
                <View style={styles.TitleBox}>
                <Text style={styles.textHeader}>Notifications</Text> 
                </View>
                
                {
                  this.state.list.map(element=>
                    this.renderItem(element)
                  )
                }
              </ScrollView>
              {/* </LinearGradient> */}
          </View>
      
          
      );
  }
}

function mapStateToProps(state) {
  return {
    newArrivalsItems: state.NewArrivalsReducer.items
  };
}
export default connect(mapStateToProps, {})(AllNotifications);


const styles = StyleSheet.create({
  container : {
    backgroundColor:'#fff',
    height:'100%'
  },
  
  headerIcon: {
    justifyContent:'center',
    width:'100%'
},
textHeader:{
  fontSize:32,
  fontWeight:'bold',
  color:'#000',
  alignSelf:'center',
  paddingTop:20
},
TitleBox:{
  height:100,
  width:'100%',
  justifyContent:'center'
}
})