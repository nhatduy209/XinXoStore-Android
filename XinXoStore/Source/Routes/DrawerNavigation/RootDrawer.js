import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import DrawerContent from './DrawerContent';
import ItemManagementScreenStack from './drawer-stack/ItemManagementScreenStack'
import HomeScreenStack from './drawer-stack/HomeScreenStack';
import SettingScreenStack from './drawer-stack/SettingScreenStack';
import UserProfileStack from '../BottomNavigation/UserProfileScreenStack';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  render() {
    return (
      <Drawer.Navigator
      drawerStyle={{opacity:0.95,borderTopRightRadius:10,borderBottomRightRadius:10,backgroundColor:'#f7f7f7'}}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="HomeStack" component={HomeScreenStack} />

        <Drawer.Screen
          name="ItemManagementScreenStack" component={ItemManagementScreenStack} />

        <Drawer.Screen
          name="SettingsScreensStack" component={SettingScreenStack} />

        <Drawer.Screen
          name="ProfileUserStack" component={UserProfileStack} />
      </Drawer.Navigator>
    );
  }

}

