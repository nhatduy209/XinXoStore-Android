import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../../Views/HomeScreen'
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();


export default class RootDrawer extends React.Component {
  render(){
    return (
        <Drawer.Navigator initialRouteName="Home" 
        drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
  }

}

