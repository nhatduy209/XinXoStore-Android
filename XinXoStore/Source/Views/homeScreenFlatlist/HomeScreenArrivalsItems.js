import React from 'react'
import { View , Image } from 'react-native'



export default class NewArrivalItem extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
      if(this.props.item.img !== ""){
        return(
          <View style = {{ height : 150 , width : 120 , borderWidth : 1}}>
            <Image
           style = {{ height : 150 , width : 120} }
              source={{ uri: this.props.item.img }}
            />
          </View>
      );
      }

  }
}