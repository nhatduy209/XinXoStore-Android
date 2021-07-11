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
        return (
            <View style={{padding:15,backgroundColor:'#0000fd',borderRadius:90}}>
                <Image style={{height:130,width:130,resizeMode: 'cover',borderRadius:80}} source ={{uri : this.state.url}} />
            </View>
        )
    }
}