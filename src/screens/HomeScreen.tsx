/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';
import { baseImagePath, nowPlayingMovies, popularMovies, upcomingMovies } from '../api/apicalls';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMovieList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getNowPlayingMovieList err : ', err);
  }
};

const getUpcomingMovieList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getUpcomingMovieList err : ', err);
  }
};

const getPopularMovieList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getPopularMovieList err : ', err);
  }
};

const HomeScreen = ({navigation}: any ) => {

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };



  const [nowPlayingMovieList, setNowPlayingMovieList] = useState<any>(undefined);
  const [upcomingMovieList, setUpcomingMovieList] = useState<any>(undefined);
  const [popularMovieList, setPopularMovieList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const nowPalying  = await getNowPlayingMovieList();

      setNowPlayingMovieList([{id:'dummy1'}, ...nowPalying.results ,{id:'dummy2'}]);

      const upcomingMovie  = await getUpcomingMovieList();
      setUpcomingMovieList(upcomingMovie.results);

      const popularMovie  = await getPopularMovieList();
      setPopularMovieList(popularMovie.results);
    })();
  },[]);

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
        {/* <StatusBar hidden /> */}
        <View style={styles.SearchContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={'large'} color={COLORS.Orange}/>
        </View>
      </ScrollView>
    );

  }
  return (
    <ScrollView
        style={styles.scrollViewContainer}
        bounces={false}>
        {/* <StatusBar hidden /> */}
        <View style={styles.SearchContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <CategoryHeader title={'Now Playing'} />
        <FlatList
         horizontal
         data={nowPlayingMovieList}
         bounces={false}
         showsHorizontalScrollIndicator={false}
         keyExtractor={(item) => item.id}
         snapToInterval={(width * 0.7) + SPACING.space_32}
         snapToAlignment={'center'}
         renderItem={({item, index}) => {
            if (!item.original_title){
              return (
                <View  style={{width : (width - ((width * 0.7) + (SPACING.space_32 * 2))) / 2}} />
              );
            }
            return <MovieCard
              openMovieDetails={() => {
                navigation.push('MovieDetails', {movieId : item.id});
              }}
              shouldMarginatedAtEnd={true}
              cardWidth={width * 0.7}
              isFirst={index === 0 ? true : false}
              isLast={index === nowPlayingMovieList.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w780',item.poster_path)}
              genre={item.genre_ids.slice(1,4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />;
         }

         }
         />
        <CategoryHeader title={'Popular'} />
        <FlatList
         showsHorizontalScrollIndicator={false}
         horizontal
         data={popularMovieList}
         bounces={false}
         keyExtractor={(item) => item.id}
         renderItem={({item, index}) => (
          <SubMovieCard
            openMovieDetails={() => {
              navigation.push('MovieDetails', {movieId : item.id});
            }}
            shouldMarginatedAtEnd={true}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === popularMovieList.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342',item.poster_path)}
          />
         )}
         />
        <CategoryHeader title={'Upcoming'} />
        <FlatList
         horizontal
         showsHorizontalScrollIndicator={false}
         data={upcomingMovieList}
         bounces={false}
         keyExtractor={(item) => item.id}
         renderItem={({item, index}) => (
          <SubMovieCard
            openMovieDetails={() => {
              navigation.push('MovieDetails', {movieId : item.id});
            }}
            shouldMarginatedAtEnd={true}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMovieList.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342',item.poster_path)}
          />
         )}
         />
      </ScrollView>
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
