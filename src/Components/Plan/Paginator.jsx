import {
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../Utils/Colors';

const Paginator = ({data, scrollX, slideRef}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={{flexDirection: 'row', height: 20, alignItems: 'center'}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 26, 8],
          extrapolate: 'clamp',
        });

        const dotHeight = scrollX.interpolate({
          inputRange,
          outputRange: [8, 10, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity
            onPress={i => {
              slideRef.current.scrollToIndex({index: _.id - 1, animated: true});
            }}
            key={i.toString()}>
            <Animated.View
              style={[
                styles.dot,
                {width: dotWidth, height: dotHeight, opacity},
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 15,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
    backgroundColor: Colors.primary,
    marginBottom: 30
  },
});
