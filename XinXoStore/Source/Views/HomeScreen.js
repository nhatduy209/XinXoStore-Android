import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NewArrivalItem from './homeScreenFlatlist/HomeScreenArrivalsItems.js'
import {getListNewArrivals} from '../redux/action/GetNewArrivalsAction/GetNewArrivalsAction'
import firebase from 'firebase';
import storage from '@react-native-firebase/storage';
import TestAPI from './TestAPI.js';


export class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        require( "../Images/clothingHome.jpeg"),    
        require( "../Images/clothingSlider.jpeg"),    
        require( "../Images/clothingSlider2.jpeg"),    
      ],
    };
  }

  componentDidMount(){
      // var  a = new TestAPI();
      // a.myPromise().then(res => this.setState({imgUrl : res})).catch(err => console.log(err));
      this.props.getListNewArrivals();
  }

  componentDidUpdate(prevProps){
    if(this.props.newArrivalsItems.status != prevProps.newArrivalsItems.status){
      console.log("ITEMS UPDATE------" , this.props.newArrivalsItems.data )
    }
}

  renderNewArrivalsItem = ({ item }) => {
      return (
        <NewArrivalItem item = { item}/>
      )
  }

  itemSeparator = () => {
    return <View style={{ width : 15 }} />;
  };

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
                data={this.props.newArrivalsItems.data.listItem}
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

function mapStateToProps(state) {
  return {
    newArrivalsItems  : state.NewArrivalsReducer.items,
  };
}
export default connect(mapStateToProps, {getListNewArrivals})(HomeScreen);

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