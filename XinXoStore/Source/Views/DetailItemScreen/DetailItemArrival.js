import React from 'react'
import { View, Dimensions, StyleSheet, Image, Text ,TouchableOpacity, ScrollView,FlatList} from 'react-native'
import TestAPI from '../TestAPI';
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import NewArrivalItem from '../homeScreenFlatlist/HomeScreenArrivalsItems.js'
import { getArrivalItem } from '../../redux/action/GetItemArrivalAction/GetItemArrivalAction.js';
import StarRating from './StarRating';

class DetailItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require("../../Images/clothingHome.jpeg"),
                require("../../Images/clothingSlider.jpeg"),
                require("../../Images/clothingSlider2.jpeg"),
              ],
            url : "img",
          };
    }
    componentDidMount() {
        var testApi = new TestAPI()
        testApi.myPromise(this.props.route.params.data.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
        // const data = this.props.route.param.;
        // console.log('mount');
        // console.log(this.props.route.params.data);
        
        // this.props.getArrivalItem(this.props.route.params.data.Name);
    }
    itemSeparator = () => {
        return <View style={{ width: 15 }} />;
    }

    render(){
        return(
            <View>
                
                <ScrollView>
                    {/* item images */}
                    <View style={{position:'absolute'}}>
                        {/* <Image source ={{uri : this.props.route.params.data.url}} /> */}
                        <SliderBox
                            images={this.state.images}
                            sliderBoxHeight={350}
                            dotColor="#FFEE58"
                            inactiveDotColor="#90A4AE"
                            paginationBoxVerticalPadding={50}
                            autoplay
                            circleLoop
                            
                        />
                    </View>
                    <View style={{height:320}}>
                        
                    </View>
                    
                <View style={styles.boxContent}>
                    <View>
                        {/* item name and favarite icon */}
                        <View style={{ flexDirection: 'row', paddingVertical:10,paddingHorizontal:20,marginTop:20 }}>
                            <Text style={styles.textTitles}>
                                {this.props.route.params.data.Name}
                            </Text>
                            <TouchableOpacity >
                                    <Icon
                                    size={20}
                                    name="heart"
                                    style = {{ paddingRight : 15 }}
                                    color = {this.props.route.params.data.liked ? "#F00":"#bbbbbb"}
                                    >
                                    </Icon>
                            </TouchableOpacity>
                        </View>
                        {/* price and rate */}
                        <View style={{position:'relative',paddingHorizontal:20,paddingVertical:10}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{ color: "#000", fontSize: 21,width:Dimensions.get("window").width -150}}>
                                {this.props.route.params.data.prices}
                                </Text>
                                <View>
                                    <StarRating item={this.props.route.params.data}/>
                                </View>
                                
                        </View>
                        </View>
                        {/* maybe also like */}
                        <View>
                            <View style={{ flexDirection: 'row', padding:10}}>
                                <Text style={{ fontSize:14,width:Dimensions.get("window").width - 150}}>
                                    Maybe you also like 
                                </Text>
                                {/* <Text style={{ fontSize:14,padding:20}}>Show all</Text> */}
                            </View>
                            {/* flatlist item  */}
                            <View style={{paddingHorizontal:10}}>
                                <FlatList
                                data={this.props.newArrivalsItems.data.listItem}
                                renderItem={({item = {navigate:this.props.navigate,...item}}) =>
                                    <NewArrivalItem item={item = {navigate:this.props.navigation,...item}}/>}
                                keyExtractor={item => item.Name}
                                horizontal
                                ItemSeparatorComponent={this.itemSeparator}
                                
                                />
                            </View>
                            
                        </View>
                        {/* decriptions */}
                        <View style={{marginHorizontal:20,paddingVertical:10}}>
                            <Text style={styles.textTitles}>
                                Description
                            </Text>
                            <Text style={{lineHeight:20,paddingTop:10}}>
                                {/* {this.props.route.params.description} */}
                            Đây là những chiếc áo khoác được thiết kế theo phong cách hoàng gia Anh.
                            Thiết kế này giúp cho người mặc tăng thêm sự quyến rũ và duyên dáng.
                            Dù hiện nay nó không còn phổ biến nữa nhưng vẫn được rất nhiều người yêu thích. 
                            </Text>
                        </View>
                    </View>
                    
                    {/* add to card */}
                    <View style={styles.box}>
                        <TouchableOpacity>
                            <Text style={{borderRadius:30,
                            fontSize:16,
                            padding:20,
                            marginTop:20,
                            color:'#fff',
                            width: Dimensions.get("window").width - 40,
                            backgroundColor:'#ea5310',
                            textAlign:'center',
                            }}>
                                Add to card
                            </Text>
                        </TouchableOpacity> 
                    </View>
                </View>
                </ScrollView>
            </View>           
        
        );
    }
}
function mapStateToProps(state) {
    // console.log('state nè')
    //  console.log(state.NewArrivalsReducer.items.data);
    return {
        newArrivalsItems: state.NewArrivalsReducer.items,
    };
  }
// export default connect(mapStateToProps, {getArrivalItem})(DetailItem);
export default connect(mapStateToProps, {})(DetailItem);
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1
    },
    imageStyle: {
        height: 150,
        width: Dimensions.get("window").width-40
      },
    textTitles : {
        fontSize:21,
        fontWeight: '700',
        width:Dimensions.get("window").width-80
    },
    box:{
        paddingHorizontal:10,
        position:'relative',
        bottom:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContent:{
        position:'relative',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        width: Dimensions.get("window").width,
        backgroundColor: "#fff",
        elevation:5
    }
});