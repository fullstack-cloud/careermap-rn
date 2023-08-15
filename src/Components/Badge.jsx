import {Text} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Colors';
import {Fonts} from '../Utils/Fonts';

const Badge = ({title,badgeStyle={}}) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 5,
        paddingBottom: 5,
        borderRadius: 20,
        color: Colors.light,
        marginTop: 10,
        fontFamily: Fonts.Bold,
        ...badgeStyle
      }}>
      {title}
    </Text>
  );
};

export default Badge;
