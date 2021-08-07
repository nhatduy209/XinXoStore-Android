import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../../../Views/HomeScreen'
import { Image, View, TouchableOpacity, StyleSheet,Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AllNewArrivalsItem from '../../../Views/ListItemScreen/AllNewArrivalsItems';
import DetailItem from '../../../Views/DetailItemScreen/DetailItemArrival';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShoppingCart from '../../../Views/shoppingCart/ShoppingCart';
import { getListNewArrivals } from '../../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';
import { connect } from 'react-redux';
import EditProfileScreen from '../../../Views/EditProfileScreen';
import ManagementScreen from '../../../Views/ManagementScreen/ManagementScreen';
import AddScreen from '../../../Views/ManagementScreen/AddProductScreen';
import EditScreen from '../../../Views/ManagementScreen/EditProductScreen';
import { GetAllProduct } from '../../../redux/action/ShoppingCartAction/ShoppingCartAction';
import AllReviews from '../../../Views/DetailItemScreen/AllReview';
import AllReviews from '../../../Views/DetailItemScreen/AllReview';
import ItemManagementScreenStack from './ItemManagementScreenStack'
import ManagementScreen from '../../../Views/ManagementScreen/ManagementScreen';
import AddScreen from '../../../Views/ManagementScreen/AddProductScreen'
import SettingScreens from '../../../Views/settingScreens/SettingScreen';
import SettingScreenStack from './SettingScreenStack';
import PublisherProfileScreen from '../../../Views/PublisherProfileScreen';
import UserProfileStack from '../../BottomNavigation/UserProfileScreenStack';
import CommentStoreScreen from '../../../Views/CommentStoreScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructureLeft = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.openDrawer();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={require('../../../Images/drawer.png')}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};



class HomeScreenStack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortUpOption: false
    }

  }
  componentDidMount(){
    this.props.GetAllProduct(this.props.user.key);
  }
  sortUp = () => {
    this.setState({ sortUpOption: true })
    this.props.getListNewArrivals(true);
  }

  sortDown = () => {
    this.setState({ sortUpOption: false });
    this.props.getListNewArrivals();
  }
  handleShoppingCart =()=>{
    this.props.navigation.navigate("ShoppingCartScreenStack",{screen:"ShoppingCart"});
  }
  render() {
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}   
        options={{
          headerRight:()=>{
            return(
              <View style={{position:'absolute'}}>
                <TouchableOpacity 
                onPress={this.handleShoppingCart}>
                    <Text style={styles.noCart}>{this.props.noCart.length}</Text>
                      <Icon
                        size={25}
                        name="shopping-cart"
                        style = {{ paddingRight : 15 }}
                        color = "#bbbbbb"
                      >
                      </Icon>
                </TouchableOpacity>
              </View>
            )
          },
          headerLeft: ()=>
            <NavigationDrawerStructureLeft
              navigationProps={this.props.navigation}
            />
        }}        
      />

      <Stack.Screen
        name="NewArrivalsScreen"
        component={AllNewArrivalsItem}   
        options={{ title: ' New Arrivals ' ,
                    headerRight: ()=> {
                      return (
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity>
                                <Icon
                                  size={25}
                                  name="filter"
                                  style = {{ paddingRight : 15 }}
                                  color = "#bbbbbb"
                                >
                                </Icon>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                        
          }} 
      />
      <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            title: "Edit Profile",
            headerLeft: () =>
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
          }}
        />
        <Stack.Screen
          name="ProfileUserStack"
          component={UserProfileStack}
          options={{
            title: "Edit Profile",
            headerLeft: () =>
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
          }}
      /> 
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{
            headerShown: false,
            title: "",
            headerLeft: () =>
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
          }}
        />
        <Stack.Screen
          name="DetailItemScreen"
          component={DetailItem}
          options={{
            title: ' Detail ', headerShown: false,
            headerRight: () => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <Icon
                      size={25}
                      name="ellipsis-v"
                      style={{ paddingRight: 15 }}
                      color="#000"
                    >
                    </Icon>
                  </TouchableOpacity>
                </View>
              );
            },
            headerStyle: {
              // backgroundColor: '#',
              height: 56,
              elevation: null,
              backgroundColor: '#FFF',
            }
          }}
        >
        </Stack.Screen>
        <Stack.Screen
          name="ManagementScreen"
          component={ManagementScreen}
          options={{
            title: "", headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            title: "", headerShown: false,
          }}
        />

        <Stack.Screen
          name="AllReviews"
          component={AllReviews}
          options={{
            title: "", headerShown: false,
          }}
        />

        <Stack.Screen
          name="PublisherProfileScreen"
          component={PublisherProfileScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Profile'
          }}

        />


        <Stack.Screen
          name="CommentStoreScreen"
          component={CommentStoreScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Comment'
          }}
        />

      </Stack.Navigator>
    );
  }

}

function mapStateToProps(state) {
  return {
    newArrivalsItems: state.NewArrivalsReducer.items,
    noCart:state.ShoppingCartReducer.items.data,
    user:state.LoginReducer.user.data,
  };
}
export default connect(mapStateToProps, { getListNewArrivals ,GetAllProduct})(HomeScreenStack);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  noCart:{
    position:'absolute',
    alignSelf:'flex-end',
    color:'red',
    fontWeight:'bold'
  }
})