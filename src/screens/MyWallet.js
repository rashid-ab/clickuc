import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView, 
  Alert
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
} from 'react-native-admob-alpha'
import Ad from '../components/Ad'
import Loader from '../components/Loader'
import Header from '../components/header';
import SelectDropdown from 'react-native-select-dropdown'
import url from '../components/url'
import axios from 'axios'
import { connect } from 'react-redux';
import {AlertMessage} from '../components/Alert'
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const uc = [60,300,600];
class MyWallet extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      ucs:'',
      Loadingvisible:false,
    };
  }
  componentDidMount =async () => {
    AdMobInterstitial.setAdUnitID(Ad.Interstitial_id);
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd();
  }
  
  ad=()=>{
    AdMobInterstitial.showAd()
    AdMobInterstitial.addEventListener("adClosed", () => {
    AdMobInterstitial.setAdUnitID(Ad.Interstitial_id);
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd();
    });
  }
  onClickListener = (viewId) => {
    console.log(this.state.ucs)
    if(this.state.ucs==''){
      return AertMessage('Error','Pllease Select UC Package!','red')
    }
    if(this.state.id==''){
      return AlertMessage('Error','Enter Your PUBG ID','red')
    }
    if(this.state.id.length<10 || this.state.id.length>10){
      return AlertMessage('Error','Your PUBG ID should be 10 characters.!','red')
      
    }
    if(this.props.uc<this.state.ucs){
      return AlertMessage('Error','You have less UC than '+this.state.ucs,'red')
    }
    Alert.alert(
      "Confirm Your PUBG ID",
      "Check your Pubg id "+this.state.id,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Confirm", onPress: () => {
          this.setState({Loadingvisible:true})
                axios({
                  method: "POST",
                  url: url + "redeem",
                  data: {
                    email:this.props.user.email,
                    token:this.props.user.token,
                    uc: this.state.ucs,
                    id: this.state.id,
                    user_id: this.props.user.id,
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
                      alert('Great! UC will sent you within 24 hours!');
                      this.ad()
                      this.setState({Loadingvisible:false,id:''})
                      this.props.getcoins(response.remianing_coins)
                      this.props.getuc(response.remianing_uc)
                    }
                    else{
                      this.setState({ Loadingvisible: false });
                      AlertMessage('Connection Failed','Check Your Internet','red')
                    }
                  })
                  .catch(function (response) {
                      this.setState({ Loadingvisible: false });
                      AlertMessage('Connection Failed','Check Your Internet','red')
                  });
        } }
      ]
    );
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Header route={this.props.route.name} navigation={this.props.navigation} />
        <Loader visible={this.state.Loadingvisible} />
        <ScrollView contentContainerStyle={styles.containers} >
        <View style={styles.points}>
          <Text style={{fontSize:hp('2.3%'),color:'white'}}>Total Available Points and UC</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/coin.png')} style={{height:hp('2.5%'),width:hp('3%')}}/>
            <Text style={{fontWeight:'bold',fontSize:hp('2.0%'),color:'white'}}> X {this.props.coins}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../assets/uc.png')} style={{height:hp('2.5%'),width:hp('4%')}}/>
            <Text style={{fontWeight:'bold',fontSize:hp('2.0%'),color:'white'}}> X {this.props.uc}</Text>
          </View>
          <Text style={{color:'white'}}>Minimum Redeem = 60UC</Text>
          <Text style={{color:'white'}}>1000 coins = 1UC</Text>
          <Text style={{color:'white'}}>50th redeem = UC+UC</Text>
        </View>
        <View style={styles.inputView} >
          <TextInput 
              style={styles.inputText}
              placeholder="Pubg ID..."
              keyboardType="numeric"
              placeholderTextColor="#d1d1d1"
              value={this.state.id}
              underlineColorAndroid='transparent'
              onChangeText={(id) => this.setState({id})}/>
        </View>
        <View style={styles.inputView}>
        <SelectDropdown
          data={uc}
          onSelect={(selectedItem, index) => {
            this.setState({ucs:selectedItem})
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          buttonStyle={{width:'100%',height:hp('7%'),borderRadius:10,backgroundColor:"#1A1A1A",color:'white'}}
          buttonTextStyle={{color:'white'}}
          dropdownStyle={{backgroundColor:"#1A1A1A",}}
          rowStyle={{borderBottomColor:"#1A1A1A"}}
          rowTextStyle={{color:'white'}}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener()}>
          <Text style={styles.loginText}>Redeem</Text>
        </TouchableOpacity>
        </ScrollView>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={Ad.banner_id}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
      
    );
  }
}
const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },
  containers: {
    flex: .92,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#D38700',
    margin:20,
    borderRadius:10,
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
  buttonContainer: {
    height:hp('7%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'80%',
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#4B937A",
  },
  loginText: {
    color: 'white',
    fontWeight:'bold',
    fontSize:16
  },
  
  textByRegister:{
    color:"black",
    fontWeight:'bold',
    textAlign:'center',
  },
  points:{
    backgroundColor:'#4B937A',
    width:wp('70%'),
    height:hp('20%'),
    marginBottom:30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    
   }
}); 
const mapDispatchToProps = dispatch => {
  return {
    
    getcoins: coins => {
      dispatch({ type: 'COINS', coins: coins });
    },
    getuc: uc => {
      dispatch({ type: 'UC', uc: uc });
    },
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    coins: state.coins,
    uc: state.uc,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);