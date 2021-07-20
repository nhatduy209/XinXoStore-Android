import React from 'react';
import { Formik } from 'formik'
import validationAddress from '../../Config/validattionSchema';
import {View,Text,Image,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';
import {addAddress} from '../../redux/action/Address/AddressAction';
import { connect } from 'react-redux';
import {getListAddress} from '../../redux/action/Address/AddressAction';

export class AddressScreen extends React.Component{
    constructor(props){
        super(props);
        this.handleAdd=this.handleAdd.bind(this);
    }
    handleAdd(values){
        this.props.addAddress(this.props.user.data.key,{
            street:values.street,
            number:values.number,
            commune:values.commune,
            district:values.district,
            city:values.city,
        });
    }
    componentDidUpdate(preProps){
        if(preProps!=this.props.add.status){
            this.props.getListAddress(this.props.user.data.key);
            this.props.navigation.goBack();
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Formik 
                    validationSchema={validationAddress}
                    initialValues={{
                        number:"",
                        street:'',
                        commune:'',
                        district:'',
                        city:''}}
                    onSubmit={(values) => {
                        this.handleAdd(values)
                        }}
                    >
                    {({handleChange, handleSubmit ,handleBlur,errors,touched})=>(
                        <>
                            <TextInput  
                                name="number"
                                style={styles.TextInput}
                                placeholder="Number"
                                onBlur={handleBlur('number')}
                                onChangeText={handleChange('number')}
                                />
                            {errors.number && touched.number &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{errors.number}</Text>
                            }
                            <TextInput  
                                name="street"
                                style={styles.TextInput}
                                placeholder="Street"
                                onBlur={handleBlur('street')}
                                onChangeText={handleChange('street')}
                                />
                            {errors.street && touched.street &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{errors.street}</Text>
                            }
                            <TextInput  
                                name="commune"
                                style={styles.TextInput}
                                placeholder="Commune"
                                onBlur={handleBlur('commune')}
                                onChangeText={handleChange('commune')}
                                />
                            {errors.commune  && touched.commune &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{errors.commune}</Text>
                            }
                            <TextInput  
                                name="district"
                                style={styles.TextInput}
                                placeholder="District"
                                onBlur={handleBlur('district')}
                                onChangeText={handleChange('district')}/>
                            {errors.district  && touched.district &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{errors.district}</Text>
                            }
                            <TextInput  
                                style={styles.TextInput}
                                placeholder="City"
                                onBlur={handleBlur('city')}
                                onChangeText={handleChange('city')}/>
                            {errors.city  && touched.city &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{errors.city}</Text>
                            }
                            <TouchableOpacity style={styles.btnCheckout} onPress={(values) => handleSubmit(values)}>
                              <Text style={{color:"#fff",alignSelf:"center",fontWeight:"bold"}}>ADD</Text>
                          </TouchableOpacity>
                        </>  
                    )}
                </Formik>
            </View>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.LoginReducer.user,
        add: state.AddressReducer.add,
    }
}
export default connect(mapStateToProps,{addAddress,getListAddress})(AddressScreen);
const styles=StyleSheet.create({
    GrayText:{
        color:'gray',
        fontSize:15,
    },
    container:{
        marginHorizontal:20,
        justifyContent:'center',
    },
    TextInput:{
        fontSize:18,
        borderBottomWidth: 1,
        borderBottomColor: '#d2d2d2',
        marginVertical:5
    },
    TextPolicy:{
        alignItems:'center',
        marginVertical:15
    },
    ExtensionContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        
    },
    SignInLink:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
    },
    btnCheckout:{
        justifyContent:"center",
        paddingVertical:10,
        alignContent:"center",
        backgroundColor: '#638adf',
        paddingHorizontal:50
    },
});

