import React, {useContext, useEffect} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import AppContainer from '../Components/AppContainer';
import Button, {ButtonHalfWidth} from '../Components/Button';
import NoLogin from '../Components/NoLogin';
import TabHeader from '../Components/TabHeader';
import {AuthContext} from '../Context/auth-context';
import {Call} from '../Service/Api';
import {Colors} from '../Utils/Colors';
import {Device} from '../Utils/DeviceDimensions';
import {Fonts} from '../Utils/Fonts';
import History from '../Utils/Illustrations/History';
import Loader from '../Utils/Loader';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

const HistoryScreen = ({navigation}) => {
  const {isAuthenticated} = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getHistory();
    }, []),
  );

  const getHistory = async () => {
    try {
      setIsLoading(true);
      const response = await Call('history', {});
      setHistory(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TabHeader
        leftClick={() => navigation.openDrawer()}
        navigation={navigation}
        title={'History'}
        color={isAuthenticated ? Colors.backgroundColor : Colors.light}
      />
      <Loader visible={isLoading} />
      {isAuthenticated ? (
        <ScrollView>
          <AppContainer>
            <View style={{alignItems: 'center'}}>
              <History width={Device.width / 2} height={Device.width / 2} />
            </View>
            <View style={{position: 'relative', paddingTop: 20}}>
              <View style={styles.verticalBar}></View>
              {history.map((item, index) => {
                {
                  let date = moment.utc(item.createdAt);
                  date = moment.utc(date).local('id').format('DD MMM YYYY');
                  let subheading = (para = '');
                  let planName = '';
                  let buttonInvoice = '';
                  if (item.type == 'USER_REGISTERED') {
                    subheading = 'Account created successfully.';
                    para =
                      'Buy a plan right now to access full features of this application. You can check out our plans from here.';
                  } else if (item.type == 'PLAN_APPLIED_NOT_ACTIVATED') {
                    subheading = 'Plan applied but not activated.';
                    para = `You account is setup for trial plan. Ask support team to activate your plan and you will be able to use app features.`;
                  } else if (item.type == 'COUPON_APPLIED') {
                    subheading = 'Coupon applied successfully.';
                    para =
                      'Your coupon has successfully applied. You can now use the features of the application. Get your career map in the app.';
                  } else if (item.type == 'PLAN_ACTIVATED') {
                    let planDate = moment.utc(item.data.subscription_start);
                    planDate = moment
                      .utc(planDate)
                      .local('id')
                      .format('DD MMM YYYY');
                    let planEnd = moment.utc(item.data.subscription_end);
                    let stt = moment().diff(item.data.subscription_end, 'days');
                    planEnd = moment
                      .utc(planEnd)
                      .local('id')
                      .format('DD MMM YYYY');
                    subheading = 'Plan activated successfully.';
                    para = `Your plan has been activated on ${planDate}. You can now use premium features until your plan expires. Your plan expire${stt >= 0 ? `d` :`s`} on ${planEnd}`;
                    planName = item.data.plan_name;
                    buttonInvoice = (
                      <ButtonHalfWidth
                        buttonText={'View Invoice'}
                        onPress={() =>
                          navigation.navigate('webopener', {
                            uri: `https://careermaps.live/invoice/${item._id}?caller=app`,
                            title: 'Invoice',
                          })
                        }
                      />
                    );
                  }
                  return (
                    <View style={styles.card} key={index}>
                      <View style={styles.circle}>
                        <View style={styles.dot}></View>
                      </View>
                      <Text style={styles.heading}>{date}</Text>
                      <Text style={styles.subheading}>
                        {subheading}{' '}
                        {planName && (
                          <Text style={{fontFamily: Fonts.Bold, fontSize: 15}}>
                            ({planName})
                          </Text>
                        )}
                      </Text>
                      <Text style={styles.para}>{para}</Text>
                      {buttonInvoice}
                    </View>
                  );
                }
              })}
            </View>
          </AppContainer>
        </ScrollView>
      ) : (
        <NoLogin navigation={navigation} />
      )}
    </>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  verticalBar: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    width: 2,
    top: 30,
    left: 10,
    bottom: 30,
  },
  circle: {
    width: 15,
    height: 15,
    backgroundColor: Colors.primary,
    position: 'absolute',
    left: -21,
    top: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.backgroundColor,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    position: 'relative',
    marginLeft: 25,
    paddingTop: 0,
  },
  buttonStyle: {
    shadowRadius: 2,
    width: Device.width / 3,
    height: 35,
  },
  subheading: {fontFamily: Fonts.Bold, fontSize: 15},
  heading: {fontFamily: Fonts.Bold, fontSize: 18},
  para: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    paddingVertical: 10,
  },
});
