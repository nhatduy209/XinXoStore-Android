import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {editProfile} from '../../redux/action/LoginAction/LoginAction'
class ChangePasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      colorHint: '#bbbbbb',
      isVisibleSame: false,
      isVisibleCurrentPass: false,

    }
  }

  componentDidMount() {
    console.log('CURRENT PASSWORD -----', this.props.user.data.user.Password)
  }

  onChangeNewPassword = () => {
    if (this.state.newPassword.length < 7) {
      this.setState({ colorHint: 'red' });
      return;
    }
    else if (this.state.newPassword === 0) {
      this.setState({ colorHint: '#bbbbbb' });
    }
    else {
      this.setState({ colorHint: 'green' });
    }
  }

  handleSave = () => {
    console.log(this.props.user.data.user.Password)
    console.log(this.state.currentPassword)
    if (this.state.confirmPassword !== this.state.newPassword) {
      this.setState(prevState => ({
        isVisibleSame: true
      }), () => {
        setTimeout(() => {
          this.setState(prevState => ({
            isVisibleSame: false
          }));
        }, 3000);
      });
      return;
    }
    else if (this.state.currentPassword !== this.props.user.data.user.Password) {
      this.setState(prevState => ({
        isVisibleCurrentPass: true
      }), () => {
        setTimeout(() => {
          this.setState(prevState => ({
            isVisibleCurrentPass: false
          }));
        }, 3000);
      });
      return;
    }
    console.log(this.state.newPassword);
    const data = {
      Username: this.props.user.data.user.Username,
      Email: this.props.user.data.user.Email,
      Age: this.props.user.data.user.Age,
      PhoneNum: this.props.user.data.user.PhoneNum,
      Gender: this.props.user.data.user.Gender,
      Key: this.props.user.data.key,
      Avatar: this.props.user.data.user.Avatar,
      Password : this.state.newPassword,
    }
    this.props.editProfile(data , true );
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' keyboardVerticalOffset={keyboardVerticalOffset} >



          <Modal isVisible={this.state.isVisibleSame} animationOut="fadeOut" animationOutTiming={1000}>
            <View style={styles.viewModal}>
              <View style={{ backgroundColor: '#e63600', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Icon name="exclamation-triangle" color="#ffffff" size={25} />
              </View>

              <Text style={{ fontSize: 15, color: '#4d4d4d' }}>Your new password and confirm password are not the same.Please check again </Text>
            </View>
          </Modal>

          <Modal isVisible={this.state.isVisibleCurrentPass} animationOut="fadeOut" animationOutTiming={1000}>
            <View style={styles.viewModal}>
              <View style={{ backgroundColor: '#e63600', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Icon name="exclamation-triangle" color="#ffffff" size={25} />
              </View>

              <Text style={{ fontSize: 15, color: '#4d4d4d' }}>Your current password is not correct .Please check again </Text>
            </View>
          </Modal>


          <Text style={styles.HeaderText}>
            Create New Password
          </Text>
          <Text style={styles.Hint}>
            Your new password must be different from previous password
          </Text>
          <View style={styles.passwordView}>
            <Text style={styles.Hint} >Current password</Text>
            <TextInput style={styles.Input} secureTextEntry={true} onChangeText = { value => this.setState({currentPassword : value})} ></TextInput>
          </View>


          <View style={styles.passwordView}>
            <RNPasswordStrengthMeter
              onChangeText={value => {
                this.setState({ newPassword: value });
                this.onChangeNewPassword();
              }}
              password={this.state.newPassword}
              meterType="bar"
              minLength={8}
            />
            <Text style={{ color: this.state.colorHint }}>Password must be at least 8 characters</Text>
          </View>


          <View style={styles.passwordView}>
            <Text style={styles.Hint} >Confirm password</Text>

            <TextInput style={styles.Input} secureTextEntry={true}
              onChangeText={value => this.setState({ confirmPassword: value })}
              value={this.state.confirmPassword} ></TextInput>
          </View>



          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ ...styles.btnStyle, marginRight: 10 }}>
              <TouchableOpacity>
                <Text>Clear</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.btnStyle, backgroundColor: '#1e90ff' }}>
              <TouchableOpacity onPress={this.handleSave}>
                <Text style={{ color: '#ffffff' }}>Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, {editProfile})(ChangePasswordScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20
  },
  HeaderText: {
    fontSize: 27,
    marginVertical: 20,
    fontWeight: 'bold'
  },
  Hint: {
    fontSize: 18,
    color: '#bbbbbb'
  },
  passwordView: {
    marginVertical: 15
  },
  Input: {
    height: 50,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    borderRadius: 10,
    fontSize: 20
  },
  btnStyle: {
    width: (Dimensions.get('window').width - 50) / 2,
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
  },
  viewModal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd8cc',
    height: 150,
    borderRadius: 20,
    padding: 20
  }
})