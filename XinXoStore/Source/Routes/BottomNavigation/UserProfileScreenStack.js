import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditProfileScreen from '../../Views/EditProfileScreen';
import MessageScreen from '../../Views/userMessage/MessageScreen'
import BillScreen from '../../Views/bill/BillScreen'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ItemSoldScreen from '../../Views/itemSold/ItemSoldScreen';
import ItemSoldStack from '../ItemSoldStack';
import RenderBubbleMessage from '../../Views/userMessage/RenderBubbleMessage';
import MessageStack from '../MessageStack';

const Tab = createBottomTabNavigator();

export default class UserProfileStack extends React.Component {
  render() {
    return (
      <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0000ff',
      }}>
        <Tab.Screen name="EditProfileScreen" component={EditProfileScreen} 
        options = {{
          title : 'Edit Profile',
          tabBarBadgeStyle : { color : 'red'},
          tabBarIcon: ({ focused, horizontal, color }) => {
            return <Icon name={'user'} size={22} color={color} />;
          },
        }}/>
        <Tab.Screen name="UserMessageScreen" component={MessageStack}
        options = {{
          title : 'Message',
          tabBarIcon: ({ focused, horizontal, color }) => {
            return <Icon name={'comment'} size={22} color={color} />;
          },
          tabBarBadge : 0
        }} 
        />
         <Tab.Screen name="BillScreen" component={BillScreen}
        options = {{
          title : 'Bill',
          tabBarIcon: ({ focused, horizontal, color }) => {
            return <Icon name={'file-invoice'} size={22} color={color} />;
          },
          tabBarBadge : 0
        }}/>
         <Tab.Screen name="ItemScreen" component={ItemSoldStack}
        options = {{
          title : 'Item',
          tabBarIcon: ({ focused, horizontal, color }) => {
            return <Icon name={'shopping-basket'} size={22} color={color} />;
          },
          tabBarBadge : 0
        }} 
        />

      </Tab.Navigator>
    );
  }

}