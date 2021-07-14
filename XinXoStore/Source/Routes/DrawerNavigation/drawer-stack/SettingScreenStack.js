import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import { Image, View, TouchableOpacity, StyleSheet , Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { getListNewArrivals } from '../../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';
import { connect } from 'react-redux';
import ChangePasswordScreen from '../../../Views/settingScreens/ChangePasswordScreen';
import SettingScreen from '../../../Views/settingScreens/SettingScreen';
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



const NavigationBack = props => {
  //Structure for the navigatin Drawer
  const goBack = () => {
    //Props to open/close the drawer
    props.navigationProps.goBack();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={goBack}>
        {/*Donute Button Image */}
        <Text>
              Back
        </Text>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})