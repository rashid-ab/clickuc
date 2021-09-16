import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import url from '../components/url'
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import Loader from '../components/Loader'
class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name   : '',
      email   : '',
      password: '',
      Loadingvisible:false,
    }
  }
login=()=>{
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
        return this.props.navigation.replace('Home')
      }
      else{
        this.setState({ Loadingvisible: false });
        return alert(response.message)
      }
    })
    .catch(function (response) {
      return alert('May be Your Internet Lost!')
    });
}
  onClickListener = (event) => {
    if(event=='signup'){
      if(this.state.name==''){
        return alert('Enter Your Name')
      }
      if(this.state.email==''){
        return alert('Enter Your Email')
      }
      if(this.state.password==''){
        return alert('Enter Your Password')
      }
      this.setState({Loadingvisible:true})
      axios({
        method: "POST",
        url: url + "signup",
        timeout: 10000,
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          
        }
      })
        .then(({ data: response }) => {
          
          if(response.message=='success'){
            this.login()
          }
          else{
            this.setState({ Loadingvisible: false });
            return alert(response.message)
          }
        })
        .catch(function (response) {
          this.setState({ Loadingvisible: false });
          alert('May be Your Internet Lost!')
        });
    }
    if(event=='login'){
    this.props.navigation.navigate('Login')
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Loader visible={this.state.Loadingvisible} />
        <Text style={styles.logo}>Sign Up</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter your Name" 
            placeholderTextColor='#989997' 
            onChangeText={text => this.setState({name:text})}/>
        </View>
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
        <TouchableOpacity style={styles.loginBtn} onPress={()=>this.onClickListener('signup')}>
          <Text style={styles.loginText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

  
      </View>
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
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#4B937A",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
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
export default connect(null, mapDispatchToProps)(SignUp);