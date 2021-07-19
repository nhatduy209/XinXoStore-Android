import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { Image, View, TouchableOpacity, StyleSheet , Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { getListNewArrivals } from '../../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';
import { connect } from 'react-redux';
import ChangePasswordScreen from '../../../Views/settingScreens/ChangePasswordScreen';
import SettingScreen from '../../../Views/settingScreens/SettingScreen';
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





class SettingsScreenStack extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SettingsScreen"
          component={SettingScreen}
          options={{
            headerLeft: () =>
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />,
            title: ''
          }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          options = {{
            title : '',
          }}
          component={ChangePasswordScreen}
        />

      </Stack.Navigator>
    );
  }

}

function mapStateToProps(state) {
  return {
    newArrivalsItems: state.NewArrivalsReducer.items,
  };
}
export default connect(mapStateToProps, { getListNewArrivals })(SettingsScreenStack);

