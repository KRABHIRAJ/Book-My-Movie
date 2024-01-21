/* eslint-disable prettier/prettier */
import { ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import { baseImagePath } from '../api/apicalls';
import CustomIcon from '../components/CustomIcon';
import { FlatList } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray: string[] = [
  '10:30',
  '11:00',
  '11:30',
  '19:00',
  '20:30',
  '21:45',
];

const generateDate = () => {
  const date = new Date();
  let weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateArray = [];

  for (let i = 0; i < 7; i++){
    const tempDate  = new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate();
    const tempDay  = new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay();
    const obj = {
      date: tempDate,
      day: weekDay[tempDay],
    };
    dateArray.push(obj);
  }
  return dateArray;
};

const generateSeats = () => {
  let startNum = 3;
  let numOfRows = 8;
  let id = 1;
  let rowNine = false;

  const tempTwoDArray = [];

  for (let i = 0; i < numOfRows; i++){
    let currRow = [];
    for (let j = 0; j < startNum; j++){
      let currCol = {
        id: id,
        taken : Boolean(Math.round(Math.random())),
        selected : false,
      };
      currRow.push(currCol);
      id++;
    }
    if (startNum !== 9 && rowNine === false){
      startNum += 2;
    } else if (startNum === 9 && rowNine === false){
      rowNine = true;
    } else if (rowNine === true){
      startNum -= 2;
    }
    tempTwoDArray.push(currRow);
  }
  return tempTwoDArray;
};



const SeatBookingScreen = ({navigation, route} : any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any [][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();


  const selectSeat = (index : number, subIndex : number, id : number) => {
    console.log('index, sunIndex, id >>', index, subIndex, id,twoDSeatArray[index][subIndex]);
    if (!twoDSeatArray[index][subIndex].taken){
      let tempArr = [...twoDSeatArray];
      let arr : any = [...selectedSeatArray];
      tempArr[index][subIndex].selected = !tempArr[index][subIndex].selected;
      if (!arr.includes(id)){
        arr.push(id);
        setSelectedSeatArray(arr);
      } else {
        const seatIndex = arr.indexOf(id);
        if (seatIndex > -1){
          arr.splice(seatIndex, 1);
          setSelectedSeatArray(arr);
        }
      }
      setPrice(arr.length * 250);
      setTwoDSeatArray(tempArr);
    }
  };

  const buyTickets = async () => {
    if (selectedSeatArray.length > 0 && dateArray[selectedDateIndex] !== undefined && timeArray[selectedTimeIndex] !== undefined ){
      try {
        await EncryptedStorage.setItem('ticket', JSON.stringify({
          seatArray: selectedSeatArray,
          date: dateArray[selectedDateIndex],
          time: timeArray[selectedTimeIndex],
          ticketImage: route.params.posterImage,
        }));
      } catch (err) {
        console.log('Error in buyTickets :',err);
      }
    } else {
      ToastAndroid.showWithGravity('Please select seat, date and time of the show!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
    navigation.navigate('Ticket',{
      seatArray: selectedSeatArray,
      date: dateArray[selectedDateIndex],
      time: timeArray[selectedTimeIndex],
      ticketImage: route.params.posterImage,
    });
  };



  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground style={styles.imageBg} source={{uri : baseImagePath('w780', route?.params?.bgImage)}} >
        <LinearGradient
          colors={[COLORS.BlackRGB10, COLORS.Black]}
          style={styles.linearGradient}
        >
          <View>
            <AppHeader name="close" title={''} action={() => navigation.goBack()}/>
          </View>
        </LinearGradient>
      </ImageBackground>
      <Text style={styles.screenText}>Screen this Way </Text>
      <View>
        <View style={styles.seatSelectionContainer}>
              {
                twoDSeatArray?.map((item, index) => (
                  <View style={styles.seatRow} key={index}>
                    {
                      item?.map((currItem, subIndex) => (
                        <TouchableOpacity key={currItem.id} onPress={(() => {selectSeat(index, subIndex, currItem.id);})}>
                          <CustomIcon  name="seat" style={[styles.seatIcon, currItem.taken ? {color:COLORS.Grey} : {}, currItem.selected ? {color:COLORS.Orange} : {}]} />
                        </TouchableOpacity>
                      ))
                    }
                  </View>
                ))
              }
        </View>
      </View>
      <View style={styles.radioButtonsContainer}>
          <View style={styles.radioContainer}>
              <CustomIcon name="radio" style={[styles.radioIcon, {color:COLORS.White}]} />
              <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
              <CustomIcon name="radio" style={[styles.radioIcon, {color:COLORS.Grey}]} />
              <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
              <CustomIcon name="radio" style={[styles.radioIcon, {color:COLORS.Orange}]} />
              <Text style={styles.radioText}>Selected</Text>
          </View>
      </View>

      <FlatList
            horizontal
            bounces={false}
            keyExtractor={(item) => item.date}
            data={dateArray}
            contentContainerStyle={styles.containerGap24}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)} key={item.date} style={[styles.dateContainer, index === selectedDateIndex ? {backgroundColor:COLORS.Orange, borderColor:COLORS.Orange} : {}]}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </TouchableOpacity>
            )}
          />

        <View style={styles.timeContainer}>
          <FlatList
              horizontal
              bounces={false}
              keyExtractor={(item) => item}
              data={timeArray}
              contentContainerStyle={styles.containerGap24}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => setSelectedTimeIndex(index)} key={item} style={[styles.timeContainerChild, index === selectedTimeIndex ? {backgroundColor:COLORS.Orange, borderColor:COLORS.Orange} : {}]}>
                  <Text style={styles.timeText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
        </View>

        <View style={styles.buyTicketContainer}>
            <View>
                <Text style={styles.totalPriceText}>Total Price</Text>
                <Text style={styles.priceText}>₹ {price}.00</Text>
            </View>
            <TouchableOpacity onPress={() => buyTickets()} style={styles.buyContainer}>
                <Text style={styles.buyTicketText}>Buy Tickets</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.Black,
  },
  imageBg: {
    aspectRatio: 3071 / 1727,
    width: '100%',
  },
  linearGradient:{
    height:'100%',
  },
  seatSelectionContainer:{
    gap:SPACING.space_12,
  },
  seatRow: {
    flexDirection:'row',
    gap: SPACING.space_20,
    justifyContent:'center',
    alignItems:'center',
  },
  seatIcon:{
    color:COLORS.White,
    fontSize: FONTSIZE.size_24,
  },
  screenText: {
    color:COLORS.WhiteRGBA32,
    textAlign:'center',
    marginVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_light,
  },
  radioButtonsContainer:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    marginVertical:SPACING.space_20,
  },
  radioContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  radioIcon:{
    fontSize:FONTSIZE.size_16,
    marginRight: SPACING.space_10,
  },
  radioText:{
    color:COLORS.White,
  },
  dateSelectionContainer:{
    gap:SPACING.space_20,
  },
  containerGap24:{
    gap:SPACING.space_24,
    paddingHorizontal:SPACING.space_15,
  },
  dateContainer:{
    borderColor:COLORS.WhiteRGBA50,
    borderWidth:1,
    paddingVertical:SPACING.space_15,
    paddingHorizontal:SPACING.space_15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:BORDERRADIUS.radius_25,
  },
  dateText:{
    color:COLORS.White,
    marginBottom:SPACING.space_12,
    fontSize:FONTSIZE.size_20,
  },
  dayText:{
    color:COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_12,
  },
  timeContainer:{
    marginVertical: SPACING.space_18,
  },
  timeContainerChild:{
    borderColor:COLORS.WhiteRGBA50,
    borderWidth:1,
    paddingVertical:SPACING.space_10,
    paddingHorizontal:SPACING.space_24,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:BORDERRADIUS.radius_25,
  },
  timeText:{
    color:COLORS.White,
  },
  buyTicketContainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    marginVertical:SPACING.space_20,
  },
  totalPriceText:{
    color:COLORS.WhiteRGBA50,
  },
  priceText:{
    color:COLORS.White,
    fontSize:FONTSIZE.size_18,
    fontFamily:FONTFAMILY.poppins_bold,
  },
  buyContainer:{
    backgroundColor:COLORS.Orange,
    paddingVertical:SPACING.space_12,
    paddingHorizontal:SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_15,
  },
  buyTicketText:{
    color:COLORS.White,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
