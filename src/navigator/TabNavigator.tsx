/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarHideOnKeyboard: false, tabBarStyle: {
        backgroundColor: COLORS.Black,
        borderTopWidth: 0,
        height: SPACING.space_10 * 10,
    }}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
            return <View style={[styles.activeBackground, focused ? {backgroundColor: COLORS.Orange} : {}]}>
                <CustomIcon name='video'  color={COLORS.White} size={FONTSIZE.size_30}/>
            </View>
        }
      }}/>
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
            return <View style={[styles.activeBackground, focused ? {backgroundColor: COLORS.Orange} : {}]}>
                <CustomIcon name='search'  color={COLORS.White} size={FONTSIZE.size_30}/>
            </View>
        }
      }}/>
      <Tab.Screen name="Ticket" component={TicketScreen} options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
            return <View style={[styles.activeBackground, focused ? {backgroundColor: COLORS.Orange} : {}]}>
                <CustomIcon name='ticket'  color={COLORS.White} size={FONTSIZE.size_30}/>
            </View>
        }
      }}/>
      <Tab.Screen name="User" component={UserAccountScreen} options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
            return <View style={[styles.activeBackground, focused ? {backgroundColor: COLORS.Orange} : {}]}>
                <CustomIcon name='user'  color={COLORS.White} size={FONTSIZE.size_30}/>
            </View>
        }
      }}/>
    </Tab.Navigator>
  );
};


export default TabNavigator;

const styles = StyleSheet.create({
    activeBackground : {
        backgroundColor: COLORS.Black,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10,
    }
});
