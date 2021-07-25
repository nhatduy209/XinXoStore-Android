import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import FeedbackComponent from './DetailItemScreen/RenderFeedback';
const DATA = [
  {
    id: '0',
    title: 'All',
  },
  {
    id: '5',
    title: '5 star',
  },
  {
    id: '4',
    title: '4 star',
  },
  {
    id: '3',
    title: '3 star',
  },

  {
    id: '2',
    title: '2 star',
  },
  {
    id: '1',
    title: '1 star ',
  },
];

class CommentStoreScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.renderItemStyle}>
          <Text>({item.title}) {' '}</Text>
          <StarRating
            fullStarColor='yellow'
            rating={item.id}
            maxStars={item.id}
            starSize={15}
          />
        </View>
      </TouchableOpacity>

    );
  }

  itemSeparator = () => {
    return (
      <View style={{ width: 15 }}></View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 10 }}>
          <FlatList
            horizontal
            data={DATA}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.itemSeparator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView>
          {
            this.props.listReview.map((element,index)=>{
              var item = {Content: element.Content,
                  UserName: element.UserName,
                  Rating:element.Rating,
                  Avatar:element.Img,
              }
          return (<FeedbackComponent key={index} item={item}/>);
          })
          }
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state.LoginReducer.user.data.user);
  return {
      listReview: state.ReviewReducer.items.data.listItem,
  };
}
export default connect(mapStateToProps, {})(CommentStoreScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  renderItemStyle: {
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    padding: 7,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center'
  }
})