/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { movieCastDetails, movieDetails } from '../api/apicalls';
import { COLORS } from '../theme/theme';


const getMovieDetails = async (id: any) => {
  try {
    let response = await fetch(movieDetails(id));
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getMovieDetails err : ', err);
  }
};
const getMovieCastDetails = async (id: any) => {
  try {
    let response = await fetch(movieCastDetails(id));
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getMovieDetails err : ', err);
  }
};
const MovieDetailsScreen = ({navigation, route} : any) => {
const [movieDetails, setMovieDetails] = useState<any>(undefined);
const [movieCastDetails, setMovieCastDetails] = useState<any>(undefined);

  // useEffect(() => {
  //   (async() => {
  //     const tempMovieDetails = await getMovieDetails(route.params.movieId);
  //     setMovieDetails(tempMovieDetails);
  //     const tempMovieCastDetails = await getMovieCastDetails(route.params.movieId);
  //     setMovieCastDetails(tempMovieCastDetails);
  //   })();
  // });

  if
    (movieDetails == undefined
    && movieDetails == null
    && movieCastDetails == undefined
    && movieCastDetails == null){
      return (
        <ScrollView>
          <View></View>
          <View>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      )
    }
  
  return (
    <View>
      <Text>MovieDetailsScreen</Text>
    </View>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({});
