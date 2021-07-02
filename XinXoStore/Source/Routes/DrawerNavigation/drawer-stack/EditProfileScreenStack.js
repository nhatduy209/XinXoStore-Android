import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../../../Views/HomeScreen'
import { Image, View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AllNewArrivalsItem from '../../../Views/ListItemScreen/AllNewArrivalsItems';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNRestart from 'react-native-restart';
import { getListNewArrivals } from '../../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';
import { connect } from 'react-redux';
import EditProfileScreen from '../../../Views/EditProfileScreen';
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




export default class EditProfileScreenStack extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            title : "Edit Profile",
            headerLeft: () =>
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
          }}
          
        />
      </Stack.Navigator>
    );
  }

}
