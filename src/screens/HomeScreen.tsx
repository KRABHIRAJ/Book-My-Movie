/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/theme';
import InputHeader from '../components/InputHeader';

const HomeScreen = () => {
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState<any>(undefined);
  const [upcomingMovieList, setUpcomingMovieList] = useState<any>(undefined);
  const [popularMovieList, setPopularMovieList] = useState<any>(undefined);

  if
    (nowPlayingMovieList == undefined
    && nowPlayingMovieList == null
    && upcomingMovieList == undefined
    && upcomingMovieList == null
    && popularMovieList == undefined
    && popularMovieList == null){
    return (
      <ScrollView
        style={styles.scrollViewContainer}
        bounces={false}
        contentContainerStyle={styles.scrollViewContentContainer} >
        <StatusBar hidden />
        <View style={styles.SearchContainer}>
          <InputHeader />
        </View>
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={'large'} color={COLORS.Orange}/>
        </View>
      </ScrollView>
    );

  }
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scrollViewContainer:{
    backgroundColor:'black',
    flex:1,
  },
  scrollViewContentContainer:{
    flex:1,
  },
  loadingIcon:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  SearchContainer: {
    marginTop: StatusBar.currentHeight && (StatusBar.currentHeight + 10),
  },
});
