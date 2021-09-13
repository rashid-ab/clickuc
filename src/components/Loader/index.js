import React from 'react';
import {Image,Text,View} from 'react-native';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import * as Animatable from 'react-native-animatable';
export default class Loader extends React.Component {
    // icon = () => {
    //     return(
    //         <Image source={require('../../assets/icon.png')} style={{width:200,height:200}}/>
    //     )
    // }
    render() {
        return (
            <OrientationLoadingOverlay
                visible={this.props.visible}
                >
                <Animatable.View animation="pulse" easing="ease-in-out" iterationCount="infinite" style={{ textAlign: 'center',alignItems:'center' }}>
                    <Image source={require('../../assets/loader.png')} style={{width:200,height:200}}/>
                    <Text style={{color:'white',color:'#4B937A',fontSize:18,fontWeight:'bold'}}>Loading...</Text>
                </Animatable.View>
            </OrientationLoadingOverlay>
            
        );
        }
}
