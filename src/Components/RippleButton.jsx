import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const RippleButton = ({
  buttonText,
  onPress,
  backgroundColor,
  color = null,
}) => {
  borderStyle = {};

  const colorStyle = color ? {color} : {};
  return (
    <View style={[styles.buttonView]}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: '#ffffff31', borderless: true}}
        style={[styles.loginButton, {backgroundColor}]}>
        <Text style={[styles.buttonText, colorStyle]}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default RippleButton;

const styles = StyleSheet.create({
  buttonView: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    elevation: 25,
  },
  loginButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
  },
});
