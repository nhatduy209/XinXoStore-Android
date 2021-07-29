import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native'
import TestAPI from './TestAPI';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "react-native-image-picker";
import { editProfile } from '../redux/action/LoginAction/LoginAction'
import { FilePath } from '../Config/FilePath';
import Modal from 'react-native-modal';
import { Status } from '../Config/dataStatus';

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'img',
      username: this.props.user.data.user.Username,
      email: this.props.user.data.user.Email,
      age: this.props.user.data.user.Age,
      phoneNum: this.props.user.data.user.PhoneNum,
      gender: this.props.user.data.user.Gender,
      Avatar:  this.props.user.data.user.Avatar,
      PathImageDevice: "",
      isModalVisible : true ,
    }
  }

  componentDidMount() {
    var testApi = new TestAPI();
    testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.status !==  prevProps.user.status) {
      this.props.user.status = Status.FAIL;
        this.setState({isModalVisible : true })
    }
  }

  handlePhotos = () => {
    const Options = {};
      ImagePicker.launchImageLibrary(Options, response => {
        try{
          this.setState({ url: response.assets[0].uri })
          this.setState({ Avatar: response.assets[0].fileName })
          this.setState({ PathImageDevice: response.assets[0].uri })
        }
        catch ( err){
          this.setState({ PathImageDevice: "" })
        }
      })
  }

  handleReset = () => {
    this.setState({ username: this.props.user.data.user.Username })
    this.setState({ gender: this.props.user.data.user.Gender })
    this.setState({ phoneNum: this.props.user.data.user.PhoneNum })
    this.setState({ age: this.props.user.data.user.Age })
    this.setState({ email: this.props.user.data.user.Email })
  }

  handleSave = () => {
    let avatarPath = this.state.Avatar ;
    if(this.state.PathImageDevice.length > 0 ){
      avatarPath = FilePath.ACCOUNT_IMAGE_STORAGE + '/' + this.state.Avatar;
    }
    const data = {
      Username: this.state.username,
      Email: this.state.email,
      Age: this.state.age,
      PhoneNum: this.state.phoneNum,
      Gender: this.state.gender,
      Key: this.props.user.data.key,
      Avatar: avatarPath,
      PathImageDevice: this.state.PathImageDevice,
      Password : this.props.user.data.user.Password,
    }
    this.props.editProfile(data)
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View>
          <Modal isVisible={this.state.isModalVisible}>
            <View>
              <Text>Hello!</Text>
            </View>
          </Modal>
        </View> */}
        <View style={styles.avtImage}>
          <TouchableOpacity onPress={this.handlePhotos}>
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
            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Username</Text>
              <TextInput
                style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ username: value })
                }}
                value={this.state.username}
              >
              </TextInput>
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Email</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ email: value })
                }}
                value={this.state.email}
              ></TextInput>
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Age</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ age: value })
                }}
                value={this.state.age.toString()}
              ></TextInput>
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Phone Number</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ phoneNum: value })
                }}
                value={this.state.phoneNum}
              ></TextInput>
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.textStyleTitle}>{' '}Gender</Text>
              <TextInput style={styles.textStyleData}
                onChangeText={value => {
                  this.setState({ gender: value })
                }}
                value={this.state.gender}
              ></TextInput>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginVertical: 20, }}>
            <View style={styles.btnReset}>
              <TouchableOpacity onPress={this.handleReset}>
                <Text style={{ fontSize: 25, padding: 5 }}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnSave}>
              <TouchableOpacity onPress={this.handleSave}>
                <Text style={{ fontSize: 25, padding: 5, color: '#ffffff' }}>Save</Text>
              </TouchableOpacity>
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
export default connect(mapStateToProps, { editProfile })(EditProfileScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
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
    borderBottomWidth: 0.5,
    borderColor: '#bbbbbb',
    marginHorizontal: 20,
    paddingTop: 15
  },
  textStyleTitle: {
    color: '#bbbbbb',
    fontSize: 17
  },
  textStyleData: {
    fontSize: 19,
  },
  btnReset: {
    width: Dimensions.get('window').width / 2 - 40,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 20,
  },
  btnSave: {
    width: Dimensions.get('window').width / 2 - 40,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 20
  }
})
