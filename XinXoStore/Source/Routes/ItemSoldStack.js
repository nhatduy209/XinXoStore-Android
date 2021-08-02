import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Views/LoginScreen'
import RootDrawer from './DrawerNavigation/RootDrawer';
import SignUpScreen from '../Views/SignUpScreen';
import AddScreen from '../Views/ManagementScreen/AddProductScreen';
import EditScreen from '../Views/ManagementScreen/EditProductScreen';
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
         <Stack.Screen
         name="EditScreen" component={EditScreen} 
         />
        </Stack.Navigator>
    );
  }
}

export default ItemSoldStack;