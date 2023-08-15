import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../Utils/Colors';
import { PoppinsBold } from '../Utils/Fonts';

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -20},
  1: {scale: 1.2, translateY: -10},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {0: {scale: 0}, 1: {scale: 1}};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            duration={500}
            style={styles.circle}
          />

          <item.icon
            width="20px"
            height="20px"
            fill={focused ? Colors.light : Colors.dark}
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text, {fontWeight: focused ? '900' : '100'}]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default TabButton;

export const TabButtonWithLabel = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = React.useRef(null);
  const textViewRef = React.useRef(null);

  React.useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({0: {scale: 0.5}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0.5}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0.5}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0.5}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={textViewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: Colors.primary, borderRadius: 10},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : Colors.primaryAlfa},
          ]}>
          <item.icon
            width="20px"
            height="20px"
            fill={focused ? Colors.light : Colors.dark}
          />
          <Animatable.View ref={viewRef}>
            {focused && (
              <Text
                style={{
                  color: focused ? Colors.light : Colors.dark,
                  paddingHorizontal: 8,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.light,
    backgroundColor: Colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: PoppinsBold
  },
});
