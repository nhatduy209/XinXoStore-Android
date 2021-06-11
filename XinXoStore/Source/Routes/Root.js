import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
const Stack = createStackNavigator();

class Root extends React.Component {
  render(){
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
  }
}

export default Root;