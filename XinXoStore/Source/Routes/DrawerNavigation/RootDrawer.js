import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import DrawerContent from './DrawerContent';
import HomeScreenStack from './drawer-stack/HomeScreenStack';
import SettingScreenStack from './drawer-stack/SettingScreenStack';

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
          name="SettingsScreensStack" component={SettingScreenStack} />
      </Drawer.Navigator>
    );
  }

}

