import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Loader from '../components/Loader'
import url from '../components/url'
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      Loadingvisible:false
    }
  }
  onClickListener =async (event) => {
    if(event=='login'){
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user);
      if(this.state.email==''){
        return alert('Enter Your Password')
      }
      this.setState({Loadingvisible:true})
      axios({
        method: "POST",
        url: url + "forget_password",
        data: {
          email: this.state.email,
        }
      })
        .then(async({ data: response }) => {
          
          if(response.message=='success'){
            alert(response.data)
            this.setState({ Loadingvisible: false,password:'' });
          }
          else{
            this.setState({ Loadingvisible: false });
            alert('Something Wrong!')
          }
        })
        .catch(function (response) {
          //handle error
          alert(response)
        });
    }
    if(event=='signup'){
    this.props.navigation.navigate('SignUp')
    }
    
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Loader visible={this.state.Loadingvisible} />
        <View style={styles.body}>
        <Text style={styles.logo}>Forget Password</Text>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="abc@gmail.com" 
              placeholderTextColor='#989997' 
              onChangeText={text => this.setState({email:text})}/>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
  },
  body:{
    flex:.92,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    fontWeight:"bold",
    fontSize:hp('6%'),
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