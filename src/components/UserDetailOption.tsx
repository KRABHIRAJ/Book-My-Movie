/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const UserDetailOption = (props: any) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.detailConatiner}>
        <CustomIcon name={props.name} size={26} color={COLORS.White} />
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View>
        <CustomIcon name="arrow-right" size={26} color={COLORS.White} />
      </View>
    </TouchableOpacity>
  );
};

export default UserDetailOption;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.Black,
        flexDirection:'row',
        justifyContent:'space-between',
        padding: SPACING.space_24,
        alignItems:'center',

    },
    detailConatiner:{
        alignItems:'center',
        flexDirection: 'row',
        gap:SPACING.space_10,
    },
    customIcon: {
        color:COLORS.White,
        fontSize:FONTSIZE.size_20,
    },
    titleText: {
        color:COLORS.White,
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
    },
    arrowIcon:{

    },
});
