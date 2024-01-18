/* eslint-disable prettier/prettier */
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { baseImagePath, searchMovies } from '../api/apicalls';
import SubMovieCard from '../components/SubMovieCard';
import { COLORS, SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation} : any) => {

  const [searchedMovieList, setSearchedMovieList] = useState<any>(undefined);
  const searchMoviesFunction = async (name : string) => {
    console.log('name >>', name);
    try {
      let result = await fetch(searchMovies(name));
      let json = await result.json();
      setSearchedMovieList(json.results);
    } catch (err){
      console.log('searchMoviesFunction err :', err);
    }
  };
  console.log('searchedMovieList >', searchedMovieList);

  return (
    <View style={styles.searchContainer}>
      <FlatList
         data={searchedMovieList}
         bounces={false}
         numColumns={2}
         keyExtractor={(item) => item.id}
         ListHeaderComponent={
          <View style={styles.SearchContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </View>
         }
         renderItem={({item}) => (
          <SubMovieCard
            openMovieDetails={() => {
              navigation.push('MovieDetails', {movieId : item.id});
            }}
            shouldMarginatedAtEnd={false}
            shouldMarginatedAround={true}
            cardWidth={width / 2 - SPACING.space_12 * 2}
            title={item.original_title}
            imagePath={baseImagePath('w342',item.poster_path)}
          />
         )}
         />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor:COLORS.Black,
    flex:1,
  },
  SearchContainer: {
    marginTop: StatusBar.currentHeight && (StatusBar.currentHeight + 10),
    marginBottom:SPACING.space_20,
  },
});
