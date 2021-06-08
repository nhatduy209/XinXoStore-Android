/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import Root from './Source/Routes/Root'
class App extends React.Component {
  render(){
    return(
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    )
  }
     
} 
export default App;
