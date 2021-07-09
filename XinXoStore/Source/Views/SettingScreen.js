import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeviceInfo from 'react-native-device-info';
import { Logout } from '../redux/action/LoginAction/LoginAction';
import { connect } from 'react-redux';

class SettingScreens extends React.Component {

  constructor(props){
    super(props);
  }

  handleSignOut = () => {
    this.props.Logout();
  }

  handleChangePassword = () => {
    this.props.navigation.navigate('ChangePasswordScreen')
  }

  componentDidUpdate(prevProps){
    if(this.props.user.status !== prevProps.user.status){
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.textHeader}>
          Settings
        </Text>

        {/* Language  */}
        <View style={styles.contentView}>
          <View style={{ ...styles.iconStyle, borderColor: '#ff8f00', backgroundColor: '#ffde59' }} >
            <Icon
              size={20}
              name="globe"
              color="#ff8c00"
            >
            </Icon>
          </View>

          <Text style={styles.contentText}>Language</Text>
          <Text style={{ color: '#bbbbbb', fontSize: 15, marginTop: 5 }}>English</Text>
          <View style={styles.goToIcons}>
            <Icon
              size={30}
              name="angle-right"
            >
            </Icon>
          </View>
        </View>


        {/* Sign out */}
        <View style={styles.contentView}>
          <View style={{ ...styles.iconStyle, borderColor: 'red', backgroundColor: '#ff6666' }} >
            <Icon
              size={20}
              name="sign-out-alt"
              color="#fffafa"
            >
            </Icon>

          </View>

          <Text style={styles.contentText}>Sign out</Text>
         
            <View style={styles.goToIcons}>
            <TouchableOpacity onPress = {this.handleSignOut}>
              <Icon
                size={30}
                name="angle-right"
              >
              </Icon>
              </TouchableOpacity>
            </View>
       
        </View>

           {/* Change password*/}
           <View style={styles.contentView}>
          <View style={{ ...styles.iconStyle, borderColor: '#94b8ff', backgroundColor: '#94b8ff' }} >
            <Icon
              size={20}
              name="key"
              color="#0d0dff"
            >
            </Icon>

          </View>

          <Text numberOfLines={2} style={styles.contentText}>Change password</Text>
         
            <View style={styles.goToIcons}>
            <TouchableOpacity onPress = {this.handleChangePassword}>
              <Icon
                size={30}
                name="angle-right"
              >
              </Icon>
              </TouchableOpacity>
            </View>
       
        </View>



        {/* App version */}
        <View style={styles.contentView}>
          <View style={{ ...styles.iconStyle, borderColor: '#c2ffc2', backgroundColor: '#c2ffc2' }} >
            <Icon
              size={20}
              name="android"
              color="green"
            >
            </Icon>
          </View>

          <Text style={styles.contentText}>App version</Text>
          <Text style={{ color: '#bbbbbb', fontSize: 15, marginTop: 5 }}>{DeviceInfo.getVersion()}</Text>
        </View>

      </View>
    );
  }
}


function mapStateToProps(state) {  
  return {
    user : state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, {Logout})(SettingScreens);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  textHeader: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  contentView: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    borderWidth: 0.5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  contentText: {
    fontSize: 20,
    marginHorizontal: 20
  },
  goToIcons: {
    marginLeft: 'auto',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }
})