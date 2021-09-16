import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: "3%",
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth:1,
    borderBottomColor:'#e6e6e6'
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  btnIcon: {
    height: 35,
    width: 35,
    borderRadius:50,
    marginHorizontal:20
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
    color:'#4B937A',
    fontWeight:'bold'
  }
});

export default styles;
