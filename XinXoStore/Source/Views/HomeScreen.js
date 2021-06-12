import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import NewArrivalItem from './homeScreenFlatlist/HomeScreenArrivalsItems.js'
import firebase from 'firebase';
import storage from '@react-native-firebase/storage';
import TestAPI from './TestAPI.js';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  }
];






export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        require( "../Images/clothingHome.jpeg"),    
        require( "../Images/clothingSlider.jpeg"),    
        require( "../Images/clothingSlider2.jpeg"),    
      ],
      imgUrl : "",
    };
  }

  componentDidMount(){
      var  a = new TestAPI();
      a.myPromise().then(res => this.setState({imgUrl : res})).catch(err => console.log(err));
  }

  componentDidUpdate(){
    console.log("IMAGE UPDATE------" , this.state.imgUrl)
}

  renderNewArrivalsItem = ({ item }) => {
      return (
        <NewArrivalItem item = { item } url = {this.state.imgUrl}/>
      )
  }

  itemSeparator = () => {
    return <View style={{ width : 15 }} />;
  };

  getImageURL = async () => {
    this.setState({urlImage : urlsss })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* header  */}
        <View>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={250}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
          />
          <View style={styles.textImage}>
            <Text
              style={{ fontSize: 30, color: '#778899', fontWeight: '800' }}
            >Make yourself at home
            </Text>
            <Text
              style={{ fontSize: 20, color: '#708090' }}>
              Serving you is our pleasure
            </Text>
          </View>
        </View>

        {/* body */}
        <View>
          <View style={{ flexDirection : 'row' , paddingHorizontal : 10 , paddingVertical : 20}}>

              <Text style = {styles.textCategory}>
                  New Arrivals
              </Text>

              <TouchableOpacity style = {{ marginLeft : 'auto'}}>
                  <Text style = {styles.textShowAll}>
                      Show all {' '}
                      <Icon name="play" backgroundColor="#3b5998" />         
                  </Text>
              </TouchableOpacity>

          </View>

          {/* flatlist item  */}
          <View>
            <FlatList
              data={DATA}
              renderItem={this.renderNewArrivalsItem}
              keyExtractor={item => item.id}
              horizontal 
              ItemSeparatorComponent={this.itemSeparator}
            />
          </View>
                  
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: 250,
    width: Dimensions.get("window").width
  },
  textImage: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', marginTop: 170
  },

  textCategory :{
    fontSize : 20
  },

  textShowAll :{
    fontSize : 15,
    color : '#bbbbbb',
    marginTop : 5
  }
})