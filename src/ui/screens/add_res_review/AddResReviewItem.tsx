import React, { useEffect, useState } from "react";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Image, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { Rating } from "react-native-ratings";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import database from "@react-native-firebase/database";
import { resReviewObj } from "../../../models/res_model/ResReviewModel";
import { ViewLine } from "../../components/ViewLine";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  index : number,
  length : number,
  item : resReviewObj
}

export const AddResReviewItem = React.memo<Props>((props) =>
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
    <View style={[styles.arrItemMainCont,{
      marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.arrItemSubCont}>
        <View style={[styles.arrItemImgCont,{backgroundColor:themedColors.cardBgColor}]}>
          {resReviewUserImg != '' ?
            <Image
              style={styles.arrItemImg}
              source={{ uri: resReviewUserImg }}/> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={16}
              name={"images"}/>}
        </View>
        <View style={styles.arrItemNameCont}>
          <View style={styles.arrItemNameTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.arrItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={resReviewUserName != '' ? resReviewUserName : ''}/>
          </View>
          <View style={styles.arrItemRateCont}>
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
            <View style={styles.arrItemRateTxtCont}>
              <AppText
                style={[styles.arrItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={rating != 0 ? rating.toFixed(1) : '0.0'}/>
            </View>
          </View>
          <View style={styles.arrItemReviewTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.arrItemReviewTxt,{color:themedColors.secondaryTxtColor}]}
              text={review != '' ? review : ''}/>
          </View>
        </View>
      </View>
      <View style={styles.arrItemViewLineCont}>
        <ViewLine/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  arrItemMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  arrItemSubCont :  {
    flex:1,
    flexDirection:'row'
  },
  arrItemImgCont : {
    height:60,
    width:60,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  arrItemImg : {
    width:53,
    height:53,
    borderRadius:BORDER_RADIUS._8xl
  },
  arrItemNameCont : {
    flex:1,
    marginStart:SPACE._2md,
    justifyContent:'center'
  },
  arrItemNameTxtCont : {
    alignItems:'flex-start'
  },
  arrItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  arrItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  arrItemRateTxtCont : {
    marginStart:SPACE.xs,
    alignItems:'center',
  },
  arrItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  arrItemReviewTxtCont : {
    alignItems:'flex-start'
  },
  arrItemReviewTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  arrItemViewLineCont : {
    marginTop:SPACE.md,
    marginStart:'20%',
    justifyContent:'flex-end'
  }
})
