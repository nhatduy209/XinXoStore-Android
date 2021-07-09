import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import TestAPI from '../TestAPI';

export default class UrlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            url: "img",
        }
    }

    componentDidMount() {
        var testApi = new TestAPI()
        testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }

    render() {
        console.log('url');
        console.log(this.props.item);
        return (
            <View>
                <Image style={{height:140,width:140,resizeMode: 'cover'}} source ={{uri : this.state.url}} />
            </View>
        )
    }
}