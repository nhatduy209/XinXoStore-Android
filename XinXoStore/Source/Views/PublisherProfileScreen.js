import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class PublisherProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGetNotification: false,
      getNotification: 'Get notification',
      iconBellName: 'bell-slash',
    }
  }

  navigateContact = () => {
    Linking.openURL('tel:119');
  }

  navigateMail = () => {
    Linking.openURL('mailto:nhatduy20000@gmail.com');
  }

  navigateMaps = () =>{
    const address = 'số 269,Hà Duy Phiên,huyện Củ Chi,thành phố HCM'; 
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + address );
  }

  handleGetNotification = () => {
    if (!this.state.isGetNotification) {
      this.setState({ isGetNotification: true });
      this.setState({ getNotification: 'Already got notification' });
      this.setState({ iconBellName: 'bell' })
    } else {
      this.setState({ isGetNotification: false });
      this.setState({ getNotification: 'Get notification' });
      this.setState({ iconBellName: 'bell-slash' })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContent}>

          {/* View image and username  */}
          <Image source={require('../Images/clothingHome.jpeg')}
            style={{ height: 100, width: 100, borderRadius: 70 }} />
          <View>
            <Text style={styles.textUsername}>
              XinXoStore Name
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
              <Text style={styles.contactText}>12312414113</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.navigateMail}>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <Icon name="envelope" color="#ff6666" style={styles.Icon} size={20} />
              <Text style={styles.contactText}>nhatduy20000@gmail.com</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.navigateMaps}>

            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <Icon name="map-marker" color="#ff0000" style={styles.Icon} size={20} />
              <Text numberOfLines = {2} style={styles.contactText} > số 269,Hà Duy Phiên,huyện Củ Chi,thành phố HCM</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ marginVertical: 10, flexDirection: 'row', borderColor: '#bbbbbb', borderWidth: 0.5 }}
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
          <Text style={styles.textList}>20 people likes</Text>
        </View>


        <View style={styles.viewList}>
          <Icon name="thumbs-down" size={23} color="#bbbbbb" />
          <Text style={styles.textList}>20 people dislikes</Text>
        </View>

      </View>
    );
  }
}


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
    maxWidth : 250
  },
  MessageAndNotification: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    padding: 15
  },
  textList: {
    fontSize: 17, marginLeft: 10, color: "#bbbbbb"
  },
  viewList: {
    paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', paddingVertical: 10
  }
})