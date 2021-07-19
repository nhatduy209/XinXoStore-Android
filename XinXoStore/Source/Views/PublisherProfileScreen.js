import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import TestAPI from './TestAPI';
class PublisherProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGetNotification: false,
      getNotification: 'Get notification',
      iconBellName: 'bell-slash',
      isVisible: false,
      url: "img"
    }
  }

  componentDidMount() {
    var testApi = new TestAPI();
    testApi.myPromise(this.props.publisher.data.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }

  navigateContact = () => {
    Linking.openURL('tel:' + this.props.publisher.data.PhoneNum);
  }

  navigateMail = () => {
    Linking.openURL('mailto:' + this.props.publisher.data.Email);
  }

  navigateMaps = () => {
    const address = this.props.publisher.data.address;
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + address);
  }

  handleGetNotification = () => {
    if (!this.state.isGetNotification) {
      this.setState({ isGetNotification: true });
      this.setState({ getNotification: 'Already got notification' });
      this.setState({ iconBellName: 'bell' })
      this.setState(prevState => ({
        isVisible: true
      }), () => {
        setTimeout(() => {
          this.setState(prevState => ({
            isVisible: false
          }));
        }, 2500);
      });
    } else {
      this.setState({ isGetNotification: false });
      this.setState({ getNotification: 'Get notification' });
      this.setState({ iconBellName: 'bell-slash' })
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <Modal isVisible={this.state.isVisible} animationOut="fadeOut" animationOutTiming={2000}>
          <View style={styles.viewModal}>
            <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
              <Icon name="check-circle" color="#66ff33" size={40} />
            </View>

            <Text style={{ fontSize: 15, color: '#ffffff', paddingHorizontal: 30, }}>Notification comes when {this.props.publisher.data.Username} public an item </Text>
          </View>
        </Modal>

        <View style={styles.imageContent}>

          {/* View image and username  */}
          <Image source={{ uri: this.state.url }}
            style={{ height: 100, width: 100, borderRadius: 70 }} />
          <View>
            <Text style={styles.textUsername}>
              {this.props.publisher.data.Username}
            </Text>
            <Text style={styles.textFullName}>
              Trần Nhất Duy
            </Text>
          </View>
        </View>

        {/* View for content info */}
        <View style={styles.contentView}>
          <TouchableOpacity onPress={this.navigateContact}>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <Icon name="phone-alt" color="#66b3ff" style={styles.Icon} size={20} />
              <Text style={styles.contactText}> {this.props.publisher.data.PhoneNum}</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.navigateMail}>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <Icon name="envelope" color="#ff6666" style={styles.Icon} size={20} />
              <Text style={styles.contactText}>{this.props.publisher.data.Email}</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.navigateMaps}>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <Icon name="map-marker" color="#ff0000" style={styles.Icon} size={20} />
              <Text numberOfLines={2} style={styles.contactText} >{this.props.publisher.data.Address}</Text>
            </View>
          </TouchableOpacity>

        </View>


        <View style={{ marginVertical: 10, flexDirection: 'row', borderColor: '#bbbbbb', borderWidth: 0.5 }}
        >
          <ScrollView 
          horizontal = {true}
          showsHorizontalScrollIndicator = {false} 
          >
            <View style={{ ...styles.MessageAndNotification, borderRightColor: '#bbbbbb', borderRightWidth: 0.5 }}>
              <Icon name="comment-dots" size={23} color="#666666" />
              <Text>Send message</Text>
            </View>

            <TouchableOpacity onPress={this.handleGetNotification}>
              <View style={styles.MessageAndNotification}>
                <Icon name={this.state.iconBellName} size={23} color="#666666" />
                <Text>{this.state.getNotification}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleGetNotification}>
              <View style={styles.MessageAndNotification}>
                <Icon name="comments" size={23} color="#666666" />
                <Text>Comments for store </Text>
              </View>
            </TouchableOpacity>

          </ScrollView>


        </View>


        <View style={styles.viewList}>
          <Icon name="star" size={23} color="#ff6600" />
          <Text style={styles.textList}>20 Items has sold</Text>
        </View>

        <View style={styles.viewList}>
          <Icon name="shopify" size={23} color="red" />
          <Text style={styles.textList}> 20 Items are selling</Text>
        </View>

        <View style={styles.viewList}>
          <Icon name="thumbs-up" size={23} color="#3366ff" />
          <Text style={styles.textList}>{this.props.publisher.data.like} people likes</Text>
        </View>


        <View style={styles.viewList}>
          <Icon name="thumbs-down" size={23} color="#bbbbbb" />
          <Text style={styles.textList}>{this.props.publisher.data.dislike} people dislikes</Text>
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    publisher: state.PublisherInfoReducer.publisher,
  };
}
export default connect(mapStateToProps, {})(PublisherProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  imageContent: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  textUsername: {
    marginLeft: 15,
    fontSize: 20
  },
  textFullName: {
    color: '#bbbbbb',
    marginLeft: 15,
    fontSize: 17
  },
  contentView: {
    padding: 15,
  },
  contactText: {
    marginLeft: 20,
    fontSize: 18,
    maxWidth: 250
  },
  MessageAndNotification: {
    width: Dimensions.get('window').width / 2 - 40,
    alignItems: 'center',
    padding: 15
  },
  textList: {
    fontSize: 17, marginLeft: 10, color: "#bbbbbb"
  },
  viewList: {
    paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', paddingVertical: 10
  },
  viewModal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#269900',
    height: 150,
    borderRadius: 20,
    padding: 20
  }
})