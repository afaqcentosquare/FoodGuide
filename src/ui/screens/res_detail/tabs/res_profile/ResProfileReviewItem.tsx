import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { AppText } from "../../../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import { Fonts } from "../../../../../config";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { Rating } from "react-native-ratings";
import { resReviewObj } from "../../../../../models/res_model/ResReviewModel";
import database from "@react-native-firebase/database";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ViewLine } from "../../../../components/ViewLine";

type Props = {
  index : number,
  length : number,
  item : resReviewObj
}

export const ResProfileReviewItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {userId,rating,review} = props.item
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
    <View style={[styles.rprItemMainCont,{
      marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.rprItemSubCont}>
        <View style={[styles.rprItemImgCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {resReviewUserImg != '' ?
            <Image
              style={styles.rprItemImg}
              source={{ uri: resReviewUserImg }} /> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={16}
              name={"images"}/>}
        </View>
        <View style={styles.rprItemNameCont}>
          <View style={styles.rprItemNameTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.rprItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={resReviewUserName != '' ? resReviewUserName : ''}/>
          </View>
          <View style={styles.rprItemRateCont}>
            <Rating
              type='custom'
              ratingColor={themedColors.yellow}
              ratingBackgroundColor='#c8c7c8'
              tintColor={themedColors.cardBgColor}
              ratingCount={5}
              imageSize={18}
              startingValue={rating != 0 ? rating : 0.0}
              readonly={true}
              style={{ paddingVertical: 3}} />
            <View style={styles.rprItemRateTxtCont}>
              <AppText
                style={[styles.rprItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={rating != 0 ? rating.toFixed(1) : '0.0'}/>
            </View>
          </View>
          <View style={styles.rprItemReviewTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.rprItemReviewTxt,{color:themedColors.secondaryTxtColor}]}
              text={review != '' ? review : ''}/>
          </View>
        </View>
      </View>
      <View style={styles.rprItemViewLineCont}>
        <ViewLine/>
      </View>
    </View>
  )

})

const styles = StyleSheet.create({
  rprItemMainCont : {
    flex:1,
  },
  rprItemSubCont :  {
    flex:1,
    flexDirection:'row'
  },
  rprItemImgCont : {
    height:60,
    width:60,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  rprItemImg : {
    width:53,
    height:53,
    borderRadius:BORDER_RADIUS._8xl
  },
  rprItemNameCont : {
    flex:1,
    marginStart:SPACE._2md,
    justifyContent:'center'
  },
  rprItemNameTxtCont : {
    alignItems:'flex-start'
  },
  rprItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  rprItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  rprItemRateTxtCont : {
    marginStart:SPACE.xs,
    alignItems:'center',
  },
  rprItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  rprItemReviewTxtCont : {
    alignItems:'flex-start'
  },
  rprItemReviewTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  rprItemViewLineCont : {
    marginTop:SPACE.md,
    marginStart:'21%',
    justifyContent:'flex-end'
  }
})
