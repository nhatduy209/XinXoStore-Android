import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
import RootDrawer from './DrawerNavigation/RootDrawer';
import SignUpScreen from '../Views/SignUpScreen';
import ShoppingCart from '../Views/shoppingCart/ShoppingCart';
const Stack = createStackNavigator();
import {Image , View , Text , TouchableOpacity} from 'react-native'
import Checkout from '../Views/checkout/CheckoutScreen';

class Root extends React.Component {

  render(){
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
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