import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DataTable } from 'react-native-paper';
import { getItemForUsers } from '../../redux/action/GetItemsForUser/GetItemsForUserAction'
import TestAPI from '../TestAPI';
import { connect } from 'react-redux';
import _ from 'underscore';
import RenderItemsSelling from './RenderItemSelling'

const DATA_HEADER = [
  'Image', 'Item', 'Category', 'Date', 'Customer', 'Prices', 'Confirm deliver'
]
class ItemSoldScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getItemForUsers(this.props.user.data.key);
  }

  renderHeaderText = ({ item }) => {
    return (
      <Text style={{ fontSize: 18 }}>
        {item.title}
      </Text>

    );
  }

  renderItemSelling = ({ item }) => {
    if (!item.sold) {
      return (
        <RenderItemsSelling item={item} />
      )
    }

  }

  itemSeparator = () => {
    return (
      <View style={{ width: 20 }}></View>
    );
  }

  handleData = (item) => {
    console.log(item.item)
    item.item.map(value => {
      return (
        <DataTable.Cell>{value}</DataTable.Cell>
      );
    })
  }


  confirmDeliver = (item) => {
    console.log("LOG-------------", item)
    this.setState({ iconDeliver: 'check-circle' })
    this.setState({ colorDeliver: 'green' })
  }

  navigateAddProduct = () => {
    this.props.navigation.navigate('AddScreen')
  }

  render() {
    if (_.isEmpty(this.props.items.data)) {
      return null;
    }
    else {
      return (
        <View style={styles.container}>

          {/* ITEM SELLING  */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headerText}>
              Recently Added
            </Text>
            <View style={styles.plus}>
              <TouchableOpacity onPress={this.navigateAddProduct} style={{ width: 100, alignItems: 'center' }}>
                <Icon
                  size={24}
                  name="plus"
                >
                </Icon>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.itemSelling}>
            <FlatList
              horizontal
              data={this.props.items.data.listItemObject}
              keyExtractor={item => item.Name}
              renderItem={this.renderItemSelling}
              ItemSeparatorComponent={this.itemSeparator}
            >
            </FlatList>
          </View>
          {/* ITEM SOLD */}
          <View>
            <Text style={styles.headerText}>
              Recently Sold
            </Text>
          </View>


          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            <DataTable style={{ width: 1000 }}>
              <DataTable.Header>
                {DATA_HEADER.map(value => {
                  return (
                    <DataTable.Title>
                      <Text style={{ fontSize: 17 }}>
                        {value}
                      </Text>

                    </DataTable.Title>
                  )
                })}
              </DataTable.Header>
              <ScrollView>
                {
                  this.props.items.data.listItem.map(item => {

                    if (item[6]) {
                      return (
                        <DataTable.Row style={{ height: 110 }}>
                          <DataTable.Cell>
                            <ImageItem img={item[0]} />
                          </DataTable.Cell>
                          <DataTable.Cell>{item[1]}</DataTable.Cell>
                          <DataTable.Cell>{item[2]}</DataTable.Cell>
                          <DataTable.Cell>{item[3]}</DataTable.Cell>
                          <DataTable.Cell>{item[4]}</DataTable.Cell>
                          <DataTable.Cell>{item[5]}</DataTable.Cell>
                          <DataTable.Cell>
                            <CheckDeliverButton item={item} />
                          </DataTable.Cell>

                        </DataTable.Row>
                      )
                    }

                  })
                }
              </ScrollView>
            </DataTable>


          </ScrollView>


        </View>
      );
    }
  }
}

class CheckDeliverButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconDeliver: 'times-circle',
      colorDeliver: 'red'
    }
  }
  confirmDeliver = (item) => {
    console.log("LOG--------------", item)
    this.setState({ iconDeliver: 'check-circle' })
    this.setState({ colorDeliver: 'green' })
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.confirmDeliver.bind(this, this.props.item)}>
          <Icon
            size={24}
            name={this.state.iconDeliver}
            color={this.state.colorDeliver}
          >
          </Icon>
        </TouchableOpacity>
      </View>
    );
  }
}



class ImageItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "img"
    }
  }


  componentDidMount() {
    var testApi = new TestAPI();
    console.log("AFTER EDIT ----------------", this.props.img)
    testApi.myPromise(this.props.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ justifyContent: 'center' }}>
        <Image
          style={{ height: 70, width: 70, position: 'absolute' }}
          source={{ uri: this.state.url }}>
        </Image>
        <Text>   </Text>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.LoginReducer.user,
    items: state.ItemsUserReducer.items,
  };
}
export default connect(mapStateToProps, { getItemForUsers })(ItemSoldScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerText: {
    fontSize: 25,
    color: "#0066cc"
  },
  plus: {
    marginLeft: 'auto',
    borderColor: '#bbbbbb',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
  },
  itemSelling: {
    marginVertical: 20,
  }
})