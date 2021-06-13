import React from 'react';
import {View,Text,Image,StyleSheet,TextInput, Button,TouchableOpacity} from 'react-native';
import ButtonPrimary from '../Config/Component/ButtonPrimary';
import ButtonExtension from '../Config/Component/ButtonExtension';
import LogoGoogle from '../../src/images/logo/facebook.png';
import LogoFacebook from '../../src/images/logo/facebook.png';
import { connect } from 'react-redux';
import {SignUp} from '../redux/action/SignUpAction/SignUpAction';
import ErrorMessage from '../Config/ErrorMessage';
import { MessageValidate } from '../Config/MessageValidate';

export class SignUpScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            age:''
        }
    }
    textChangeHandler(value,type){
        switch(type){
            case 'username':
                this.setState({username:value});
                break;
            case 'password':
                this.setState({password:value});
                break;
            case 'email':
                this.setState({email:value});
            case 'age':
                this.setState({age:value});
        }
    }
    handleSignUp=async()=>{
        //validate
        const emailError= validate("email",this.state.email);

        this.props.SignUp(this.state.email, this.state.username,this.state.password,this.state.age);
    }
    componentDidMount(){
        console.log("USER: ",this.props.user);
    }
    componentDidUpdate(prevProps){
        if(this.props.user.status!= prevProps.user.status){
            // this.props.navigation.navigate('HomeScreen');
            console.log('prop ' +this.props.user.status);
            console.log('preprop '+prevProps.user.status);
        }
    }
    render(){
        return(
            <View style={{backgroundColor:'#fcf8ee',height:'100%',justifyContent:'center'}}>
                {/* sign up area */}
                <View style={styles.Container}>
                    <Text style={styles.HeaderText}>Sign Up</Text>
                    <View >
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Username"
                            onChangeText={value=>this.textChangeHandler(value,'username')}/>
                        <ErrorMessage errorValue={MessageValidate.EMAIL}/>
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Email"
                            onChangeText={value=>this.textChangeHandler(value,'email')}
                            email={true}/>
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Password"
                            onChangeText={value=>this.textChangeHandler(value,'password')}
                            secureTextEntry={true}/>
                        <TextInput  
                            style={styles.TextInput}
                            placeholder="Age"
                            onChangeText={value=>this.textChangeHandler(value,'age')}/>
                        
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
                        <ButtonPrimary onPressFunction={this.handleSignUp.bind(this)}/>   
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