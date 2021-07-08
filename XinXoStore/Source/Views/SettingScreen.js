import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

export default class SettingScreens extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.textHeader}>
          Settings
        </Text>

        {/* Language  */}
        <View style={styles.contentView}>
          <View style={{...styles.iconStyle , borderColor : '#ff8f00' , backgroundColor : '#ffde59'}} >
            <Icon
              size={20}
              name="globe"
              color="#ff8c00"
            >
            </Icon>
          </View>

          <Text style={styles.contentText}>Language</Text>
          <Text style={{ color: '#bbbbbb', fontSize: 15, marginTop: 5 }}>English</Text>
          <View style = { styles.goToIcons}>
            <Icon
              size={30}
              name="angle-right"
            >
            </Icon>
          </View>
        </View>


      {/* Sign out */}
        <View style={styles.contentView}>
          <View style={{...styles.iconStyle, borderColor : 'red' , backgroundColor : '#ff6666'}} >
            <Icon
              size={20}
              name="sign-out"
              color="#fffafa"
            >
            </Icon>
          </View>

          <Text style={styles.contentText}>Sign out</Text>
          <View style = { styles.goToIcons}>
            <Icon
              size={30}
              name="angle-right"
            >
            </Icon>
          </View>
        </View>


        {/* App version */}
        <View style={styles.contentView}>
          <View style={{...styles.iconStyle, borderColor : '#c2ffc2' , backgroundColor : '#c2ffc2'}} >
            <Icon
              size={20}
              name="android"
              color="green"
            >
            </Icon>
          </View>

          <Text style={styles.contentText}>App version</Text>
          <Text style={{ color: '#bbbbbb', fontSize: 15, marginTop: 5 }}>{ DeviceInfo.getVersion()}</Text>
        </View>

      </View>
    );
  }
}


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
    marginTop : 30,
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
  goToIcons : {
    marginLeft : 'auto',
    borderWidth : 0.5 ,
    borderRadius : 10,
    width : 40,
    height : 40,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor :'#f5f5f5'
  }
})