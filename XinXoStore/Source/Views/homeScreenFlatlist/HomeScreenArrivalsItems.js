import React from 'react'
import { View , Image, StyleSheet , Text, TouchableOpacity} from 'react-native'
import TestAPI from '../TestAPI'


export default class NewArrivalItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      url : "img",
    }
  }

  componentDidMount(){
    var testApi = new TestAPI()
    testApi.myPromise(this.props.item.img).then(res => this.setState({url : res })).catch(err => console.log(err));
  }

  render(){
    console.log(this.state.url);
        return(
          <View style = {styles.container}>
            <View>
              <TouchableOpacity>
                <Image
                  style = {{ height : 150 , width : 120} }
                  source={{ uri: this.state.url }}
                />
                <View style = {{ paddingTop : 5}}>
                    <Text style = {{ fontSize : 16}}>
                        {this.props.item.Name}
                    </Text>
                    <Text style ={{color : '#bbbbbb'}}>
                        {this.props.item.prices}VND
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      );
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1, 
  },
})