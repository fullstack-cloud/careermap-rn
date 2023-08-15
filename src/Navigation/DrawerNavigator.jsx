import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button';
import Hamburger from '../Utils/Icons/Hamburger';
import Home from '../Utils/Icons/Home';
import Info from '../Utils/Icons/Info';
import Privacy from '../Utils/Icons/Privacy';
import Terms from '../Utils/Icons/Terms';
import {Colors} from '../Utils/Colors';
import TabNavigator from './TabNavigator';
import User from '../Utils/Icons/User';
import {Fonts} from '../Utils/Fonts';
import Badge from '../Components/Badge';
import ProfileIcon from '../Utils/Icons/ProfileIcon';
import {Device} from '../Utils/DeviceDimensions';
import {AuthContext} from '../Context/auth-context';
import moment from 'moment';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return <MyDrawer />;
};

export default DrawerNavigator;

function MyDrawer() {
  const {userData} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props =>
        userData ? <CustomDrawerContent {...props} data={userData} /> : <></>
      }
      screenOptions={({navigation}) => ({
        headerLeft: props => (
          <Button
            onPress={navigation.toggleDrawer}
            buttonStyle={{
              marginLeft: 20,
              width: 50,
              height: 35,
              borderRadius: 10,
            }}
            icon={<Hamburger fill={Colors.light} />}></Button>
        ),
        headerStyle: {
          elevation: 50,
          shadowOpacity: 50,
        },
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: Colors.primary},
        drawerStyle: {
          backgroundColor: Colors.light,
          width: '70%',
        },
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: {marginLeft: -20},
      })}>
      <Drawer.Screen
        name="TabHome"
        component={TabNavigator}
        options={{
          drawerIcon: config => (
            <Home width="20px" height="20px" fill={Colors.primary} />
          ),
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  let expDate = '';
  let planName = '';
  if (props.data && 'plan' in props.data && props.data.plan.is_active) {
    if (moment().diff(props.data.plan.subscription_end, 'days') < 0) {
      expDate = props.data.plan.subscription_end
        ? props.data.plan.subscription_end.split('T')[0]
        : '';
      planName = props.data.plan.is_active && props.data.plan.name;
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: Colors.primaryAlfa,
          height: 190,
          marginTop: -5,
          marginBottom: 50,
          elevation: 5,
          justifyContent: 'flex-end',
          paddingBottom: 60,
          paddingHorizontal: 20,
          borderBottomEndRadius: 40,
          borderBottomLeftRadius: 40,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <User width="50px" height="50px" />
          </View>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontFamily: Fonts.Medium, fontSize: 15}}>
              Welcome,{' '}
              {props.data &&
                props.data.first_name &&
                props.data.first_name.substring(0, 10)}
            </Text>
            {planName && <Badge title={planName} />}
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {expDate && (
            <View
              style={{
                backgroundColor: Colors.primary,
                marginTop: 10,
                paddingTop: 2,
                paddingBottom: 4,
                paddingHorizontal: 5,
                borderRadius: 5,
              }}>
              <Text style={{color: Colors.light, fontFamily: Fonts.Bold}}>
                Expiring on: {expDate}
              </Text>
            </View>
          )}
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => {
          props.navigation.navigate('Profile');
        }}
        icon={() => (
          <ProfileIcon width="20px" height="20px" fill={Colors.primary} />
        )}
        labelStyle={{marginLeft: -20}}
      />
      <DrawerItem
        label="Privacy Policy"
        onPress={() => {
          props.navigation.navigate('webopener', {
            uri: 'https://careermaps.live/privacy-policy',
            title: 'Privacy Policy',
          });
        }}
        icon={() => (
          <Privacy width="20px" height="20px" fill={Colors.primary} />
        )}
        labelStyle={{marginLeft: -20}}
      />
      <DrawerItem
        label="Terms & Conditions"
        onPress={() => {
          props.navigation.navigate('webopener', {
            uri: 'https://careermaps.live/terms-conditions',
            title: 'Terms & Conditions',
          });
        }}
        icon={() => <Terms width="20px" height="20px" />}
        labelStyle={{marginLeft: -20}}
      />
      <DrawerItem
        label="About App"
        onPress={() => props.navigation.navigate('Info')}
        icon={() => <Info width="20px" height="20px" />}
        labelStyle={{marginLeft: -20}}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: Device.width - 50,
    width: Device.width - 50,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  animation: {
    width: 100,
    height: 100,
  },
  close: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 20,
    padding: 5,
  },
});
