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

export const FoodReviewItem = React.memo<Props>((props) =>
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
    <View style={[styles.frItemMainCont,{
      marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginBottom : props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.frItemSubCont}>
        <View style={[styles.frItemImgCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {foodReviewUserImg !== '' ?
            <Image
              style={styles.frItemImg}
              source={{uri : foodReviewUserImg}} /> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={16}
              name={"images"}/>}
        </View>
        <View style={styles.frItemNameMainCont}>
          <View style={styles.frItemNameTxtCont}>
            <AppText
              style={[styles.frItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={foodReviewUserName != "" ? foodReviewUserName : ''}/>
          </View>
          <View style={styles.frItemRatingCont}>
            <View>
              <Rating
                type='custom'
                ratingColor={themedColors.yellow}
                tintColor={themedColors.cardBgColor}
                ratingBackgroundColor='#c8c7c8'
                ratingCount={5}
                imageSize={16}
                style={{ paddingVertical: 3 }}
                startingValue={rating != 0 ? rating : 0.0}
                readonly={true}/>
            </View>
            <View style={styles.frItemRatingTxtCont}>
              <AppText
                style={[styles.frItemRatingTxt,{color:themedColors.secondaryTxtColor}]}
                text={rating != 0 ? rating.toFixed(1) : "0.0"}/>
            </View>
          </View>
          <View style={styles.frItemReviewTxtCont}>
            <AppText
              style={[styles.frItemReviewTxt,{color:themedColors.secondaryTxtColor}]}
              text={review != "" ? review : ''}/>
          </View>
        </View>
      </View>
      <View style={styles.frItemViewLine}>
        <ViewLine/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  frItemMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  frItemSubCont : {
    flex:1,
    flexDirection:'row'
  },
  frItemImgCont : {
    height:60,
    width:60,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  frItemImg : {
    width: 53,
    height: 53,
    borderRadius: BORDER_RADIUS._8xl
  },
  frItemNameMainCont : {
    flex:1,
    justifyContent:'center',
    marginStart:SPACE._2lg
  },
  frItemNameTxtCont : {
    alignItems:'flex-start'
  },
  frItemNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  frItemRatingCont : {
    flexDirection:'row',
    alignItems:"center"
  },
  frItemRatingTxtCont : {
    marginStart:SPACE._2xs
  },
  frItemRatingTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  frItemReviewTxtCont : {
    alignItems:'flex-start'
  },
  frItemReviewTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  frItemViewLine : {
    marginTop:SPACE.md,
    marginStart:'22%',
    justifyContent:'flex-end'
  }
})
