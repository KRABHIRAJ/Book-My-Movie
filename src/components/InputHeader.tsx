/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

const InputHeader = (props: any) => {
    const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} value={searchText} onChangeText={setSearchText} placeholder="Search Yoer Movie..." placeholderTextColor={COLORS.WhiteRGBA32}/>
      <TouchableOpacity onPress={() => props.searchFunction(searchText)} style={styles.searchIcon}>
        <CustomIcon name="search" size={26} color={COLORS.Orange} />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.WhiteRGBA15,
        borderWidth:2,
        width:'90%',
        flexDirection:'row',
        borderRadius:BORDERRADIUS.radius_25,
        paddingVertical:SPACING.space_8,
        paddingHorizontal: SPACING.space_24,
        alignSelf:'center',
        justifyContent:'space-between',
    },
    searchIcon: {
        alignSelf:'center',
        paddingRight:SPACING.space_12,
    },
    textInput:{
        color:COLORS.White,
    }
});
