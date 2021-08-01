import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ShoppingCart from "../../../Views/shoppingCart/ShoppingCart";
import CheckoutSuccess from "../../../Views/checkout/CheckoutSuccess";
import AddressScreen from "../../../Views/address/AddressScreen";
import ChooseAddressScreen from "../../../Views/address/ChooseAddressScreen";
import HomeScreen from "../../../Views/HomeScreen";
import CheckoutScreen from "../../../Views/checkout/CheckoutScreen";
import { Image, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'

const Stack = createStackNavigator();

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

  
export default class ShoppingCartScreenStack extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen
                    name="ShoppingCart"
                    component={ShoppingCart}
                    options={{
                        headerLeft: ()=>
                          <NavigationDrawerStructureLeft
                            navigationProps={this.props.navigation}
                          />
                      }}      
                />
                <Stack.Screen
                    name="CheckoutSuccess"
                    component={CheckoutSuccess}
                    options={{ title: ' Checkout ' ,
                        headerRight: ()=> {
                        return (
                            <View style={{flexDirection: 'row'}}>
                            </View>
                        );
                        }
                                        
                        }} 
                    />
                <Stack.Screen
                    name="AddressScreen"
                    component={AddressScreen}
                    options={{ title: 'Add Address ' ,
                        headerRight: ()=> {
                        return (
                            <View style={{flexDirection: 'row'}}>
                            </View>
                        );
                        }
                                        
                        }} 
                        
                />
                <Stack.Screen
                    name="ChooseAddressScreen"
                    component={ChooseAddressScreen}
                    options={{ title: ' Choose Address ' ,
                        headerRight: ()=> {
                        return (
                            <View style={{flexDirection: 'row'}}>
                            </View>
                        );
                        }
                                        
                        }} 
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}   
                    options={{
                    headerLeft: ()=>
                        <NavigationDrawerStructureLeft
                        navigationProps={this.props.navigation}
                        />
                    }}        
                />
                <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ title: ' Checkout ' ,
                        headerRight: ()=> {
                        return (
                            <View style={{flexDirection: 'row'}}>
                            </View>
                        );
                    }
                                    
                    }} 
                />
            </Stack.Navigator>
        );
    }
}