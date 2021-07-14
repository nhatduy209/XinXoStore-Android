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
    console.log('item nè');
    console.log(this.props.item);
    var testApi = new TestAPI()
    testApi.myPromise(this.props.item.img).then(res => this.setState({url : res })).catch(err => console.log(err));
  }
  handleDetail = () => {
    const data = {data:this.props.item,
    url: this.state.url};
    // console.log(this.props)
    this.props.item.navigate.navigate('DetailItemScreen',data);
  }
  render(){
    // console.log(this.state.url);
        return(
          <View style = {styles.container}>
            <View>
              <TouchableOpacity onPress={this.handleDetail}>
                <Image
                  style = {{ height : 150 , width : 120, borderRadius:5} }
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