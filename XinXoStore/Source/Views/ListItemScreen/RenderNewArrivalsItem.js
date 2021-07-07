import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,TouchableOpacity} from 'react-native'
import TestAPI from '../TestAPI'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class RenderNewArrivalsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "img",
    }
  }
  componentDidMount() {
    var testApi = new TestAPI()
    // console.log(this.props);
    testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
  }
  handleDetail = () => {
    const data = {data:this.props.item,
    url: this.state.url};
    // console.log('props nè');
    // console.log(this.props);
    this.props.item.navigate.navigate('DetailItemScreen',data);
  }
  render() {
    // console.log(this.state.url);
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{ height: 150, width: 120 }}
            source={{ uri: this.state.url }}>
          </Image>
        </View>

        <View style={styles.detailView}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 17 }}>{this.props.item.Name}</Text>
              <Text style={{ color: "#bbbbbb" }}>{this.props.item.prices}VNĐ</Text>
              <Text style={{ color: "#bbbbbb", fontStyle: 'italic' }}>
                <Text>
                  Ngày đăng bán {" "}
                </Text>
                {this.props.item.publicDate}</Text>
            </View>

            <TouchableOpacity  style={styles.iconStyle}>
            <Icon
              size={35}
              name="shopping-cart"
              color="#dc143c"
            ></Icon>
            </TouchableOpacity>
          </View>

          {/* go to detail screen */}
          <TouchableOpacity onPress = {this.handleDetail}>
            <Text style={{ marginLeft: 'auto', fontSize: 20, color: 'blue'  , fontStyle : 'italic'}}>
              Details {' '}
            </Text>
          </TouchableOpacity>


        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  detailView: {
    backgroundColor: '#ffff',
    marginLeft: 5,
    elevation: 0.5,
    width: Dimensions.get("window").width - 120,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: 1
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  }
})