import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,TouchableOpacity, ScrollView,SliderBox} from 'react-native'
import TestAPI from '../TestAPI'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DetailItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/clothingHome.jpeg"),
                require("../../Images/clothingSlider.jpeg"),
                require("../../Images/clothingSlider2.jpeg"),
              ],
            imgUrl : "",
          };
    }
    // componentDidMount() {
    //     var testApi = new TestAPI()
    //     testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    // }
    render(){
        return(
            <ScrollView style={styles.container}>
                <View >
                    {/* item image */}
                    {/* <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={250}
                        dotColor="#FFEE58"
                        inactiveDotColor="#90A4AE"
                        paginationBoxVerticalPadding={20}
                        autoplay
                        circleLoop
                    /> */}
                    <Image style={{height:250,marginBottom:10}} source ={this.state.images[1]}/>

                    {/* item name and favarite icon */}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{fontSize:21, fontWeight: '700',width:Dimensions.get("window").width -50}}>
                            Áo jecket túi hộp cổ cứng
                        </Text>
                        <TouchableOpacity >
                                <Icon
                                  size={20}
                                  name="heart"
                                  style = {{ paddingRight : 15 }}
                                  color = "#bbbbbb"
                                >
                                </Icon>
                        </TouchableOpacity>
                    </View>

                    {/* price and rate */}
                    <View style={{marginHorizontal:10,flexDirection: 'row'}}>
                        <Text style={{ color: "#b00", fontSize: 18,width:Dimensions.get("window").width -100}}>
                            $2,000.00
                        </Text>
                        <Icon
                            size={10}
                            name="star"
                            color = "#f89504"
                            style={{paddingRight:5}}
                        >
                        </Icon>
                        <Icon
                            size={10}
                            name="star"
                            color = "#f89504"
                            style={{paddingRight:5}}
                        >
                        </Icon>
                        <Icon
                            size={10}
                            name="star"
                            color = "#f89504"
                            style={{paddingRight:5}}
                        >
                        </Icon>
                        <Icon
                            size={10}
                            name="star"
                            color = "#f89504"
                            style={{paddingRight:5}}
                        >
                        </Icon>
                        <Icon
                            size={10}
                            name="star"
                            color = "#e7e6ec"
                            style={{paddingRight:5}}
                        >
                        </Icon>
                    </View>
                    
                </View>
            </ScrollView>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1
    },
});