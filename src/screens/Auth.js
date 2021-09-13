import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {ImageBackground} from 'react-native'
import Loader from '../components/Loader'
import { connect } from 'react-redux';
import url from '../components/url'
import axios from 'axios'
// import VersionCheck from 'react-native-version-check';
class Auth extends Component {
  constructor(props){
    super(props)
    this.state={
      Loadingvisible:true
    }
  }
  componentDidMount =async () => {
     auth = await AsyncStorage.getItem('user')
     auth=JSON.parse(auth)
     if(auth==null){
        this.props.navigation.replace('Login');
     }
     else{
      
      axios({
        method: "POST",
        url: url + 'getUser',
        data: {
          'email': auth.email,
          'token': auth.token.toString(),
        }
      })
      .then(async({ data: response }) => {
        if(response.message=='failure'){
            alert('Your Token is expire. Please login again')
            await AsyncStorage.setItem('user','');
            await AsyncStorage.setItem('fcmtoken','');
          this.props.navigation.replace('Login')
        }
          if(response.message=='success'){
            
            if(response.data==null){
              return this.props.navigation.replace('Login');
            }
            this.props.user(response.data)
            this.props.coins(response.data.coins==null?0:response.data.coins)
            this.props.uc(response.data.uc==null?0:response.data.uc)
            this.props.getsilverlimit(response.data.silver_limit)
            this.props.getgoldenlimit(response.data.golden_limit)
            this.props.getplatinumlimit(response.data.platinum_limit)
            await AsyncStorage.setItem('user',JSON.stringify(response.data))
            this.props.navigation.replace('Home');
          }
          else{
            this.props.navigation.replace('Login');
          }
        })
        .catch(async function (response) {
            alert('May be Your Internet Lost!')
        });
    }
        
  }
  render() {
    return (
      <ImageBackground resizeMode="cover" source={require('../assets/app_icon.png')} style={{flex:1}}>
        <Loader visible={this.state.Loadingvisible} />
      </ImageBackground>
    );
  }
}

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
    getsilverlimit: silverLimit => {
      dispatch({ type: 'SILVERLIMIT', silverLimit: silverLimit });
    },
    getgoldenlimit: goldenLimit => {
      dispatch({ type: 'GOLDENLIMIT', goldenLimit: goldenLimit });
    },
    getplatinumlimit: platinumLimit => {
      dispatch({ type: 'PLATINUMLIMIT', platinumLimit: platinumLimit });
    },
  };
};
export default connect(null, mapDispatchToProps)(Auth);