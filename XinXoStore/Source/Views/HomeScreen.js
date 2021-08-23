import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { Dimensions } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NewArrivalItem from './homeScreenFlatlist/HomeScreenArrivalsItems.js'
import { getListNewArrivals } from '../redux/action/GetNewArrivalsAction/GetNewArrivalsAction'
import { getListReviews } from '../redux/action/ReviewAction/ReviewAction.js';


export class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        require("../Images/clothingHome.jpeg"),
        require("../Images/clothingSlider.jpeg"),
        require("../Images/clothingSlider2.jpeg"),
      ],
      imgUrl : "",
    };
  }

  componentDidMount() {
    // console.log('day ne',this.props);
    // var  a = new TestAPI();
    // a.myPromise().then(res => this.setState({imgUrl : res})).catch(err => console.log(err));
    this.props.getListNewArrivals();
  }

  renderNewArrivalsItem = ({ item }) => {
    return (
      
          <NewArrivalItem item={item} navigation={this.props.navigation} />
    )
  }

  itemSeparator = () => {
    return <View style={{ width: 15 }} />;
  };

  handleShowAll = () => {
    this.props.navigation.navigate('NewArrivalsScreen');
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
        <ScrollView>

          {/* New arrivals item  */}
          <View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20 }}>

              <Text style={styles.textCategory}>
                New Arrivals
              </Text>

              <TouchableOpacity style={{ marginLeft: 'auto' }} onPress = {this.handleShowAll}>
                <Text style={styles.textShowAll}>
                  Show all {' '}
                  <Icon name="play" backgroundColor="#3b5998" />
                </Text>
              </TouchableOpacity>

            </View>

            {/* flatlist item  */}
            <FlatList
              data={this.props.newArrivalsItems.data.listItem}
              renderItem={this.renderNewArrivalsItem}
              keyExtractor={item => item.Name}
              horizontal
              ItemSeparatorComponent={this.itemSeparator}
            />
          </View>
          {/* Top Trend */}
          <View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20 }}>

              <Text style={styles.textCategory}>
                Top trends
              </Text>

              <TouchableOpacity style={{ marginLeft: 'auto' }}>
                <Text style={styles.textShowAll}>
                  Show all {' '}
                  <Icon name="play" backgroundColor="#3b5998" />
                </Text>
              </TouchableOpacity>

            </View>

            {/* flatlist item  */}
            <FlatList
              data={this.props.newArrivalsItems.data.listItem}
              renderItem={this.renderNewArrivalsItem}
              keyExtractor={item => item.Name}
              horizontal
              ItemSeparatorComponent={this.itemSeparator}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.NewArrivalsReducer.items.data.listItem);
  return {
    newArrivalsItems: state.NewArrivalsReducer.items,
  };
}
export default connect(mapStateToProps, { getListNewArrivals,getListReviews})(HomeScreen);

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

  textCategory: {
    fontSize: 20
  },

  textShowAll: {
    fontSize: 15,
    color: '#bbbbbb',
    marginTop: 5
  }
})