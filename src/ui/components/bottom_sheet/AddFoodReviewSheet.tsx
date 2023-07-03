import React, { useCallback,useMemo } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {useFocusEffect} from '@react-navigation/native';
import {Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../AppText';
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import {GILROY} from '../../../config';
import {InputText} from '../InputText';
import usePreferredTheme from '../../../hooks/theme/usePreferredTheme';
import { AppButton } from '../AppButton';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from "react-native-ratings";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import {
  setEdtFoodReviewRating,
  setEdtFoodReviewTxt,
  setShowFoodReviewSheet,
} from "../../../redux/slice/FoodReviewSlice";
import { DefaultUserImg } from "../DefaultUserImg";
import Snackbar from "react-native-snackbar";

type Props = {
  submitReviewClick? : () => void,
  foodReviewSheetRef? : any
}

export const AddFoodReviewSheet = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const {themedColors}  = usePreferredTheme();
  //const bottomSheetRef = useRef<BottomSheet>(null);
  const {edtFoodReviewResName,edtFoodReviewResImg,edtFoodReviewTxt,edtFoodReviewRating} = useSelector((state: RootState) => state.FoodReview);

  const snapPoints = useMemo(() => ["20%","85%"], []);

  // callbacks
  const handleSheetChange = useCallback((index : any) =>
  {
    console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index : any) =>
  {
    props.foodReviewSheetRef.current?.snapToIndex(index);
  }, []);

  function handleClosePress()
  {
    dispatch(setShowFoodReviewSheet(false))
    props.foodReviewSheetRef.current?.close();
  }


  function ratingCompleted(rating : number)
  {
    dispatch(setEdtFoodReviewRating(rating))
  }

  useFocusEffect(() =>
  {
    StatusBar.setHidden(false);
    return () => {
      StatusBar.setHidden(false);
    }
  })

  return(
    <BottomSheet
      ref={props.foodReviewSheetRef}
      snapPoints={snapPoints}
      index={1}
      backgroundStyle={{elevation:10,backgroundColor : themedColors.cardBgColor}}
      onClose={() => handleClosePress()}
      detached={true}
      style={styles.arsMainCont}
      enablePanDownToClose={true}
      onChange={() => handleSheetChange}>
      <View style={styles.arsHeadCont}>
        <TouchableOpacity
          onPress={() => {
            handleClosePress();
          }}
          style={styles.arsCloseIconCont}>
          <Ionicons
            name={"close"}
            size={22}
            color={themedColors.primaryTxtColor}/>
        </TouchableOpacity>
        <View style={styles.arsTitleCont}>
          <AppText
            style={[styles.arsTitleTxt,{color:themedColors.primaryTxtColor}]}
            text={"Add Food Review"}/>
        </View>
      </View>
      <BottomSheetScrollView
        contentContainerStyle={{justifyContent:'center'}}>
        <View style={{marginTop:SPACE._2lg,alignItems:'center',justifyContent:'center',borderRadius:BORDER_RADIUS._8xl}}>
          <View style={{borderRadius:BORDER_RADIUS._8xl,alignItems:'center',justifyContent:'center',height:115,width:115,backgroundColor:themedColors.bgColor,}}>
            {edtFoodReviewResImg != '' ?
              <Image
                style={{ borderRadius: BORDER_RADIUS._8xl, height: 100, width: 100 }}
                source={{ uri: edtFoodReviewResImg }} /> : <DefaultUserImg/>}
          </View>
        </View>
        <View style={{marginStart:SPACE._4xl,marginEnd:SPACE._4xl,marginTop:SPACE._2lg,justifyContent:'center',alignItems:'center'}}>
          <AppText
            style={{fontFamily:GILROY.semi_bold,color:themedColors.primaryTxtColor,fontSize:FONT_SIZE.lg,lineHeight:22,textAlign:'center'}}
            text={"How was your experience with " + edtFoodReviewResName}/>
        </View>
        <View>
          <Rating
            type='custom'
            ratingColor='#FDCC0D'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            fractions={2}
            imageSize={40}
            startingValue={0}
            showRating={false}
            style={{paddingVertical:SPACE.xl}}
            onFinishRating={ratingCompleted}
            tintColor={themedColors.cardBgColor}/>
        </View>
        <View style={{marginStart:SPACE._2lg,marginEnd:SPACE._2lg,marginTop:SPACE._2md,marginBottom:SPACE._2xl}}>
          <InputText
            valueToShowAtStart={edtFoodReviewTxt}
            onChangeText={(e) => dispatch(setEdtFoodReviewTxt(e))}
            edtLabelVisible={true}
            edtLabelTxt={"Leave a Review"}
            multiLine={true}
            txtInputStyle={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs,lineHeight:17}}
            txtInputContStyle={{padding:SPACE._2xs,alignItems:'flex-start',textAlignVertical:'top',height:120,borderRadius:BORDER_RADIUS.lg,marginTop:SPACE._2md,backgroundColor:themedColors.bgColor}} />
        </View>
        <View style={{marginBottom:SPACE._2lg,marginTop:SPACE.xl,marginStart:SPACE._4xl,marginEnd:SPACE._4xl}}>
          <AppButton
            btnContStyle={{height:40}}
            onPress={props.submitReviewClick}
            text={"Submit Review"}/>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
})

const styles = StyleSheet.create({
  arsMainCont : {
    flex:1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  arsHeadCont : {
    marginBottom:SPACE._2md,
    marginTop:SPACE._2xs,
    alignItems:'center'
  },
  arsCloseIconCont : {
    marginStart:SPACE._2lg,
    left:0,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center'
  },
  arsTitleCont : {
    justifyContent:'center',
    alignItems:'center'
  },
  arsTitleTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.lg
  },
  addFoodReviewMainCont : {
    flex:1
  }
})
