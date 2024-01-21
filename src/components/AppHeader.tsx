/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

const AppHeader = (props : any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.action()} style={styles.iconContainer}>
        <CustomIcon name={props.name}  size={26} color={COLORS.White}/>
      </TouchableOpacity>
      <Text style={styles.titleText}>{props.title}</Text>
      <View />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
    titleText: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_18,
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: SPACING.space_10,
        paddingHorizontal:SPACING.space_30,
    },
    iconContainer:{
        backgroundColor: COLORS.Orange,
        padding:SPACING.space_8,
        borderRadius:BORDERRADIUS.radius_25,
        alignItems: 'center',
        justifyContent:'center',
    }
});
