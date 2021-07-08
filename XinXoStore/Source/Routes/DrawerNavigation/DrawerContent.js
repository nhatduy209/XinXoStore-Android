import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import TestAPI from '../../Views/TestAPI'
export class DrawerContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "img"
    }
  }


  componentDidMount() {
    var testApi = new TestAPI()
    testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }

  // handle navigate home 
  onHomePress = () => {
    this.props.navigation.push('Home');
    this.props.navigation.navigate('Home');
  }

  goToEditProfile = () => {
    this.props.navigation.push('EditProfileScreen');
    this.props.navigation.navigate('EditProfileScreen');
  }

  goToSettingScreen = () => {
    this.props.navigation.navigate('SettingScreens');
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress = {this.goToEditProfile}>
          <View style={styles.headerStyle} >
            <Image
              style={{ height: 100, width: 100, borderRadius: 60 }}
              source={{ uri: this.state.url }}>
            </Image>
            <View>
              <Text style={{ fontSize: 25 }}>
                {this.props.user.data.user.Username}
              </Text>
              <Text style={{ color: '#bbbbbb' }}>
                {this.props.user.data.user.Email}
              </Text>
            </View>
          </View>
        </TouchableOpacity>


        {/* list item in drawer  */}
        <View>
          {/* each item  */}
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={35}
                name="home"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Home
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={35}
                name="tags"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                New collections
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={35}
                name="heart"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Top deals
              </Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={35}
                name="bell"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Notifications
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.goToSettingScreen}>
            <View style={styles.itemDrawer}>
              <Icon
                size={35}
                name="cog"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 200,
    borderBottomColor: '#bbbbbb',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#bbb',
  },
  itemDrawer: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: 'row',
  },
  itemText: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 15
  }
})


function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, {})(DrawerContent);