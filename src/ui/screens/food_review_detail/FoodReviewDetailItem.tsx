import React, { useEffect, useState } from "react";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Image, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { Rating } from "react-native-ratings";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { foodReviewObj } from "../../../models/res_model/FoodReviewModel";
import { ViewLine } from "../../components/ViewLine";
import Helper from "../../../helper/Helper";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  index : number,
  length : number,
  item : foodReviewObj
}

export const FoodReviewDetailItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {review,userId,foodId,rating} = props.item
  const [foodReviewUserImg,setFoodReviewUserImg] = useState('')
  const [foodReviewUserName,setFoodReviewUserName] = useState('')

  function getUserInfo()
  {
    Helper.getUserData(userId)
      .then((result : any) =>
      {
        setFoodReviewUserImg(result.userImg)
        setFoodReviewUserName(result.userName)
      })
  }

  useEffect(() =>
  {
    getUserInfo()
  },[])

  return(
    <View style={[styles.frdItemMainCont,{
      marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.frdItemSubCont}>
        <View style={[styles.frdItemImgCont,{backgroundColor:themedColors.cardBgColor}]}>
          {foodReviewUserImg != '' ?
            <Image
              style={styles.frdItemImg}
              source={{ uri: foodReviewUserImg }} /> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={16}
              name={"images"}/>}
        </View>
        <View style={styles.frdItemNameCont}>
          <View style={styles.frdItemNameTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.frdItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={foodReviewUserName != '' ? foodReviewUserName : ''}/>
          </View>
          <View style={styles.frdItemRateCont}>
            <Rating
              type='custom'
              ratingColor={themedColors.yellow}
              ratingBackgroundColor='#c8c7c8'
              tintColor={themedColors.bgColor}
              ratingCount={5}
              imageSize={18}
              startingValue={rating != 0 ? rating : 0.0}
              readonly={true}
              style={{ paddingVertical: 3}} />
            <View style={styles.frdItemRateTxtCont}>
              <AppText
                style={[styles.frdItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={rating != 0 ? rating.toFixed(1) : '0.0'}/>
            </View>
          </View>
          <View style={styles.frdItemReviewTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.frdItemReviewTxt,{color:themedColors.secondaryTxtColor}]}
              text={review != '' ? review : ''}/>
          </View>
        </View>
      </View>
      <View style={styles.frdItemViewLineCont}>
        <ViewLine/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  frdItemMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  frdItemSubCont :  {
    flex:1,
    flexDirection:'row'
  },
  frdItemImgCont : {
    height:60,
    width:60,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  frdItemImg : {
    width: 53,
    height: 53,
    borderRadius: BORDER_RADIUS._8xl
  },
  frdItemNameCont : {
    flex:1,
    marginStart:SPACE._2md,
    justifyContent:'center'
  },
  frdItemNameTxtCont : {
    alignItems:'flex-start'
  },
  frdItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  frdItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  frdItemRateTxtCont : {
    marginStart:SPACE.xs,
    alignItems:'center',
  },
  frdItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  frdItemReviewTxtCont : {
    alignItems:'flex-start'
  },
  frdItemReviewTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  frdItemViewLineCont : {
    marginTop:SPACE.md,
    marginStart:'20%',
    justifyContent:'flex-end'
  }
})
