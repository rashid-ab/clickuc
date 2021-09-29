import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {
  withNativeAd,
  AdIconView,
  TriggerableView,
  MediaView,
} from 'react-native-fbads';

const width = Dimensions.get('window').width;

const NativeAdView = (props) => {
  return (
    <View style={{flexDirection: 'column', borderWidth: 1}}>
      {/* <MediaView style={{width: width - 42, height: 400}} /> */}
      <View style={{flexDirection: 'row'}}>
        <AdIconView style={{width: 80, height: 80}} />
        <View style={{flexDirection: 'column', paddingHorizontal: 10, flex: 1,  width: width - 30, height: 200}}>
          <TriggerableView style={{fontSize: 18}}>
            {props.nativeAd.headline}
          </TriggerableView>
          <Text>{props.nativeAd.sponsoredTranslation}</Text>
          <TriggerableView style={{fontSize: 10}}>
            {props.nativeAd.linkDescription}
          </TriggerableView>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TriggerableView
          style={{
            fontSize: 15,
            color: '#a70f0a',
            paddingVertical: 10,
            paddingHorizontal: 30,
            elevation: 3,
            borderTopWidth: 0,
            margin: 10,
            borderRadius: 6,
            width: width - 30
          }}>
          {props.nativeAd.callToActionText}
        </TriggerableView>
      </View>
    </View>
  );
};

export default withNativeAd(NativeAdView);