/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import UserDetailOption from '../components/UserDetailOption';

const UserAccountScreen = ({navigation} : any) => {
  return (
    <View style={styles.container}>
        <AppHeader name="close" title={'My Profile'} action={() => navigation.goBack()}/>

        <View style={styles.userInfoContainer}>
            <Image style={styles.profileImg} source={{uri : 'https://www.jagranimages.com/webstories/50522/disha-patani-beauty-1686655767.jpeg'}} />
            <Text style={styles.userName}>Disha Patani</Text>
        </View>

        <UserDetailOption name="user" title="Account" />
        <UserDetailOption name="setting" title="Settings" />
        <UserDetailOption name="dollar" title="Offer & Rewards" />
        <UserDetailOption name="info" title="About" />
    </View>
  );
};

export default UserAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  userInfoContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:SPACING.space_24,
  },
  profileImg:{
    width:80,
    height:80,
    resizeMode:'cover',
    borderRadius:99,
  },
  userName:{
    color: COLORS.White,
    marginTop: SPACING.space_10,
    fontSize: FONTSIZE.size_18,
  },

});
