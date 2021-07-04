import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView , TextInput} from 'react-native'
import TestAPI from './TestAPI';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "react-native-image-picker";
class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'img',
    }
  }

  componentDidMount() {
    var testApi = new TestAPI();
    testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }

  handlePhotos = () => {
    const Options = {};
    ImagePicker.launchImageLibrary(Options , response => {
      this.setState({ url : response.assets[0].uri})
    })
   }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avtImage}>
          <TouchableOpacity onPress = {this.handlePhotos}>
            <Image
              style={{ height: 130, width: 130, borderRadius: 70, position: 'absolute', alignSelf: 'center' }}
              source={{ uri: this.state.url }}>
            </Image>
            <Icon
              size={24}
              name="camera"
              style={styles.cameraIcon}
            >
            </Icon>
          </TouchableOpacity>
        </View>

        {/* View for detail info */}
        <ScrollView>
        <View>
          <View style = {styles.detailInfo}>
              <Text style = { styles.textStyleTitle }>{' '}Username</Text>
              <TextInput style = {styles.textStyleData}>{this.props.user.data.user.Username}</TextInput>
          </View>

          <View style = {styles.detailInfo}>
              <Text style = { styles.textStyleTitle }>{' '}Email</Text>
              <TextInput style = {styles.textStyleData}>{this.props.user.data.user.Email}</TextInput>
          </View>

          <View style = {styles.detailInfo}>
              <Text style = { styles.textStyleTitle }>{' '}Age</Text>
              <TextInput style = {styles.textStyleData}>{this.props.user.data.user.Age}</TextInput>
          </View>

          <View style = {styles.detailInfo}>
              <Text style = { styles.textStyleTitle }>{' '}Phone Number</Text>
              <TextInput style = {styles.textStyleData}>+{this.props.user.data.user.PhoneNum}</TextInput>
          </View>

          <View style = {styles.detailInfo}>
              <Text style = { styles.textStyleTitle }>{' '}Gender</Text>
              <TextInput style = {styles.textStyleData}>{this.props.user.data.user.Gender}</TextInput>
          </View>
        </View>
        </ScrollView>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, {})(EditProfileScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#ffffff'
  },
  avtImage: {
    height: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraIcon: {
    height: 25, width: 25, alignSelf: 'center', marginLeft: 80, marginTop: 110, color: '#bbbbbb'
  },
  detailInfo: {
    borderBottomWidth : 0.5 ,
    borderColor : '#bbbbbb',
    marginHorizontal : 20,
    paddingTop : 15
  },
  textStyleTitle : {
    color : '#bbbbbb',
    fontSize : 17
  },
  textStyleData : {
    fontSize : 19 ,
  }
})
