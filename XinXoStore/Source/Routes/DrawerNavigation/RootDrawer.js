import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import HomeScreen from '../../Views/HomeScreen'
import DrawerContent from './DrawerContent';
import {Image , View , Text , TouchableOpacity} from 'react-native'
import HomeScreenStack from './drawer-stack/HomeScreenStack';

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  render(){
    return (
        <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen  
           name="Home" component={HomeScreenStack} />
        </Drawer.Navigator>
    );
  }

}

