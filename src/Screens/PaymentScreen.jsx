import {
  Alert,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import AppContainer from '../Components/AppContainer';
import Input from '../Components/Input';
import {Device} from '../Utils/DeviceDimensions';
import Button from '../Components/Button';
import ChevronRight from '../Utils/Icons/Chevrons';
import Separator from '../Components/Separator';
import TabHeader from '../Components/TabHeader';
import {AuthContext} from '../Context/auth-context';
import {Colors} from '../Utils/Colors';
import {Fonts} from '../Utils/Fonts';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../Utils/Loader';
import {Call} from '../Service/Api';
import {Neomorph} from 'react-native-neomorph-shadows';
import Tick from '../Utils/Icons/Tick';
import {ToastMessage} from '../Components/Toastify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HavePlan from '../Utils/Illustrations/HavePlan';
import moment from 'moment';

const PaymentScreen = ({navigation}) => {
  const {isAuthenticated, userData, setUser, logout} = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [plans, setPlans] = React.useState([]);
  const [states, setStates] = React.useState({coupon: '', student_id: ''});
  const [selectedPlan, setSelectedPlan] = React.useState({});
  const [paymentType, setPaymentType] = React.useState('');
  const [havePlan, setHavePlan] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedPlan({});
      setPaymentType('');
      getPlans();
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      let userData = await AsyncStorage.getItem('user_data');
      userData = JSON.parse(userData);
      const response = await Call('userInfo', {}, userData._id);
      setUser(response.data.data[0]);
      const uData = response.data.data[0];
      if (uData?.plan?.is_active) {
        if (moment().diff(uData.plan.subscription_end, 'days') < 0) {
          setHavePlan(
            'plan' in uData &&
              Object.entries(uData.plan) &&
              uData.plan.is_active,
          );
        } else {
          setHavePlan(false);
        }
      } else {
        setHavePlan(false);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.status === 404 || err?.response?.status === 401) {
        logout();
      }
      ToastMessage('error', 'Error', 'Something went wrong.');
    }
  };

  const getPlans = async () => {
    setIsLoading(true);
    try {
      const response = await Call('getPlans', {});
      // setIsLoading(false);
      setPlans(response.data.data);
    } catch (error) {
      setIsLoading(false);
      if (err?.response?.status === 404 || err?.response?.status === 401) {
        logout();
      }
    }
  };

  const reset = () => {
    setPaymentType('');
    setSelectedPlan({});
    getData();
  };

  const applyCoupon = async () => {
    if (states.coupon.trim()) {
      try {
        setIsLoading(true);
        let payload = {
          student_id: userData._id,
          coupon: states.coupon,
          plan: '',
          payment_mode: '',
        };
        const response = await Call('purchasePlan', payload);
        setIsLoading(false);
        ToastMessage('success', 'Success', response.data.message);
        reset();
      } catch (err) {
        setIsLoading(false);
        if (err?.response?.status === 401) {
          logout();
        }
        ToastMessage('error', 'Error', err.response.data.message);
      }
    } else {
      ToastMessage('error', 'Error', 'Please enter a coupon code first.');
    }
  };

  const applyTrial = async () => {
    Alert.alert('Apply Trial', 'Do you want to activate trial?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            setIsLoading(true);
            let payload = {
              student_id: userData._id,
              coupon: '',
              plan: 'TRIAL',
              payment_mode: 'ONLINE',
            };
            const response = await Call('purchasePlan', payload);
            setIsLoading(false);
            ToastMessage('success', 'Success', response.data.message);
            reset();
          } catch (err) {
            setIsLoading(false);
            if (err?.response?.status === 401) {
              logout();
            }
            ToastMessage('error', 'Error', err.response.data.message);
          }
        },
      },
    ]);
  };

  const buyNowPlan = async () => {
    if (paymentType == 'ONLINE' && Object.entries(selectedPlan).length) {
      try {
        setIsLoading(true);
        const response = await Call('onlinePayment', {
          email_or_phone: userData.phone_number,
          mode: 'live',
          amount: selectedPlan.amount,
        });
        setIsLoading(false);
        if (response.data.success) {
          navigation.navigate('webopener', {
            uri: response.data.data[0].checkout_url,
            title: 'Payment',
          });
        } else {
          ToastMessage('error', 'Error', response.data.message);
        }
      } catch (err) {
        setIsLoading(false);
        if (err?.response?.status === 403) {
          logout();
        }
        ToastMessage('error', 'Error', err.response.data.message);
      }
    } else {
      try {
        if (!Object.entries(selectedPlan).length) {
          ToastMessage('error', 'Error', 'Please select a plan first.');
          return;
        }
        if (!paymentType) {
          ToastMessage('error', 'Error', 'Please select a payment type.');
          return;
        }
        setIsLoading(true);
        let payload = {
          student_id: userData._id,
          coupon: '',
          plan: selectedPlan._id,
          payment_mode: paymentType,
        };
        const response = await Call('purchasePlan', payload);
        setIsLoading(false);
        ToastMessage('success', 'Success', response.data.message);
        Alert.alert(
          'Payment successful.',
          'You payment is completed. Now wait for some time, once administration approves the transaction, you can use the app paid features as well.',
        );
        reset();
      } catch (err) {
        setIsLoading(false);
        if (err?.response?.status === 404 || err?.response?.status === 401) {
          logout();
        }
        ToastMessage('error', 'Error', err.response.data.message);
      }
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <TabHeader
        leftClick={() => navigation.openDrawer()}
        navigation={navigation}
        title={'Plans'}
        color={isAuthenticated ? Colors.backgroundColor : Colors.light}
      />
      {!havePlan ? (
        <ScrollView style={{flex: 1}}>
          <AppContainer>
            <View style={{paddingTop: 20}}>
              <Text style={{fontFamily: Fonts.Medium, fontSize: 18}}>
                Already have a coupon code?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 25,
                }}>
                <Input
                  placeholder="Coupon code"
                  style={{width: (Device.width * 2) / 3}}
                  value={states.coupon}
                  onChangeText={coupon =>
                    setStates(prev => ({...prev, coupon}))
                  }
                />
                <Button
                  icon={<ChevronRight fill={Colors.light} />}
                  buttonText=""
                  buttonStyle={{width: 50, shadowRadius: 3}}
                  onPress={applyCoupon}
                />
              </View>
            </View>
            <Separator text={'OR'} />
            <View>
              <Text style={{fontFamily: Fonts.Medium, fontSize: 16}}>
                You have trial available to use all features for 30 days. Tap
                button below to start your trial.
              </Text>
              <Button
                icon=""
                buttonText="Start Trial"
                buttonStyle={{width: 150, shadowRadius: 3, marginTop: 20}}
                onPress={applyTrial}
              />
            </View>
            <Separator text={'OR'} />
            <View>
              <Text style={{fontFamily: Fonts.Medium, fontSize: 16}}>
                You can also purchase a paid plan also. Pick any plan from below
                and select payment mode.{' '}
              </Text>
              <View style={{paddingTop: 50}}>
                {plans.length
                  ? plans.map((item, index) => {
                      return item.name != 'TRIAL' ? (
                        <Pressable
                          onPress={() => setSelectedPlan(item)}
                          key={index}>
                          <Neomorph
                            inner={item._id === selectedPlan._id}
                            style={{
                              shadowRadius: 5,
                              borderRadius: 15,
                              backgroundColor: Colors.backgroundColor,
                              width: Device.width - 50,
                              height: Device.width / 2.5,
                              /* alignItems: 'center', */
                              flexDirection: 'row',
                              paddingHorizontal: 20,
                              paddingTop: 10,
                              marginBottom: 20,
                            }}>
                            <View style={styles.price}>
                              <Text style={styles.priceText}>
                                {'\u20B9'}
                                {item.amount}
                              </Text>
                            </View>
                            {item._id === selectedPlan._id ? (
                              <View
                                style={{
                                  position: 'absolute',
                                  right: 15,
                                  top: 15,
                                }}>
                                <Tick
                                  width={'40px'}
                                  height={'40px'}
                                  stroke={Colors.primary}
                                />
                              </View>
                            ) : (
                              ''
                            )}
                            <View>
                              <Text style={styles.name}>{item.name}</Text>
                              <Text style={styles.title}>
                                {item.duration_days} Days
                              </Text>
                              <Text
                                style={styles.description}
                                numberOfLines={2}>
                                {item.description}
                              </Text>
                            </View>
                          </Neomorph>
                        </Pressable>
                      ) : (
                        ''
                      );
                    })
                  : ''}
              </View>
              <View style={{marginVertical: 25}}>
                <Text style={{fontSize: 20, fontFamily: Fonts.Bold}}>
                  Payment Type
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 25}}>
                  <Pressable onPress={() => setPaymentType('CASH')}>
                    <Neomorph
                      inner={paymentType === 'CASH'}
                      style={{
                        shadowRadius: 5,
                        borderRadius: 15,
                        backgroundColor: Colors.backgroundColor,
                        width: Device.width / 3,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: Fonts.SemiBold,
                          color:
                            paymentType === 'CASH'
                              ? Colors.primary
                              : Colors.dark,
                        }}>
                        Cash
                      </Text>
                      {paymentType === 'CASH' ? (
                        <Tick
                          width={'30px'}
                          height={'30px'}
                          stroke={Colors.primary}
                        />
                      ) : (
                        ''
                      )}
                    </Neomorph>
                  </Pressable>
                </View>
                <View>
                  <Pressable onPress={() => setPaymentType('ONLINE')}>
                    <Neomorph
                      inner={paymentType === 'ONLINE'}
                      style={{
                        shadowRadius: 5,
                        borderRadius: 15,
                        backgroundColor: Colors.backgroundColor,
                        width: Device.width / 3,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: Fonts.SemiBold,
                          color:
                            paymentType === 'ONLINE'
                              ? Colors.primary
                              : Colors.dark,
                        }}>
                        Online
                      </Text>
                      {paymentType === 'ONLINE' ? (
                        <Tick
                          width={'30px'}
                          height={'30px'}
                          stroke={Colors.primary}
                        />
                      ) : (
                        ''
                      )}
                    </Neomorph>
                  </Pressable>
                </View>
              </View>
              <Button
                icon=""
                buttonText="Buy Now"
                buttonStyle={{width: 150, shadowRadius: 3, marginTop: 20}}
                onPress={buyNowPlan}
              />
            </View>
          </AppContainer>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 30,
          }}>
          <HavePlan width={Device.width / 1.5} height={Device.width / 1.5} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.Medium,
              fontSize: 20,
            }}>
            You already have plan purchased. To get a plan, let the current plan
            expire.
          </Text>
        </View>
      )}
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginBottom: 0,
    color: Colors.primary,
    fontFamily: Fonts.Bold,
    /* textAlign: 'center',
    textAlign: 'right',
    position: 'absolute',
    top: -15,
    right: -30, */
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    color: Colors.dark,
    fontFamily: Fonts.Bold,
  },
  description: {
    fontWeight: '300',
    fontSize: 15,
    /* paddingHorizontal: 64, */
    color: Colors.dark,
    fontFamily: Fonts.Medium,
    /* textAlign: 'center', */
    marginRight: 40,
  },
  price: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  priceText: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: Colors.light,
    paddingBottom: 5,
  },
});
