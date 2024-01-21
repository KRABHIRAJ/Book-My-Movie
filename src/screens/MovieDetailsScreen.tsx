/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { baseImagePath, fetchMovieCastDetails, fetchMovieDetails } from '../api/apicalls';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CastProfile from '../components/CastProfile';


const getMovieDetails = async (id: any) => {
  try {
    let response = await fetch(fetchMovieDetails(id));
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getMovieDetails err : ', err);
  }
};
const getMovieCastDetails = async (id: any) => {
  try {
    let response = await fetch(fetchMovieCastDetails(id));
    let json = await response.json();
    return json;
  } catch (err){
    console.error('getMovieDetails err : ', err);
  }
};
const MovieDetailsScreen = ({navigation, route} : any) => {
const [movieDetails, setMovieDetails] = useState<any>(undefined);
const [movieCastDetails, setMovieCastDetails] = useState<any>(undefined);

  useEffect(() => {
    (async() => {
      const tempMovieDetails = await getMovieDetails(route.params.movieId);
      setMovieDetails(tempMovieDetails);
      const tempMovieCastDetails = await getMovieCastDetails(route.params.movieId);
      setMovieCastDetails(tempMovieCastDetails?.cast);
    })();
  }, [route.params.movieId]);

  if
    (movieDetails == undefined
    && movieDetails == null
    && movieCastDetails == undefined
    && movieCastDetails == null){
      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContentContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <AppHeader name={'close'} title={''} action={() => navigation.goBack()}/>
          </View>
          <View style={styles.loader}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      );
    }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
     >
      <ImageBackground style={styles.imageBg} source={{uri : baseImagePath('w780', movieDetails?.backdrop_path)}} >
        <LinearGradient
          colors={[COLORS.BlackRGB10, COLORS.Black]}
          style={styles.linearGradient}
        >
          <View>
            <AppHeader name="close" title={''} action={() => navigation.goBack()}/>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.imageBg} />
      <View>
        <Image style={styles.posterImage} source={{uri : baseImagePath('original', movieDetails?.poster_path)}} />
      </View>
        <View style={styles.posterDetailContainer}>
          <View style={styles.durationConatiner}>
            <CustomIcon name="clock" size={20} color={COLORS.WhiteRGBA32} />
            <Text style={styles.durationText}>{Math.floor(movieDetails?.runtime / 60)}h {' '} {movieDetails?.runtime % 60}m</Text>
          </View>
          <Text numberOfLines={1} style={styles.titleText}>{movieDetails.original_title}</Text>
          <View style={styles.genreContainer}>
            {
                movieDetails?.genres?.map((item : any) => (
                      <View key={item.id}>
                           <Text style={styles.genreText}>{item.name}</Text>
                      </View>
                ))
            }
          </View>
          <Text style={styles.tagLine}>{movieDetails?.tagline}</Text>
        </View>
        <View style={styles.subDetailContainer}>
          <View style={styles.topDetails}>
            <View style={styles.ratingContainer}>
                <CustomIcon name="star" style={styles.starIcon}/>
                <Text style={styles.voteText}>{movieDetails?.vote_average.toFixed(1)} ({movieDetails?.vote_count})</Text>
            </View>
            <Text style={styles.releaseDateText}>
              {movieDetails?.release_date.substring(8,10)}
              {' '}
              {new Date('2023-12-13').toLocaleString('default', {month :'long'})}
              {''} {movieDetails?.release_date.substring(0,4)}</Text>
          </View>
            <Text style={styles.movieDetailsOverviewText}>{movieDetails?.overview}</Text>
            <Text style={styles.topCastTitle}>Top Cast</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              data={movieCastDetails}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <CastProfile
                  castName={item.original_name}
                  imagePath={baseImagePath('w185',item.profile_path)}
                />
               )}
            />
        </View>

        <TouchableOpacity onPress={() => {
          navigation.navigate('SeatBooking',{
            bgImage: baseImagePath('w780',movieDetails.backdrop_path),
            posterImage: baseImagePath('original', movieDetails.poster_path),
          });
        }} style={styles.btnConatiner}>
          <Text style={styles.btnText}>Select Seat</Text>
        </TouchableOpacity>
     </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'black',
    flex:1,
  },
  scrollViewContentContainer:{
    flex:1,
  },
  loader: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex:1,
  },
  imageBg: {
    aspectRatio: 3071 / 1727,
    width: '100%',
  },
  linearGradient:{
    height:'100%',
  },
  posterImage: {
    aspectRatio: 200 / 300,
    position: 'absolute',
    width: '60%',
    bottom: 0,
    borderRadius: BORDERRADIUS.radius_15,
    alignSelf:'center',
  },
  posterDetailContainer: {
    justifyContent:'center',
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  durationText: {
    color: COLORS.WhiteRGBA75,
    marginLeft: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  titleText:{
    color:COLORS.White,
    fontSize:FONTSIZE.size_24,
    paddingTop:SPACING.space_4,
    marginLeft: SPACING.space_8,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  durationConatiner: {
    flexDirection: 'row',
  },
  genreText: {
    color: COLORS.WhiteRGBA75,
    borderColor:COLORS.White,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_4,
    borderRadius:SPACING.space_28,
    margin:SPACING.space_4,
    marginHorizontal:SPACING.space_8,
},
genreContainer:{
  justifyContent:'center',
  alignItems:'center',
  flexWrap:'wrap',
  flexDirection: 'row',
  paddingTop:SPACING.space_8,
},
tagLine: {
  fontStyle: 'italic',
  color:COLORS.WhiteRGBA75,
  paddingTop: SPACING.space_8,
  fontFamily:FONTFAMILY.poppins_regular,
},
subDetailContainer: {
  paddingHorizontal:SPACING.space_15,
  marginTop: SPACING.space_18,
},
topDetails:{
  flexDirection:'row',
},
ratingContainer: {
  flexDirection: 'row',
  marginRight: SPACING.space_18,
},
starIcon: {
  fontSize:FONTSIZE.size_20,
  color:COLORS.Yellow,
},
voteText: {
  color: COLORS.WhiteRGBA75,
  marginLeft: SPACING.space_8,
},
releaseDateText: {
  color: COLORS.WhiteRGBA75,
},
movieDetailsOverviewText: {
  color: COLORS.WhiteRGBA50,
  marginVertical:SPACING.space_10,
  fontFamily:FONTFAMILY.poppins_regular,
},
topCastTitle: {
  color: COLORS.White,
  fontSize: FONTSIZE.size_20,
  fontFamily: FONTFAMILY.poppins_semibold,
},
btnConatiner: {
  justifyContent:'center',
  alignItems:'center',
  marginVertical: SPACING.space_16,
},
btnText: {
  color: COLORS.White,
  paddingHorizontal:SPACING.space_32,
  backgroundColor: COLORS.Orange,
  paddingVertical:SPACING.space_12,
  borderRadius: BORDERRADIUS.radius_25,
  fontFamily: FONTFAMILY.poppins_regular,
},
});
