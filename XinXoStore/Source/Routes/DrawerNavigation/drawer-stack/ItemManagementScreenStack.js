import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Image, View, TouchableOpacity, StyleSheet , Text} from 'react-native'
import { connect } from 'react-redux';
import ManagementScreen from '../../../Views/ManagementScreen/ManagementScreen';
import AddScreen from '../../../Views/ManagementScreen/AddProductScreen';
import EditScreen from '../../../Views/ManagementScreen/EditProductScreen';
import { getListNewArrivals } from '../../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction';

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
class ItemManagementScreenStack extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ManagementScreen"
          component={ManagementScreen}
          options={{
            title: "",headerShown: false,
          }}
          initialParams={{ changed: false }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            title: "", headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{
            headerShown: false,
            title: "",
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

function mapStateToProps(state) {
  return {
    newArrivalsItems: state.NewArrivalsReducer.items,
  };
}
export default connect(mapStateToProps, {getListNewArrivals})(ItemManagementScreenStack);

