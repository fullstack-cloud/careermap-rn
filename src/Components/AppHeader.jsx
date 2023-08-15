import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import HeaderButton from './HeaderButton';
import Switch from '../Utils/Icons/Switch';

const AppHeader = ({ left, middleText = '', right, style = {} }) => {
  return (
    <View
      style={{
        height: 80,
        backgroundColor: Colors.backgroundColor,
        ...style,
      }}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 20,
          height: 70,
          elevation: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
        {left.show ? (
          <View style={{zIndex: 1}}><HeaderButton
            Icon={left.Icon}
            text={left.text || ''}
            onPress={left.click}
          /></View>
        ) : (
          <Text>{''}</Text>
        )}
        <Text
          style={{
            fontSize: 20,
            fontFamily: Fonts.SemiBold,
            textAlign: 'center',
            color: Colors.light,
            position: 'absolute',
            left: 0,right: 0,
            zIndex: -1
          }}>
          {middleText}
        </Text>
        {right.show ? (
          <View style={{flexDirection: 'row'}}>
          {middleText == 'Home' && right.showSwitch ? <HeaderButton
            Icon={Switch}
            text={right.text || ''}
            onPress={right.switch}
          /> : ''}
          <View style={{padding: 5}}></View>
          <HeaderButton
            Icon={right.Icon}
            text={right.text || ''}
            onPress={right.click}
          />

          </View>
        ) : (
          <Text>{''}</Text>
        )}
      </View>
    </View>
  );
};

export default AppHeader;
