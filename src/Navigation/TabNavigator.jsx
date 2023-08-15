import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QueryScreen from '../Screens/QueryScreen';
import HomeScreen from '../Screens/HomeScreen';
import Home from '../Utils/Icons/Home';
import {Colors} from '../Utils/Colors';
import Query from '../Utils/Icons/Query';
import History from '../../History';
import TabButton from './Tabbutton';
import HistoryScreen from '../Screens/HistoryScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import Rupee from '../Utils/Icons/Rupee';
import HomeScreenNoLogin from '../Screens/NoLogin/HomeScreenNoLogin';
import QueryNoLogin from '../Screens/NoLogin/QueryNoLogin';
import PaymentScreenNoLogin from '../Screens/NoLogin/PaymentScreenNoLogin';
import HistoryScreenNoLogin from '../Screens/NoLogin/HistoryScreenNoLogin';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const tabsData = [
    {route: 'Home', label: 'Home', icon: Home, component: HomeScreen},
    {route: 'Query', label: 'Query', icon: Query, component: QueryScreen},
    {
      route: 'History',
      label: 'History',
      icon: History,
      component: HistoryScreen,
    },
    {
      route: 'payment',
      label: 'Plans',
      icon: Rupee,
      component: PaymentScreen,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 10,
          backgroundColor: Colors.primaryAlfa,
        },
        headerShown: false,
      }}>
      {tabsData.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export const TabNavNoLogin = () => {
  const Tab = createBottomTabNavigator();
  const tabsData = [
    {
      route: 'HomeNoLogin',
      label: 'Home',
      icon: Home,
      component: HomeScreenNoLogin,
    },
    {route: 'Query', label: 'Query', icon: Query, component: QueryNoLogin},
    {
      route: 'History',
      label: 'History',
      icon: History,
      component: HistoryScreenNoLogin,
    },
    {
      route: 'payment',
      label: 'Plans',
      icon: Rupee,
      component: PaymentScreenNoLogin,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 10,
          backgroundColor: Colors.primaryAlfa,
        },
        headerShown: false,
      }}>
      {tabsData.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
});
