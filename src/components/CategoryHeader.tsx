/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const CategoryHeader = (props : any) => {
  return (
    <View>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
    titleText: {
        color:COLORS.White,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        paddingHorizontal: SPACING.space_36,
        paddingVertical: SPACING.space_28,
    },
});
