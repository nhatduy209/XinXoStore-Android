import React, { useState, useCallback, useEffect } from 'react'
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getListMessage, sendMessage } from '../../redux/action/MessageAction/MessageAction'
import { connect } from 'react-redux';
import TestAPI from '../TestAPI';
import firebase from 'firebase';


// export default function MessageScreen() {
//   const [messages, setMessages] = useState([]);

//   const AppMessage = ["Hello", "What your name ? "]
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: AppMessage[1],
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//         },
//       },
//       {
//         _id: 1231,
//         text: "Duy đẹp trai",
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//         },
//       },
//       {
//         _id: 2,
//         text: AppMessage[0],
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//         },
//       },

//     ])
//   }, [])

//   const onSend = useCallback((messages = []) => {
//     console.log(messages);
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   }, [])

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   )
// }


class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      url: "img",
    }
  }
  onSend = (value) => {
    console.log('aaaaaaaaa', value)
    this.setState({ messages: GiftedChat.append(this.state.messages, value) });
    this.props.sendMessage(value[0]);

  }

  componentWillMount() {
    firebase.database().ref('Messages/' + 'id-121zvas/').on('child_added', (value) => {
        this.setState({ messages: GiftedChat.append(this.state.messages, value.val())  } )
    })
  }

  componentDidMount() {
    var testApi = new TestAPI;
    testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
    this.props.getListMessage();
  }


  render() {
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
