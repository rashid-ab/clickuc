import { showMessage, hideMessage } from "react-native-flash-message";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const AlertMessage=(message,description,color)=>{
    showMessage({
        message: message,
        description: description,
        type: "default",
        backgroundColor: color, 
        color: "#fff", 
        duration:message=='Success'?3000:10000,
        titleStyle:{fontWeight:'bold',fontSize:heightPercentageToDP('3%'),paddingTop:hp('0.5%')},
        style:{height:hp('12%')},
        textStyle:{fontSize:heightPercentageToDP('2.5%')}
      });
}