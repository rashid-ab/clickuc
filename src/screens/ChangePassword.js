import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  
} from 'react-native';
import {AlertMessage} from '../components/Alert'
import {
  AdMobBanner,
} from 'react-native-admob-alpha'
import Ad from '../components/Ad'
import Loader from '../components/Loader'
import Header from '../components/header';
import url from '../components/url'
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BannerView } from 'react-native-fbads';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      old_password: '',
      Loadingvisible:false,
      ads:'google'
    }
  }
  onClickListener =async (event) => {
    if(event=='login'){
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user);
      if(this.state.password==''){
        return AlertMessage('Error','Please Enter New Password!','red')
      }
      if(this.state.old_password==''){
        return AlertMessage('Error','Please Enter Old Password!','red')
      }
      this.setState({Loadingvisible:true})
      axios({
        method: "POST",
        url: url + "change_password",
        data: {
          email: user.email,
          password: this.state.password,
          old_password: this.state.old_password,
          token:user.token,
        }
      })
      .then(async({ data: response }) => {
        if(response.message=='failure'){
            AlertMessage('Token Expired','Your Token Expired. Login again Please!','red')
            await AsyncStorage.setItem('user','');
            await AsyncStorage.setItem('fcmtoken','');
          this.props.navigation.replace('Login')
        }
          if(response.message=='success'){
            AlertMessage('Success',response.data,'#4B937A')
            this.setState({ Loadingvisible: false,password:'' });
            this.props.navigation.replace('Login')
            
          }
          else{
            this.setState({ Loadingvisible: false });
            AlertMessage('Failed',response.data,'red')
          }
        })
        .catch(function (response) {
          AlertMessage('Connection Failed','Check Your Internet','red')
        });
    }
  }
  render() {
    return (
      
      <View style={styles.container}>
        <Header navigation={this.props.navigation} route="Click UC"/>
        <Loader visible={this.state.Loadingvisible} />
        <View style={styles.body}>
        <Text style={styles.logo}>Change Password</Text>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Old Password..." 
              placeholderTextColor='#989997'
              secureTextEntry={true} 
              onChangeText={old_password => this.setState({old_password:old_password})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="New Password..." 
              placeholderTextColor='#989997'
              secureTextEntry={true} 
              onChangeText={password => this.setState({password:password})}/>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Send</Text>
          </TouchableOpacity>
        </View>
          {this.state.ads=='google'?
            <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.banner_id}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => this.setState({ads:'facebook'})}
            />:
          <BannerView
            placementId="195566716011557_195566766011552"
            type="standard"
            onPress={() => console.log('click')}
            onLoad={() => console.log('loaded')}
            onError={(err) => this.setState({ads:'google'})}
          />}
      </View>
    );
  }
}
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
    fontSize:hp('4%'),
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