/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from '../theme/theme';

const SubMovieCard = (props : any) => {
  return (
    <TouchableOpacity onPress={() => props.openMovieDetails()}>
        <View
            style={[styles.container,
                {maxWidth: props.cardWidth},
                props.shouldMarginatedAtEnd ? props.isFirst ? {marginLeft: SPACING.space_32, marginRight: SPACING.space_16} : props.isLast ? {marginRight: SPACING.space_32, marginLeft: SPACING.space_16} : {marginHorizontal:SPACING.space_16} : {},
                props.shouldMarginatedAround ? {margin : SPACING.space_12} : {},
            ]}
        >
            <Image style={[styles.cardImage, {width: props.cardWidth}]} source={{uri : props.imagePath}}/>
            <Text numberOfLines={1} style={styles.titileText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;

const styles = StyleSheet.create({
    titileText: {
        color:COLORS.White,
        fontFamily: FONTFAMILY.poppins_regular,
        textAlign: 'center',
        paddingVertical: SPACING.space_8,
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
});
