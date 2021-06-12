import React from 'react'
import { View , Image } from 'react-native'



export default class NewArrivalItem extends React.Component{

  constructor(props){
    super(props)
  }
  render(){
      return(
          <View style = {{ height : 150 , width : 120 , borderWidth : 1}}>
            <Image
            height = {150} 
            width = {120}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/xinxostore-8f1e6.appspot.com/o/testImage.jpeg?alt=media&token=af881436-217e-4f90-a1de-bda7bb99a229'
           }}
            />
          </View>
      );
  }
}