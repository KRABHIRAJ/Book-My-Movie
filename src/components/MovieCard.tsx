/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

const genres: any = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentry',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystry',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

const MovieCard = (props : any) => {
  return (
    <TouchableOpacity onPress={() => props.openMovieDetails()}>
        <View
            style={[styles.container,
                {maxWidth: props.cardWidth},
                props.shouldMarginatedAtEnd ? props.isFirst ? {marginLeft: SPACING.space_32, marginRight: SPACING.space_16} : props.isLast ? {marginRight: SPACING.space_32, marginLeft: SPACING.space_16} : {marginHorizontal:SPACING.space_16} : {},
            ]}
        >
            <Image style={[styles.cardImage, {width: props.cardWidth}]} source={{uri : props.imagePath}}/>
            <View>
                <View style={styles.ratingContainer}>
                    <CustomIcon name="star" style={styles.starIcon}/>
                    <Text style={styles.voteText}>{props.vote_average} ({props.vote_count})</Text>
                </View>
                <Text numberOfLines={1} style={styles.titleText}>{props.title}</Text>
                <View style={styles.genreContainer}>
                    {
                        props.genre.map((item : any) => (
                            <View key={item}>
                                <Text style={styles.genreText}>{genres[item]}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
    titleText: {
        color:COLORS.White,
        fontFamily: FONTFAMILY.poppins_regular,
        textAlign: 'center',
        fontSize:FONTSIZE.size_20,
        paddingVertical: SPACING.space_2,
    },
    cardImage: {
        resizeMode:'cover',
        borderRadius: BORDERRADIUS.radius_20,
        aspectRatio: 2 / 3,
    },
    container: {
        display:'flex',
        flex:1,
        backgroundColor:COLORS.Black,
    },
    starIcon: {
        fontSize:FONTSIZE.size_24,
        color:COLORS.Yellow,
    },
    voteText: {
        color: COLORS.White,
        marginLeft: SPACING.space_15,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: SPACING.space_18,

    },
    genreText: {
        color: COLORS.WhiteRGBA75,
        borderColor:COLORS.White,
        borderWidth: 1,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_4,
        borderRadius:SPACING.space_28,
        margin:SPACING.space_4,

    },
    genreContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap',
        flexDirection: 'row',
    }
});
