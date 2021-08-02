import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import TestAPI from '../TestAPI'

export default class RenderItemsSelling extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "img",
    }
  }



  componentDidMount() {
    var testApi = new TestAPI();
    // console.log("AFTER EDIT ----------------", this.props.img)
    testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }

  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditScreen',{data : this.props.item,prevScreen:'ItemSoldScreen'})}>
        
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ height: 150, width: 100, borderRadius: 10 }}
              source={{ uri: this.state.url }}>
            </Image>
          </View>
          <Text style={{ marginTop: 10 }}>{this.props.item.Name}</Text>
          <Text>Prices : {this.props.item.prices}</Text>
          <Text>Date selling : {this.props.item.publicDate}</Text>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#d1d1e0',
    borderWidth: 0.5,
    borderRadius: 10,
  }
})