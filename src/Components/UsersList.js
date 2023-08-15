import React from 'react';
import {
  Pressable,
  ScrollView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../Utils/Fonts';
import {Colors} from '../Utils/Colors';
import {Neomorph} from 'react-native-neomorph-shadows';
import {Device} from '../Utils/DeviceDimensions';
import Tick from '../Utils/Icons/Tick';
import Button from './Button';

const UsersList = ({data, visible, onClose, onChoose, ignoreKey = ''}) => {
  const [selected, setSelected] = React.useState('');

  const onPressHandle = () => {
    let selectedVal = selected;
    setSelected('');
    onChoose(selectedVal);
  };

  return (
    <Modal
      transparent={visible}
      animationType={'none'}
      visible={visible}
      style={{zIndex: 1100}}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setSelected(''), onClose();
            }}
            style={{
              position: 'absolute',
              right: 20,
              top: 10,
              backgroundColor: Colors.error,
              paddingHorizontal: 10,
              paddingTop: 3,
              paddingBottom: 5,
              borderRadius: 30,
            }}>
            <Text style={{fontFamily: Fonts.Bold, color: Colors.light}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <ScrollView>
            {data &&
              data.map((item, index) => {
                return ignoreKey != item._id ? (
                  <Pressable
                    key={index}
                    style={{
                      flex: 1,
                      marginBottom: 5,
                      backgroundColor: Colors.backgroundColor,
                      alignItems: 'flex-start',
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                    }}
                    onPress={() => setSelected(item._id)}>
                    <Neomorph
                      inner={selected == item._id}
                      style={{
                        shadowRadius: 5,
                        borderRadius: 15,
                        backgroundColor: Colors.backgroundColor,
                        width: Device.width * 0.74,
                        height: 90,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                      {selected == item._id && (
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: Colors.primary,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderTopRightRadius: 15,
                            borderBottomLeftRadius: 15,
                          }}>
                          <Tick width={20} height={20} stroke={Colors.light} />
                        </View>
                      )}
                      <View style={{paddingHorizontal: 30, paddingVertical: 5}}>
                        <Text style={{fontFamily: Fonts.Bold, fontSize: 18}}>
                          {item.first_name} {item.last_name}
                        </Text>
                        <Text style={{fontFamily: Fonts.Medium, fontSize: 16}}>
                          {item.email}
                        </Text>
                      </View>
                    </Neomorph>
                  </Pressable>
                ) : (
                  ''
                );
              })}
          </ScrollView>

          <View
            style={{
              marginTop: 40,
              alignItems: 'center',
              paddingBottom: 20,
              justifyContent: 'center',
            }}>
              <Button
                buttonStyle={{width: Device.width - 85}}
                buttonText={'Login Now'}
                onPress={onPressHandle}
              />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    position: 'relative',
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 150,
    bottom: 150,
    left: 20,
    right: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  animation: {
    width: 100,
    height: 100,
  },
});

export default UsersList;
