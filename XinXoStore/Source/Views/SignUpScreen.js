import React from 'react';
import {View,Text,Image,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';
import ButtonPrimary from '../Config/Component/ButtonPrimary';
import ButtonExtension from '../Config/Component/ButtonExtension';
import LogoGoogle from '../../src/images/logo/facebook.png';
import LogoFacebook from '../../src/images/logo/facebook.png';
import { connect } from 'react-redux';
import {SignUp} from '../redux/action/SignUpAction/SignUpAction';
import { Formik } from 'formik'
import validationSchema from '../Config/validattionSchema';

export class SignUpScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            age:''
        }
        this.handleSignUp=this.handleSignUp.bind(this);
    }
    handleSignUp=async(values)=>{
        this.setState({username:values.username,
                    email:values.email,
                    password:values.password,
                    age:values.age});
        this.props.SignUp(this.state.email, this.state.username,this.state.password,this.state.age);
    }
    componentDidMount(){
        console.log("USER: ",this.props.user);
    }
    componentDidUpdate(prevProps){
        if(this.props.user.status!= prevProps.user.status){
            this.props.navigation.navigate('HomeScreen');
            console.log('prop ' +this.props.user.status);
            console.log('preprop '+prevProps.user.status);
        }
    }
    test(values){
        console.log(values);
    }
    render(){
        return(
            <View style={{backgroundColor:'#fcf8ee',height:'100%',justifyContent:'center'}}>
                {/* sign up area */}
                <View style={styles.Container}>
                    <Text style={styles.HeaderText}>Sign Up</Text>
                    <View >
                        <Formik 
                            validationSchema={validationSchema}
                            initialValues={{username:this.state.username,
                                email:this.state.email,
                                password:this.state.password,
                                age:this.state.age}}
                            // onChangeText={value=>console.log('text: ',value)}
                            onSubmit={values=>this.handleSignUp(values)}
                            >
                            {({handleChange, handleSubmit ,handleBlur,errors,touched})=>(
                                <>
                                    <TextInput  
                                        name="username"
                                        style={styles.TextInput}
                                        placeholder="Username"
                                        onBlur={handleBlur('username')}
                                        onChangeText={handleChange('username')}
                                        />
                                    {errors.username && touched.username &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{errors.username}</Text>
                                    }
                                    <TextInput  
                                        name="email"
                                        style={styles.TextInput}
                                        placeholder="Email"
                                        onBlur={handleBlur('email')}
                                        onChangeText={handleChange('email')}
                                        email={true}/>
                                    {errors.email && touched.email &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{errors.email}</Text>
                                    }
                                    <TextInput  
                                        name="password"
                                        style={styles.TextInput}
                                        placeholder="Password"
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={true}/>
                                    {errors.password  && touched.password &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{errors.password}</Text>
                                    }
                                    <TextInput  
                                        style={styles.TextInput}
                                        placeholder="Age"
                                        keyboardType="numeric"
                                        onChangeText={handleChange('age')}/>
                                    {errors.age  && touched.age &&
                                        <Text style={{ fontSize: 15, color: 'red' }}>{errors.age}</Text>
                                    }
                                    <View style={styles.TextPolicy}>
                                        <Text 
                                            style={{color:'gray'}}>
                                            By clicking this button, you agree with our
                                        </Text>
                                        <Text
                                            style={{color:'#638adf',fontWeight:'bold'}}>
                                            Terms and Conditions
                                        </Text>
                                    </View>
                                    {/* <ButtonPrimary onSubmit={handleSubmit}/>  */}
                                    <ButtonPrimary onPressFunction={handleSubmit} /> 
                                </>  
                            )}
                        </Formik>
                    </View>
                                  
                </View>
                 {/* sign up with google or facebook */}
                <View>
                    <View style={styles.ExtensionContainer}>
                            <ButtonExtension text="Google" logo={LogoGoogle}/>
                            <ButtonExtension text="Facebook" logo={LogoFacebook}/>
                    </View>
                </View>
                {/* sign in link  */}
                <View style={styles.SignInLink}>
                    <Text style={styles.GrayText}>
                        Already have an account?  
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{color:'#638adf',fontWeight:'bold',fontSize:18}} >
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.SignUpReducer.user,
    }
}
export default connect(mapStateToProps,{SignUp})(SignUpScreen);
const styles=StyleSheet.create({
    GrayText:{
        color:'gray',
        fontSize:18
    },
    Container:{
        display:'flex',
        position:'relative',
        alignItems:'center',
        borderRadius:30,
        marginHorizontal:10,
        backgroundColor:'#fff',
        paddingVertical:15,
        paddingHorizontal:0
    },
    HeaderText:{
        fontSize:30,
        fontWeight:"bold",
        color:'#232848',
        marginTop:10,
        letterSpacing:1
    },
    TextInput:{
        fontSize:18,
        borderBottomWidth: 1,
        borderBottomColor: '#d2d2d2'
    },
    TextPolicy:{
        alignItems:'center',
        marginVertical:15
    },
    ExtensionContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginHorizontal:10
    },
    SignInLink:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row',
    }
});