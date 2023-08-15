import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import {Colors} from '../../Utils/Colors';
import {Device} from '../../Utils/DeviceDimensions';
import {Fonts} from '../../Utils/Fonts';
import Button from '../Button';

const PlanBox = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width, padding: 30}]}>
      <Neomorph
        inner={false}
        style={{
          shadowRadius: 5,
          borderRadius: 15,
          backgroundColor: Colors.backgroundColor,
          width: Device.width - 100,
          height: 350,
        }}>
        <View style={styles.price}>
          <Text style={styles.priceText}>{'\u20B9' + item.amount}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.title}>{item.duration_text}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              buttonText={'Buy Now'}
              buttonStyle={{width: Device.width / 2}}
              onPress={null}
            />
          </View>
        </View>
      </Neomorph>
    </View>
  );
};

export default PlanBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    marginBottom: 10,
    color: Colors.primary,
    fontFamily: Fonts.Bold,
    /* textAlign: 'center', */
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: Colors.primary,
    fontFamily: Fonts.Bold,
    /* textAlign: 'center', */
  },
  description: {
    fontWeight: '300',
    fontSize: 18,
    /* paddingHorizontal: 64, */
    color: Colors.dark,
    fontFamily: Fonts.Medium,
    /* textAlign: 'center', */
  },
  price: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    borderRadius: 50
  },
  priceText: {
    fontSize: 30,
    fontFamily: Fonts.Bold,
    color: Colors.light,
    paddingBottom: 3
  },
});
