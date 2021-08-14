import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View , Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getBubbleMessage} from '../../redux/action/MessageAction/MessageAction'

 class RenderBubbleMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconVisible: false
    }
  }


  componentDidMount() {
    this.props.getBubbleMessage(this.props.user.data.user.Username);
  }

  navigateMessage = (item) => {
   // this.props.navigation.push('MessageScreen');
    this.props.navigation.navigate('MessageScreen', { messageKey : item.keyMessage , username : item.usernameChatting});
  }

  renderBubble = ({ item }) => {
    
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress = {this.navigateMessage.bind(this,  item)}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, alignItems: 'center' }}>
            <View style={{  }}>
            <Image
              style={{ height: 60, width: 60, borderRadius: 45, borderWidth: 0.5}}
              source={{ uri  : item.userChatAvatar }}>
            </Image>
            </View>
            <View style={{ marginLeft: 10, flex: 1 }} >
              <Text style={{ fontSize: 18, fontWeight: '900' }}>
                {item.usernameChatting}
              </Text>
              <Text
                style={{ width: 200, color: '#bbbbbb' }}
                numberOfLines={1}>
                {item.lastMessage.text}
              </Text>
              <View style={{ borderBottomColor: '#d9d9d9', borderWidth: 0.5, marginTop: 10 }}></View>
            </View>

          </View>
        </TouchableOpacity>

      </View>
    )
  }
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <Text style={{ fontSize: 23, color: '#ffffff' }}>Message</Text>
        </View>
        <View style={styles.searchName}>

          <View style={styles.inputName}>
            <Icon
              name="search"
              size={15}
              color="#bbbbbb"
            >
            </Icon>
            <TextInput
              style={{ fontSize: 15, height: 37, textAlign: 'center', marginTop: 8 }}
              placeholder="Search for name , shop...">
            </TextInput>
          </View>


        </View>
        <FlatList
          data={this.props.bubbleMessage.data}
          keyExtractor={item => item.keyMessage}
          renderItem={this.renderBubble}>
        </FlatList>
      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    bubbleMessage : state.MessageReducer.bubbleMessage
  };
}
export default connect(mapStateToProps, {getBubbleMessage})(RenderBubbleMessage);




const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
    backgroundColor: '#4db8ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchName: {
    height: 50,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center'
  },
  inputName: {
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#bbbbbb',
    height: 37,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})