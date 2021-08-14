import React, { useState, useCallback, useEffect } from 'react'
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getListMessage, sendMessage } from '../../redux/action/MessageAction/MessageAction'
import { connect } from 'react-redux';
import TestAPI from '../TestAPI';
import * as ImagePicker from "react-native-image-picker";

import firebase from 'firebase';

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      url: "img",
      imageSend: [],
    }
  }
  onSend = (value) => {
    const messageKey = this.props.route.params.messageKey;
    // value[0].image = "Image nè"
    //console.log('VALUE-----',value[0].text.length )
    let arrayImage = [] ;
    let index = 0 ; 


    if(value[0].text.trim().length > 0  &&  this.state.imageSend.length  === 0 ){
      this.props.sendMessage(value[0], messageKey);
    }
    else if(value[0].text.trim().length === 0 && this.state.imageSend.length > 0){
      if(this.state.imageSend.length > 0 ){
        this.state.imageSend.forEach(item => {

          //let arrayImage = [] 
          //object = value[0];
          let object = { _id :  "", image : "", imageName : "", createdAt : value[0].createdAt ,user : {}}; 
          object._id =  value[0]._id + index  ; 
          object.user = value[0].user ; 
          object.image =  item.uri ;
          object.imageName = item.fileName;
          console.log('OBJECT ITEM ---' , object)
          arrayImage.push(object) ;
          index++;
        })
      }
      this.props.sendMessage(arrayImage, messageKey);
      //this.setState({ messages: GiftedChat.append(this.state.messages, arrayImage) });
     // this.setState({imageSend : []})
    }
  
   
    
  }

  // componentWillMount() {
  //   firebase.database().ref('Messages/' + 'nhatduy209-thuyety').on('child_added', (value) => {
  //     console.log('VALUE----------------', value.val());
  //       this.setState({ messages: GiftedChat.append(this.state.messages, value.val())  } )
  //   })
  // }
  handlePhotos = () => {
    const Options = { selectionLimit: 0 };
    ImagePicker.launchImageLibrary(Options, response => {

      try {
        console.log('response.assets[0].uri-----------------', response.assets)
        this.setState({ imageSend: response.assets })
      }
      catch (err) {
        this.setState({ imageSend: "" })
      }
    })
  }

  componentDidMount() {
    const messageKey = this.props.route.params.messageKey;
    firebase.database().ref('Messages/' + messageKey).on('child_added', (value) => {
      this.setState({ messages: GiftedChat.append(this.state.messages, value.val()) });
    })
    var testApi = new TestAPI();
    testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
    //this.props.getListMessage();
  }

  componentWillUnmount() {
    const messageKey = this.props.route.params.messageKey;
    // stop listening to firebase 
    firebase.database().ref('Messages/' + messageKey).off('child_added', this.setState({ messages: [] }));
  }

  renderInputToolbar = (props) => {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={this.handlePhotos}>
            <Icon
              name='images'
              size={25}
              color='#ff794d'>

            </Icon>
          </TouchableOpacity>


          <TouchableOpacity>
            <Icon
              name='camera'
              size={25}
              color='#ff794d'>

            </Icon>
          </TouchableOpacity>

          <InputToolbar  {...props} containerStyle={styles.chatInputStyle} renderSend={this.renderButtonSend} />
        </View>
      </View>
    );
    // return(
    //   <InputToolbar  {...props} containerStyle={styles.chatInputStyle} />
    // );
  }

  removeItem = (item) => {
     let newImage =  this.state.imageSend;
     newImage.splice(item.index,1);
     this.setState({imageSend : newImage})
  }

  renderButtonSend = (props) => {
    return (
      <Send alwaysShowSend  {...props} containerStyle={{ marginBottom: 5 }}/>
    );
  }

  renderImage = (item) => {
    return (
      <View>
        <Image
          style={{ height: 80, width: 80 }}
          source={{ uri: item.item.uri }}>
        </Image>

        <TouchableOpacity
         style={{ position: 'absolute', color: '#ff0000' }}
          onPress = { this.removeItem.bind(this, item )}>
          <Icon
            name="times-circle"
            size={20}
           >

          </Icon>
        </TouchableOpacity>

      </View>

    )
  }

  render() {
    if (this.state.imageSend.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={ (messages) => {this.onSend(messages) }}
            renderInputToolbar={this.renderInputToolbar}
            placeholder="type message...."
            user={{
              _id: this.props.user.data.key,
              name: this.props.user.data.user.Username,
              avatar: this.state.url
            }}
          />
          <View>
            <FlatList
              horizontal
              data={this.state.imageSend}
              keyExtractor={item => item.fileName}
              renderItem={this.renderImage}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ width: 20 }}>

                  </View>
                )
              }}>
            </FlatList>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            renderInputToolbar={this.renderInputToolbar}
            placeholder="type message...."
            user={{
              _id: this.props.user.data.key,
              name: this.props.user.data.user.Username,
              avatar: this.state.url
            }}
          />
        </View>
      )
    }

  }
}

const styles = new StyleSheet.create({
  chatInputStyle: {
    flex: 1, borderColor: '#bbbbbb', borderWidth: 0.5, borderRadius: 10, marginLeft: 80
    , backgroundColor: '#ffffff', fontSize: 13, height: 40
  }
})


function mapStateToProps(state) {
  return {
    message: state.MessageReducer.list_message,
    user: state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, { getListMessage, sendMessage })(MessageScreen);
