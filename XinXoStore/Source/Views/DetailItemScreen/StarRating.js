import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const emptyStar = <Icon
                    size={15}
                    name="star"
                    color = "#e7e6ec"
                    style={{paddingRight:5}}
                >
                </Icon>;
const filledStar = <Icon
                    size={15}
                    name="star"
                    color = "#f89504"
                    style={{paddingRight:5}}
                ></Icon>;
const maxStar = [0,1,2,3,4];
export default class StarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            star: 2,
        }
    }
    render() {
        // console.log('state nè');
        const star = (this.props.item.Rating) ? this.props.item.Rating : this.state.star;
        return (
            
            <View style={{flexDirection: 'row'}}>
                {maxStar.map((item,key) =>{
                    const check = star > item;
                    return (
                        // <TouchableOpacity>
                            <View
                            key = {item}>
                            {check ? filledStar : emptyStar}
                            </View>
                        // </TouchableOpacity>  
                    )
                })}
            </View>
        )
    }
}