import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
import RootDrawer from './DrawerNavigation/RootDrawer';
const Stack = createStackNavigator();

class Root extends React.Component {
  render(){
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={RootDrawer} />
        </Stack.Navigator>
    );
  }
}

export default Root;