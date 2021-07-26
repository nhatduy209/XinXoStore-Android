import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
import RootDrawer from './DrawerNavigation/RootDrawer';
import SignUpScreen from '../Views/SignUpScreen';
import AddScreen from '../Views/ManagementScreen/AddProductScreen';
import ItemSoldScreen from '../Views/itemSold/ItemSoldScreen';
const Stack = createStackNavigator();

class ItemSoldStack extends React.Component {

  render(){
    return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="ItemSoldScreen" component={ItemSoldScreen} />
         <Stack.Screen
         name="AddScreen" component={AddScreen} 
         />
        </Stack.Navigator>
    );
  }
}

export default ItemSoldStack;