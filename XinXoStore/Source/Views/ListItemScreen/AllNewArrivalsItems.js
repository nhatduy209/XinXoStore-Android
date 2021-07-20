import React from 'react'
import {View , Text, StyleSheet , FlatList,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import RenderNewArrivalsItem from './RenderNewArrivalsItem'
class AllNewArrivalsItem extends React.Component {


  renderItem = ({item}) => {
    var navigation = this.props.navigation;
    return( 
          <RenderNewArrivalsItem  item  = {item} navigation={navigation}/>
    );
  }

  itemSeparator = () => {
    return <View style={{ height: 10 }} />;
  };

  render(){
    return(
          <View style = {styles.container}>
              <FlatList
              data={this.props.newArrivalsItems.data.listItem}
              renderItem={this.renderItem}
              keyExtractor={item => item.Name}
              ItemSeparatorComponent={this.itemSeparator}
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
export default connect(mapStateToProps, {})(AllNewArrivalsItem);


const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})