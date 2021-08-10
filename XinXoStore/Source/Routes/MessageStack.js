import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RenderBubbleMessage from '../Views/userMessage/RenderBubbleMessage';
import MessageScreen from '../Views/userMessage/MessageScreen';
const Stack = createStackNavigator();

class MessageStack extends React.Component {

  render(){
    return (
        <Stack.Navigator>
          <Stack.Screen 
           options={{
            headerShown: false, // change this to `false`
          }}
          name="RenderBubbleMessage" component={RenderBubbleMessage} />
         <Stack.Screen
         name="MessageScreen" component={MessageScreen} 
         options = { ({route}) => ({ title : route.params.username })}
         />
        </Stack.Navigator>
    );
  }
}

export default MessageStack;