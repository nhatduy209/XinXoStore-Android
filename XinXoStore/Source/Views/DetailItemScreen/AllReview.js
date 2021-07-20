import React from 'react';
import { Text, View, Dimensions, TouchableOpacity,Image } from 'react-native';
import TestAPI from '../TestAPI';
import UrlComponent from './UrlRender';
import StarRating from './StarRating';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AllReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            images: [
                require("../../Images/sold.png"),
                require("../../Images/sold1.png"),
                require("../../Images/sold2.png"),
            ],
            url: "img",
            like: false,
        }
    }

    componentDidMount() {
        // var testApi = new TestAPI()
        // testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }
    render() {
        return (
            <View>
                <Text>all reviews</Text>
            </View>
        )
    }
}