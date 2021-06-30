import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
export class DrawerContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }


  componentDidMount() {
    console.log("HOME--------", this.props.user.data.username);
  }

  // handle navigate home 
  onHomePress = () => {
    this.props.navigation.navigate('Home');
  }
  
  render() {
    console.log('this.props.user.data.username' , this.props.user.data.username);
    return (
      <View>
        <View style={styles.headerStyle} >
          <View>
            <Text style={{ fontSize: 25 }}>
              {this.props.user.data.username}
            </Text>
            <Text style={{ color: '#bbbbbb' }}>
              {this.props.user.data.Email}
            </Text>
          </View>
        </View>

        {/* list item in drawer  */}
        <View>
            {/* each item  */}
            <TouchableOpacity onPress = {this.onHomePress}>
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

            <TouchableOpacity onPress = {this.onHomePress}>
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

            <TouchableOpacity onPress = {this.onHomePress}>
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


            <TouchableOpacity onPress = {this.onHomePress}>
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

            <TouchableOpacity onPress = {this.onHomePress}>
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
    height: 150,
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