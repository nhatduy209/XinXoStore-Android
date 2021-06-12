import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../../../Views/HomeScreen'
import {Image , View , Text , TouchableOpacity} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructureLeft = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.openDrawer();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={require('../../../Images/drawer.png')}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};




export default class HomeScreenStack extends React.Component {
  render(){
    return (
      <Stack.Navigator>
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

