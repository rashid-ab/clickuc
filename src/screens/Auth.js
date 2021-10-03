import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {ImageBackground} from 'react-native'
import Loader from '../components/Loader'
import { connect } from 'react-redux';
import url from '../components/url'
import axios from 'axios'
import {AlertMessage} from '../components/Alert'
import {
  AdMobInterstitial,
} from 'react-native-admob-alpha'
import Ad from '../components/Ad'
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
     AdMobInterstitial.setAdUnitID(Ad.Interstitial_id);
     AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
     AdMobInterstitial.addEventListener('adLoaded',async () => {
      await AsyncStorage.setItem('ads','google');
      console.log('Google')
     })
      AdMobInterstitial.addEventListener('adFailedToLoad',async () => {
        await AsyncStorage.setItem('ads','');
      })
     AdMobInterstitial.requestAd();
     if(auth==null){
        this.props.navigation.replace('Login');
     }
     else{
      
      axios({
        method: "POST",
        url: url + 'getUser',
        data: {
          'email': auth.email,
          'token': auth.token,
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
            let ads=await AsyncStorage.getItem('ads')
            if(response.data.app_intro==0){
              if(ads==='google'){
                AdMobInterstitial.showAd()
              }
              else{
                InterstitialAdManager.showAd("IMG_16_9_APP_INSTALL#2029572424039676_2029575330706052")
                .then((didClick) => {})
                .catch((error) => {});
              }
              this.props.navigation.replace('Appintro');
            }
            else{
              if(ads==='google'){
                AdMobInterstitial.showAd()
              }
              else{
                InterstitialAdManager.showAd("195566716011557_195566752678220")
                .then((didClick) => {})
                .catch((error) => {});
              }
              this.props.navigation.replace('Home');
            }
          }
          else{
            if(ads==='google'){
              AdMobInterstitial.showAd()
            }
            else{
              InterstitialAdManager.showAd("IMG_16_9_APP_INSTALL#2029572424039676_2029575330706052")
              .then((didClick) => {})
              .catch((error) => {});
            }
            this.props.navigation.replace('Login');
          }
        })
        .catch(async function (response) {
          return AlertMessage('Connection Failed','Check Your Internet','red')
        });
    }
        
  }
  render() {
    return (
      <ImageBackground resizeMode="cover" source={require('../assets/app_iconss.png')} style={{flex:1}}>
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