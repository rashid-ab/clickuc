import { StyleSheet } from 'react-native';

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
    fontSize:10,
    paddingLeft:20
  },
  profileImage:{
    width:"70%",
    height:"35%",
    alignSelf:'center',
    borderRadius:50
  }
});

export default styles;
