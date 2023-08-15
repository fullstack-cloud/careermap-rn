import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../Utils/Colors';
import {Device} from '../Utils/DeviceDimensions';
import { Fonts } from '../Utils/Fonts';

const Separator = ({text = '',style={}}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        ...style
      }}>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.lightdark,
          marginVertical: 20,
          flex: 1,
          /* width: Device.width / 3, */
        }}></View>
      {text != '' && <Text style={{paddingHorizontal: 20,fontFamily: Fonts.Medium}}>{text}</Text>}
      <View
        style={{
          height: 1,
          backgroundColor: Colors.lightdark,
          marginVertical: 20,
          flex: 1,
        }}></View>
    </View>
  );
};
export default Separator;
