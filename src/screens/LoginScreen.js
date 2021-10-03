import React, { Component } from 'react';
import url from '../components/url'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Loader from '../components/Loader'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import {AlertMessage} from '../components/Alert'
 class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '', 
      Loadingvisible:false
    }
  }
  onClickListener = (event) => {
    if(event=='login'){
      if(this.state.email==''){
        return AlertMessage('Error','Enter Your Email','red')
      }
      if(this.state.password==''){
        return AlertMessage('Error','Enter Your Password','red')
      }
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(this.state.email) === false) {
        return AlertMessage('Error',"Email is Not Correct",'red');
      }
      this.setState({Loadingvisible:true})
      axios({
        method: "POST",
        url: url + "auth/login",
        timeout: 10000,
        data: {
          email: this.state.email,
          password: this.state.password,
        }
      })
        .then(async({ data: response }) => {
          if(response.message=='success'){
            await AsyncStorage.setItem('user',JSON.stringify(response.user))
            this.props.user(response.user)
            this.props.coins(response.user.coins)
            this.props.uc(response.user.uc)
            this.props.silverLimit(response.user.silver_limit)
            this.props.goldenLimit(response.user.golden_limit)
            this.props.platinumLimit(response.user.platinum_limit)
            this.setState({ Loadingvisible: false });
            if(response.user.app_intro==0){
              return this.props.navigation.replace('Appintro');
            }
            return this.props.navigation.replace('Home')
          }
          else{
            this.setState({ Loadingvisible: false });
            return AlertMessage('Login Failed','Check Your email or password!','red')
            
          }
        })
        .catch(function (response) {
          AlertMessage('Connection Failed','Check Your Internet','red')
        });
    }
    if(event=='signup'){
    this.props.navigation.navigate('SignUp')
    }
    
  }
  login = (viewId) => {
    this.props.navigation.replace('Home')
  }

  render(){
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Loader visible={this.state.Loadingvisible} />
        <Text style={styles.logo}>Login</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="abc@gmail.com" 
            placeholderTextColor='#989997' 
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor='#989997' 
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
          <Text style={styles.loginText}>SignUp</Text>
        </TouchableOpacity>

  
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#4B937A",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#1A1A1A",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:14
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#4B937A",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
const mapDispatchToProps = dispatch => {
  return {
    
    user: user => {
      dispatch({ type: 'USER', user: user });
    },
    coins: coins => {
      dispatch({ type: 'COINS', coins: coins });
    },
    uc: uc => {
      dispatch({ type: 'UC', uc: uc });
    },
    silverLimit: silverLimit => {
      dispatch({ type: 'SILVERLIMIT', silverLimit: silverLimit });
    },
    goldenLimit: goldenLimit => {
      dispatch({ type: 'GOLDENLIMIT', goldenLimit: goldenLimit });
    },
    platinumLimit: platinumLimit => {
      dispatch({ type: 'PLATINUMLIMIT', platinumLimit: platinumLimit });
    },
    
  };
};
export default connect(null, mapDispatchToProps)(Login);