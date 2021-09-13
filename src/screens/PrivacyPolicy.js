import React from 'react';
import { StyleSheet,View,Text,ImageBackground, ScrollView,FlatList } from 'react-native';
import Header from '../components/header';
 class HomeScreen extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    showRealApp: false,
    data:[1],
  }
}

render() {
  return (
    <View style={styles.container}>
      <Header route={this.props.route.name} navigation={this.props.navigation}/>
      <FlatList style={styles.list}
            data={this.state.data}
            horizontal={false}
            keyExtractor= {(item) => {
            }}
            renderItem={({item}) => {
              return (
                <Text>
                  What information do we collect? 

On our website - we do not require your information and the site can be accessed anonymously. Each web server collects information about visitors automatically. This data cannot be traced back to an individual. Our apps may ask to enter a name or email address for the purposes of submitting your redeemed UC, save your progress and achievement. We many also collect installation and usage information, but none of the information can be traced back to the individual.

How do we use this information? 

The web server logs will be used for traffic analysis.. You are free to enter any handle you wish. You have to provide your authentic email Id and pubg Id so we can give you back UC free in terms of when you redeem coins that you have earned .

Do we disclose or otherwise share information with third parties?  

We do not sell, trade or otherwise transfer any personally identifiable information to third parties. This does not include third parties who assist us in operating our site or apps so long as these parties agree to keep this information confidential. 
Log Data
We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.

Cookies
Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.

Security
We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
Links to Other Sites
This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.


Contact us  If you have any questions about this privacy policy - please do not hesitate to contact us at info at appshouse0@gmail.com

                </Text>                
              )
            }}/>

    </View>
    
  );
}
}

const resizeMode = 'center';

const styles = StyleSheet.create({
container: {
  flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: 'black',
},
containers: {
  flex: .9,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:'#D38700',
  borderRadius:10,
  marginHorizontal:10,
  paddingHorizontal:10,
  alignSelf:'center',
  textAlign:'center'

},
}); 

export default HomeScreen;