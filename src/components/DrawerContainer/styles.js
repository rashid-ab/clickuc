import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  container: {
    flex: .7,
    alignItems: 'flex-start',
    // paddingHorizontal: 20
  },
  header:{
    flex:.25,
    flexDirection:'row',
    backgroundColor:"#4B937A",
    paddingHorizontal: 20,
    borderTopColor:'black',
    borderTopWidth:.5,
    borderBottomLeftRadius:40,
    borderTopRightRadius:40,
    
  },
  profileName:{
    color:'white',
    fontSize:16,
    paddingLeft:20
  },
  profileNumber:{
    color:'white',
    fontSize:hp('3%'),
    paddingLeft:20
  },
  profileImage:{
    width:90,
    height:90,
    alignSelf:'center',
    borderRadius:50
  }
});

export default styles;
