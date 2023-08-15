import React from 'react';
import {Pressable} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {Colors} from '../Utils/Colors';

const HeaderButton = ({Icon, onPress}) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(prev => !prev)}
      onPressOut={() => setPressed(prev => !prev)}>
      <Neomorph
        inner={pressed}
        style={{
          shadowRadius: 2,
          borderRadius: 25,
          backgroundColor: Colors.primary,
          width: 40,
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Icon fill={Colors.light} />
      </Neomorph>
    </Pressable>
  );
};

export default HeaderButton;
