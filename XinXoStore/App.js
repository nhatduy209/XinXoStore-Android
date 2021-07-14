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
import firebase from 'firebase';
import { Provider } from 'react-redux';
import Store from './Source/redux/Store';


// config database
var config = {
  databaseURL: 'https://xinxostore-8f1e6-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'xinxostore-8f1e6',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

class App extends React.Component {
  render() {
    return (
      <Provider store = {Store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>

    )
  }

}
export default App;
