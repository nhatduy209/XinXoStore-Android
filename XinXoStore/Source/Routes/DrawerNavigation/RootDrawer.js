import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import DrawerContent from './DrawerContent';
import ItemManagementScreenStack from './drawer-stack/ItemManagementScreenStack'
import HomeScreenStack from './drawer-stack/HomeScreenStack';
import SettingScreenStack from './drawer-stack/SettingScreenStack';
import ShoppingCartScreenStack from './drawer-stack/ShoppingCartScreenStack';
import UserProfileStack from '../BottomNavigation/UserProfileScreenStack';

const Drawer = createDrawerNavigator();

export default class RootDrawer extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="HomeStack" component={HomeScreenStack} />

        <Drawer.Screen
          name="ItemManagementScreenStack" component={ItemManagementScreenStack} />

        <Drawer.Screen
          name="SettingsScreensStack" component={SettingScreenStack} />
        <Drawer.Screen
          name="ShoppingCartScreenStack" component={ShoppingCartScreenStack} />
        <Drawer.Screen
          name="ProfileUserStack" component={UserProfileStack} />
      </Drawer.Navigator>
    );
  }

}

