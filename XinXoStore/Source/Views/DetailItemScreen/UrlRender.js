import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import TestAPI from '../TestAPI';

export default class UrlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            url: "img",
            demension: 0,
            radius:10,
        }
    }

    componentDidMount() {
        this.setState({demension:this.props.item.demension})
        this.setState({radius:this.props.item.radius})
        var testApi = new TestAPI()
        testApi.myPromise(this.props.item.img).then(res => this.setState({ url: res })).catch(err => console.log(err));
    }

    render() {
        return (
            <View style={{padding:10}}>
                <Image style={{height:this.state.demension,width:this.state.demension,resizeMode: 'cover',borderRadius:this.state.radius}} source ={{uri : this.state.url}} />
            </View>
        )
    }
}