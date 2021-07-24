import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../../Views/HomeScreen";
import { Image, View, TouchableOpacity } from 'react-native'
import BillScreen from "../../../Views/bill/BillScreen";
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

  
export default class BillScreenStack extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen
                    name="Bill"
                    component={BillScreen}
                    options={{
                        headerLeft: ()=>
                          <NavigationDrawerStructureLeft
                            navigationProps={this.props.navigation}
                          />
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
            </Stack.Navigator>
        );
    }
}