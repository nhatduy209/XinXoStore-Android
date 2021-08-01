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
    try{
      testApi.myPromise(this.props.user.data.user.Avatar).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    catch(err){
      console.log(err);
    }
  }

  // handle navigate home 
  onHomePress = () => {
    this.props.navigation.push('Home');
    this.props.navigation.navigate('Home');
  }
  // handle navigate management 
  onManagementPress = () => {
    let changed = {changed: false};
    this.props.navigation.push('ManagementScreen', changed);
    this.props.navigation.navigate('ManagementScreen', changed);
  }
  onShoppingCartPress=()=>{
    this.props.navigation.push('ShoppingCart');
    this.props.navigation.navigate('ShoppingCartScreenStack');
  }

  // goToEditProfile = () => {
  //   this.props.navigation.push('EditProfileScreen');
  //   this.props.navigation.navigate('EditProfileScreen');
  // }

  goToEditProfile = () => {
    this.props.navigation.push('EditProfileScreen');
    this.props.navigation.navigate('ProfileUserStack');
  }

  goToSettingScreen = () => {
    this.props.navigation.navigate('SettingsScreensStack');
  }
  render() {
    console.log("drawer=============",this.props.user)
    let username  = "" , email = "" ; 
    try {
      username = this.props.user.data.user.Username ; 
      email = this.props.user.data.user.Email ; 
    }catch(err) {
        username = "" ;
        email = "";
    }
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
                {username}  
              </Text>
              <Text style={{ color: '#bbbbbb' }}>
                {email}
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
                size={25}
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
                size={25}
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
                size={25}
                name="heart"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Top deals
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onManagementPress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
                name="book"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Manage
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={25}
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
                size={25}
                name="cog"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.onShoppingCartPress}>
                <View style={styles.itemDrawer}>
                      <Icon
                        size={35}
                        name="cog"
                        style={styles.iconStyle}
                      >
                      </Icon>
                      <Text style={styles.itemText}>
                        Shopping Cart
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