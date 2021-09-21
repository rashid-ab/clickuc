import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Header from '../components/header';
import url from '../components/url'
import Ad from '../components/Ad'
import axios from 'axios';
import {AlertMessage} from '../components/Alert'
import {
  AdMobBanner,
} from 'react-native-admob-alpha'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        // {id:1, title: "Daily Checkin", image:"https://img.icons8.com/color/70/000000/cottage.png"},
        {id:2, title: "Supply Crate", },
        {id:3, title: "Classic Crate", } ,
        {id:4, title: "Premium Crate", } ,
        {id:5, title: "My Wallet", } ,
        // {id:5, title: "Referal Code", image:"https://img.icons8.com/color/70/000000/shutdown.png"} ,
      ],
      animationState: 'rest',
    };
  }
  componentDidMount = async() => {
  
    let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
      axios({
        method: "POST",
        url: url + "tokenupdate",
        data: {
          email: user.email,
          device_token: fcmtoken,
          token:user.token,
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
          }
          else{
           alert('Something Wrong!')
          }
        })
        .catch(function (response) {
          //handle error
          return AlertMessage('Error','Check Your Internet')
        });
  }
  clickEventListener(title) {
    
      if(title=="My Wallet"){
        return this.props.navigation.navigate('MyWallet')
      }
      else{
        this.props.navigation.navigate('Crate',{title:title})
    }
  }
  openDrawer = () => {
    this.props.navigation.toggleDrawer()
  }
  render() {
    const { animationState } = this.state;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} route="Clickuc"/>
        <View style={styles.body}>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                // <View>
                item.id==1?
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.title)}}>
                    {item.title=="Supply Crate"?<Image style={styles.cardImage} source={require('../assets/supply.png')}/>
                    :item.title=="Classic Crate"?<Image style={styles.cardImage} source={require('../assets/classics.png')}/>
                    :<Image style={styles.cardImage} source={require('../assets/premium.png')}/>}
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity>
                :
                
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.title)}}>
                    {item.title=="My Wallet"?<Image style={styles.cardImage} source={require('../assets/wallet.png')}/>
                    :item.title=="Supply Crate"?<Image style={styles.cardImage} source={require('../assets/supply.png')}/>
                    :item.title=="Classic Crate"?<Image style={styles.cardImage} source={require('../assets/classics.png')}/>
                    :<Image style={styles.cardImage} source={require('../assets/premium.png')}/>
                    }
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity>
                // </View>
              )
            }}/>
          </View>
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

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
  },
  header:{
    flex:.08,
    // backgroundColor:'#00b5ec',
    justifyContent:'center',
    paddingHorizontal:10
  },
  header_body:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  coins:{
    backgroundColor:'#fff',
    flexDirection:'row',
    borderRadius:10,
    padding:5,
  },
  coins_text:{
    color:'black',
    fontSize:18,
    fontWeight:'bold'
  },
  body:{
    flex:.92
  },
  list: {
    paddingHorizontal: 5,
    // backgroundColor:"#fff",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor:"white",
    //flexBasis: '42%',
    width:wp('40%'),
    height:hp('28%'),
    borderBottomLeftRadius:40,
    borderTopRightRadius:40,
    alignItems:'center',
    justifyContent:'center'
  },
  
  cardImage:{
    height: hp('22%'),
    width: wp('35%'),
    alignSelf:'center',justifyContent:'center'
  },
  title:{
    fontSize:hp('2.5%'),
    flex:1,
    color:'#4B937A',
    alignSelf:'center',
    fontWeight:'bold'
  },
});     