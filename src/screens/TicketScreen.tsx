/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { baseImagePath } from '../api/apicalls';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route} : any) => {
  const [ticketDetails, setTicketDetails] = useState<any>(undefined);
  useEffect(() => {
     (async () => {
        const ticket : any = await EncryptedStorage.getItem('ticket');
        const tempTicket = JSON.parse(ticket);
        setTicketDetails(tempTicket);
        if (tempTicket !== route.params || route.params != undefined){
          setTicketDetails(route.params);
        }
     })();

  },[route.params]);



  if (ticketDetails == undefined || ticketDetails == null){
      return (
        <View style={styles.container}>
          <AppHeader name="close" title={'My Tickets'} action={() => navigation.goBack()}/>
        </View>
      );
  }
  return (
    <View style={styles.container}>
        <View style={styles.appHeader}>
            <AppHeader name="close" title={'My Tickets'} action={() => navigation.goBack()}/>
        </View>
        <ImageBackground style={styles.imageBg} source={{uri : baseImagePath('w780', ticketDetails?.ticketImage)}} >
        <LinearGradient
          colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
          style={styles.linearGradient}
         >
          <View style={[styles.blackCirle, {position:'absolute', bottom:-40, left:-40}]} />
          <View style={[styles.blackCirle, {position:'absolute', bottom:-40, right:-40}]} />
         </LinearGradient>
      </ImageBackground>
      <View style={styles.liner} />
      <View style={styles.ticketFooter}>
      <View style={[styles.blackCirle, {position:'absolute', top:-40, left:-40}]} />
      <View style={[styles.blackCirle, {position:'absolute', top:-40, right:-40}]} />
        <View style={styles.timeDayContainer}>
          <View style={styles.dayContainer}>
              <Text style={styles.dateText}>{ticketDetails?.date?.date}</Text>
              <Text style={styles.dayText}>{ticketDetails?.date?.day}</Text>
          </View>
          <View style={styles.dayContainer}>
            <CustomIcon name="clock" style={styles.clockIcon} />
            <Text style={styles.timeText}>{ticketDetails?.time}</Text>
          </View>
        </View>
        <View style={styles.seatDetailContainer}>
          <View style={styles.seatDetailContainerChild}>
              <Text style={styles.headingText}>Hall</Text>
              <Text style={styles.detailText}>04</Text>
          </View>
          <View style={styles.seatDetailContainerChild}>
              <Text style={styles.headingText}>Row</Text>
              <Text style={styles.detailText}>08</Text>
          </View>
          <View style={styles.seatDetailContainerChild}>
              <Text style={styles.headingText}>Seat</Text>
              <Text style={styles.detailText}>{ticketDetails.seatArray[0]}</Text>
          </View>
        </View>
        <Image style={styles.barCodeImage} source={require('../assets/image/barcode.png')} />
      </View>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeader: {
  },
  ticketContainer:{
    borderRadius:BORDERRADIUS.radius_25,
    flex:1,
    justifyContent:'center',
  },
  imageBg: {
    alignSelf:'center',
    width:300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    marginTop:20,
    overflow:'hidden',
  },
  linearGradient:{
    height:'100%',
  },
  liner:{
    borderTopWidth:2,
    borderTopColor:COLORS.Black,
    width:220,
    alignSelf:'center',
    borderStyle:'dashed',
    backgroundColor:COLORS.Orange,
  },
  ticketFooter:{
    backgroundColor:COLORS.Orange,
    width:300,
    justifyContent:'center',
    alignSelf:'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
    overflow:'hidden',
    padding:SPACING.space_16,
  },
  timeDayContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  dayContainer:{
    alignItems:'center',
  },
  dateText:{
    color:COLORS.White,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
  dayText:{
    color:COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  clockIcon:{
    color:COLORS.White,
    fontSize: FONTSIZE.size_24,
    marginBottom: 5,
  },
  timeText:{
    color:COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  seatDetailContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    marginTop:SPACING.space_4,
  },
  seatDetailContainerChild:{
    alignItems:'center',
  },
  headingText:{
    color:COLORS.White,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  detailText:{
    color:COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  barCodeImage:{
    alignSelf:'center',
    height:40,
    marginTop:SPACING.space_10,
  },
  blackCirle: {
    height:80,
    width:80,
    borderRadius:99,
    backgroundColor:COLORS.Black,
  },
});
