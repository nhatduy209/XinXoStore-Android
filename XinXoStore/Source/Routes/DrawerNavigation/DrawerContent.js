import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
export class DrawerContent extends React.Component{

  constructor(props){
    super(props);
  }


  componentDidMount(){
    console.log("HOME--------" , this.props.user);
  }

  render(){
    return(
      <View>
        <Text>
         { this.props.user.data.Email}
        </Text>
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    user : state.LoginReducer.user,
  };
}
export default connect(mapStateToProps, {})(DrawerContent);