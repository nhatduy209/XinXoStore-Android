import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DataTable } from 'react-native-paper';
import { getItemForUsers } from '../../redux/action/GetItemsForUser/GetItemsForUserAction'
import TestAPI from '../TestAPI';
const DATA_HEADER = [
  'Image', 'Item', 'Category', 'Date', 'Customer', 'Prices', 'Confirm deliver'
]
import { connect } from 'react-redux';
class ItemSoldScreen extends React.Component {


  componentDidMount() {
    this.props.getItemForUsers(this.props.user.data.key);
  }


  renderHeaderText = ({ item }) => {
    return (
      <View>
        <Text style={{ fontSize: 18 }}>
          {item.title}
        </Text>
      </View>
    );
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
      console.log("LOG--------------" , item)
  }


  render() {
    if (this.props.items.data.length === undefined) {
      return null;
    } else {
      return (
        <View style={styles.container}>

          {/* ITEM SELLING  */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headerText}>
              Recently Added
            </Text>
            <View style={styles.plus}>
              <TouchableOpacity style={{ width: 100, alignItems: 'center' }}>
                <Icon
                  size={24}
                  name="plus"
                >
                </Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 250 }}></View>

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
                  this.props.items.data.map(item => {
                    console.log(item)
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
                          <View>
                            <TouchableOpacity onPress = {this.confirmDeliver.bind(this, item)}>
                              <Icon
                                size={24}
                                name="times-circle"
                                color = 'red'
                              >
                              </Icon>
                            </TouchableOpacity>
                          </View>
                        </DataTable.Cell>

                      </DataTable.Row>
                    )
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
  }
})