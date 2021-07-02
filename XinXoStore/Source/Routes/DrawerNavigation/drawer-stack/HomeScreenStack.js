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




class HomeScreenStack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortUpOption: false
    }

  }

  sortUp = () => {
    this.setState({ sortUpOption: true })
    this.props.getListNewArrivals(true);
  }

  sortDown = () => {
    this.setState({ sortUpOption: false });
    this.props.getListNewArrivals();
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () =>
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
          }}
        />

        <Stack.Screen
          name="NewArrivalsScreen"
          component={AllNewArrivalsItem}
          options={{
            title: ' New Arrivals ',
            headerRight: () => {
              if (this.state.sortUpOption) {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.sortDown}>
                      <Icon
                        size={25}
                        name="sort-up"
                        style={{ paddingRight: 15 }}
                        color="#bbbbbb"
                      >
                      </Icon>
                    </TouchableOpacity>
                  </View>
                );
              }
              else {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this.sortUp}>
                      <Icon
                        size={25}
                        name="sort-down"
                        style={{ paddingRight: 15 }}
                        color="#bbbbbb"
                      >
                      </Icon>
                    </TouchableOpacity>
                  </View>
                );
              }

            }

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
export default connect(mapStateToProps, { getListNewArrivals })(HomeScreenStack);

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