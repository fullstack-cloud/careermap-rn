import React from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Fonts} from '../Utils/Fonts';
import {Colors} from '../Utils/Colors';
import {API_BASE, Call} from '../Service/Api';
import Button from './Button';

const QueryDetails = ({data, visible, onClose}) => {
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
            onPress={onClose}
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
              Close
            </Text>
          </TouchableOpacity>
          <ScrollView style={{width: Dimensions.get('screen').width - 100}}>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                  paddingBottom: 6,
                }}>
                <Text
                  style={{
                    color: Colors.light,
                    fontFamily: Fonts.Bold,
                    fontSize: 13,
                  }}>
                  {data.first_name} {data.last_name} {' | '} {data.phone_number}
                </Text>
              </View>
            </View>
            <Text style={{fontFamily: Fonts.Bold, fontSize: 20}}>
              Question: {data.question}
            </Text>
            <View>
              {data.filePath ? (
                <Pressable
                  style={{
                    backgroundColor: Colors.primary,
                    width: 150,
                    alignItems: 'center',
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={
                    () =>
                      Linking.openURL(
                        API_BASE.baseURL +
                          'api/query/' +
                          data._id +
                          '/download',
                      )
                    /*  openFile(data._id+'/download') */
                  }>
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBold,
                      fontSize: 15,
                      color: Colors.light,
                    }}>
                    Download File
                  </Text>
                </Pressable>
              ) : (
                ''
              )}
            </View>
            <View
              style={{
                height: 2,
                borderTopColor: Colors.lightdark,
                borderTopWidth: 0.7,
                marginVertical: 20,
              }}></View>
            <View>
              <View>
                <Text style={{fontFamily: Fonts.SemiBold, fontSize: 20}}>
                  Reply: {data.reply}
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginTop: 20}}>
                <Text
                  style={{
                    backgroundColor:
                      data.status == 'open'
                        ? Colors.primary
                        : data.status == 'booked'
                        ? Colors.green
                        : Colors.lightdark,
                    color: Colors.light,
                    fontFamily: Fonts.Medium,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}>
                  {data.status}
                </Text>
              </View>
              {data.reply_path ? (
                <View>
                  <Pressable
                    style={{
                      backgroundColor: Colors.green,
                      width: 150,
                      alignItems: 'center',
                      paddingVertical: 5,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={
                      () =>
                        Linking.openURL(
                          API_BASE.baseURL +
                            'api/query/' +
                            data._id +
                            '/download/reply',
                        )
                      /* openFile(data._id+'/download/reply') */
                    }>
                    <Text
                      style={{
                        fontFamily: Fonts.SemiBold,
                        fontSize: 15,
                        color: Colors.light,
                      }}>
                      Download File
                    </Text>
                  </Pressable>
                </View>
              ) : (
                ''
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts.Medium,
                      color: '#888',
                      fontSize: 16,
                    }}>
                    {data.counsellor_name}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
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
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    position: 'relative',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 50,
    bottom: 50,
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

export default QueryDetails;
