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
    // let changed = {changed: false};
    // this.props.navigation.push('ManagementScreen');
    this.props.navigation.navigate('ItemManagementScreenStack');
  }
  onShoppingCartPress=()=>{
    this.props.navigation.navigate('ShoppingCart');
  }

  onNotificationPress = () => {
    this.props.navigation.push('AllNotification');
    this.props.navigation.navigate('AllNotification');
  }
  // goToEditProfile = () => {
  //   this.props.navigation.push('EditProfileScreen');
  //   this.props.navigation.navigate('EditProfileScreen');
  // }

  goToEditProfile = () => {
    //TO DO HERE 
    //this.props.navigation.push('ProfileUserStack');
    this.props.navigation.navigate('ProfileUserStack');
  }

  goToSettingScreen = () => {
    this.props.navigation.navigate('SettingsScreensStack');
  }

  render() {
    let username  = "" , email = "" ; 
    try {
      username = this.props.user.data.user.Username ; 
      email = this.props.user.data.user.Email ; 
    }catch(err) {
        username = "" ;
        email = "";
    }
    const iconSize=20;
    return (
      <View style={{height:'100%',}}>
        <View style={styles.headerStyle} >
        <TouchableOpacity onPress = {this.goToEditProfile}>
          
            <Image
              style={{ height: 100, width: 100, borderRadius: 60,marginHorizontal:10,alignSelf:'center' }}
              source={{ uri: this.state.url }}>
            </Image>
            <View style={{alignItems: 'center',justifyContent: 'center',}}>
              <Text style={{ fontSize: 25,fontWeight:'bold',color:'#000' }}>
                {username}  
              </Text>
              <Text style={{ color: '#aaa' }}>
                {email}
              </Text>
            </View>
        </TouchableOpacity>
        </View>
        

        {/* list item in drawer  */}
        <View>
          {/* each item  */}
          <TouchableOpacity onPress={this.onHomePress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={iconSize}
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
                size={iconSize}
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
                size={iconSize}
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
                size={iconSize}
                name="book"
                style={styles.iconStyle}
              >
              </Icon>
              <Text style={styles.itemText}>
                Manage
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onNotificationPress}>
            <View style={styles.itemDrawer}>
              <Icon
                size={iconSize}
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
                size={iconSize}
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
                        size={iconSize}
                        name="shopping-cart"
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
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10
  },
  iconStyle: {
    color: '#000',
    padding:10,
    backgroundColor:'rgba(0,150,150,0.5)',
    borderRadius:10
  },
  itemDrawer: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  itemText: {
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 18,
    color:'#000',
    fontWeight:'bold'
  }
})


function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, {})(DrawerContent);