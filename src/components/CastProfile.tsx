/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

const CastProfile = (props : any) => {
  return (
    <View>
      <Image style={styles.castImage} source={{uri: props.imagePath}} />
      <Text style={styles.castName}>{props.castName}</Text>
    </View>
  );
};

export default CastProfile;

const styles = StyleSheet.create({
    castImage:{
        width:100,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 30,
        margin: SPACING.space_10,
    },
    castName: {
        color:COLORS.White,
        fontSize:FONTSIZE.size_12,
        maxWidth:100,
        textAlign: 'center',
        marginHorizontal: SPACING.space_4,

    },
});
