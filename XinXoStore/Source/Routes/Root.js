import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
import RootDrawer from './DrawerNavigation/RootDrawer';
import SignUpScreen from '../Views/SignUpScreen';
const Stack = createStackNavigator();
import {Image , View , Text , TouchableOpacity} from 'react-native';
import BillScreen from '../Views/bill/BillScreen'
import ModelAddFail from '../Views/shoppingCart/ModelAddFail';
class Root extends React.Component {

  render(){
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          {/* <Stack.Screen name="ModelAddFail" component={ModelAddFail} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen
         name="RootDrawer" component={RootDrawer} 
         />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
  }
}

export default Root;