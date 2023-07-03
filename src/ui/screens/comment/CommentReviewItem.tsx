import React, { useEffect, useState } from "react";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Image, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { Rating } from "react-native-ratings";
import { ViewLine } from "../../components/ViewLine";
import database from "@react-native-firebase/database";
import { foodReviewObj } from "../../../models/res_model/FoodReviewModel";

type Props = {
  item : foodReviewObj,
  length : number,
  index : number
}

export const CommentReviewItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  const {review,userId,rating} = props.item
  const [resReviewUserImg,setResReviewUserImg] = useState('')
  const [resReviewUserName,setResReviewUserName] = useState('')

  function getUserInfo()
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("UserProfile")
          .child(userId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setResReviewUserImg(showDataSnap.child("userImg").val())
        setResReviewUserName(showDataSnap.child("userName").val())
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    getUserInfo()
  },[])

  return(
    <View style={[styles.crItemMainCont,{
      marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginBottom : props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.crItemSubCont}>
        <View>
          {resReviewUserImg !== '' &&
            <Image
              style={styles.crItemImg}
              source={{ uri: resReviewUserImg }} />}
        </View>
        <View style={styles.crItemNameCont}>
          <View>
            <AppText
              style={[styles.crItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={resReviewUserName != '' ? resReviewUserName : ''}/>
          </View>
          <View style={styles.crItemRatingCont}>
            <View>
              <Rating
                type='custom'
                ratingColor={themedColors.yellow}
                ratingBackgroundColor='#c8c7c8'
                ratingCount={5}
                imageSize={16}
                tintColor={themedColors.white}/>
            </View>
            <View style={styles.crItemRateTxtCont}>
              <AppText
                style={styles.crItemRateTxt}
                text={rating != 0 ? rating.toFixed(1) : "0.0"}/>
            </View>
          </View>
          <View>
            <AppText
              style={[styles.crItemReviewTxt,{color:themedColors.secondaryTxtColor}]}
              text={review != '' ? review : ''}/>
          </View>
        </View>
      </View>
      <View style={styles.crItemViewLineCont}>
        <ViewLine/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  crItemMainCont : {
    flex:1
  },
  crItemSubCont : {
    flex:1,
    flexDirection:'row'
  },
  crItemImg : {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS._8xl
  },
  crItemNameCont : {
    flex:1,
    marginStart:SPACE._2lg
  },
  crItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base
  },
  crItemRatingCont : {
    flexDirection:'row',
    alignItems:"flex-start"
  },
  crItemRateTxtCont :{
    marginStart:SPACE._2xs
  },
  crItemRateTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  crItemReviewTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  crItemViewLineCont : {
    marginTop:SPACE.md,
    marginStart:'21%',
    justifyContent:'flex-end'
  }
})
