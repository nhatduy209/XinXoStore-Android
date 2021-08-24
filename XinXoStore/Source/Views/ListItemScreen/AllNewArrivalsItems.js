import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import RenderNewArrivalsItem from './RenderNewArrivalsItem'
import { getListNewArrivals } from '../../redux/action/GetNewArrivalsAction/GetNewArrivalsAction'
class AllNewArrivalsItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
    }
    this.shouldLoadMore = true;
    this.visible = true ;
  }

  renderItem = ({ item }) => {
    var navigation = this.props.navigation;
    return (
      <RenderNewArrivalsItem item={item} navigation={navigation} />
    );
  }

  itemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };

  getNewData = () => {
    if (this.shouldLoadMore) {
      this.state.limit += 5;
      this.props.getListNewArrivals(false, this.state.limit);
      this.shouldLoadMore = false;
      this.visible = false ;
    }
  }

  renderFooter = () => {
       return(
      <ActivityIndicator size = "large" color = "#bbbbbb" animating = {this.visible}>

      </ActivityIndicator>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newArrivalsItems.data.listItem.length === this.props.newArrivalsItems.data.listItem.length) {
      this.shouldLoadMore = false;
      this.visible = false  ;
    }
    else {
      this.shouldLoadMore = true;
      this.visible = true ;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.newArrivalsItems.data.listItem}
          renderItem={this.renderItem}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={this.itemSeparator}
          onEndReached={() => this.getNewData()}
          onEndReachedThreshold={0.2}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    newArrivalsItems: state.NewArrivalsReducer.items
  };
}
export default connect(mapStateToProps, { getListNewArrivals })(AllNewArrivalsItem);


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})