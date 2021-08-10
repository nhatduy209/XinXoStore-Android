import React, { useState, useCallback, useEffect } from 'react'
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getListMessage, sendMessage } from '../../redux/action/MessageAction/MessageAction'
import { connect } from 'react-redux';
import TestAPI from '../TestAPI';
import firebase from 'firebase';

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      url: "img",
    }
  }
  onSend = (value) => {
    this.setState({ messages: GiftedChat.append(this.state.messages, value) });
    this.props.sendMessage(value[0]);
  }

  // componentWillMount() {
  //   firebase.database().ref('Messages/' + 'nhatduy209-thuyety').on('child_added', (value) => {
  //     console.log('VALUE----------------', value.val());
  //       this.setState({ messages: GiftedChat.append(this.state.messages, value.val())  } )
  //   })
  // }

  componentDidMount() {
    const messageKey = this.props.route.params.messageKey;
     firebase.database().ref('Messages/' + messageKey).on('child_added', (value) => {
      console.log('VALUE----------------', value.val());
       this.setState({ messages: GiftedChat.append(this.state.messages, value.val())  } );        
    })
    var testApi = new TestAPI();
    testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
    //this.props.getListMessage();
  }

  componentWillUnmount() {
    const messageKey = this.props.route.params.messageKey;
    // stop listening to firebase 
    firebase.database().ref('Messages/' + messageKey).off('child_added', this.setState({ messages: []  }));
  }


  render() {
    console.log('RENDER STATE -------', this.state.messages)
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        placeholder="type message...."
        user={{
          _id: this.props.user.data.key,
          name: this.props.user.data.user.Username,
          avatar: this.state.url
        }}
      />
    )
  }
}



function mapStateToProps(state) {
  return {
    message: state.MessageReducer.list_message,
    user: state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, { getListMessage, sendMessage })(MessageScreen);
