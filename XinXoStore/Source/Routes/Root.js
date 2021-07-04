import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
import RootDrawer from './DrawerNavigation/RootDrawer';
import SignUpScreen from '../Views/SignUpScreen';
import ShoppingCart from '../Views/shoppingCart/ShoppingCart';

const Stack = createStackNavigator();
class Root extends React.Component {

  render(){
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
          name="HomeScreen" component={RootDrawer} 
          />
          <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
  }
}

export default Root;