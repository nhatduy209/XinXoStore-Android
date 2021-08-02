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
            <View style={styles.item}>
                <Image style={{height:120,width:120,resizeMode: 'cover',borderRadius:10}} source ={{uri : this.state.url}} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        elevation:6,
        marginTop:10,
        backgroundColor:'#fff',
        borderRadius:10,
        height:120,
        borderColor: '#aaa',
        marginRight:10
    },
})