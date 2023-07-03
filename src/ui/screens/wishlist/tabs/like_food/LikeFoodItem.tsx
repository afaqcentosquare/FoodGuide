import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../../../../config/colors";
import { likeFoodObj } from "../../../../../models/res_model/WishlistModel";
import { AppText } from "../../../../components/AppText";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
// @ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import { GILROY } from "../../../../../config";
import Helper from "../../../../../helper/Helper";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import database from "@react-native-firebase/database";

type Props = {
  item : likeFoodObj,
  index : number,
  length : number,
}

export const LikeFoodItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {resId,foodId,parentCatId} = props.item
  const [likeFoodImg,setLikeFoodImg] = useState('')
  const [likeFoodName,setLikeFoodName] = useState('')
  const [likeFoodRating,setLikeFoodRating] = useState('')
  const [likeFoodPrice,setLikeFoodPrice] = useState('')
  const [checkFoodLike,setCheckFoodLike] = useState(false);

  function checkLikeFood(foodId : string,menuParentId : string,resId : string)
  {
    Helper.checkFoodLikes(foodId)
      .then((result : any) =>
      {
        if (result === null)
        {
          Helper.foodLike(foodId,menuParentId,resId)
            .then((result) =>
            {
              if(result === 'isSuccessfull')
              {
                getLikeFood(foodId)
              }
            })
        }
        else
        {
          Helper.removeFoodLike(foodId)
            .then((result) =>
            {
              if(result === 'isSuccessfull')
              {
                getLikeFood(foodId)
              }
            })
        }
      })
  }

  function getLikeFood(foodId : string)
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Foods")
          .child(foodId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setCheckFoodLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("Like_FOOD_ERROR : " + e);
    }
  }

  function getLikeFookInfo()
  {
    Helper.getFoodData(foodId,parentCatId,resId)
      .then((result : any) =>
      {
        setLikeFoodName(result.foodName)
        setLikeFoodImg(result.foodImg)
        setLikeFoodPrice(result.foodPrice)
        setLikeFoodRating(result.foodRating)
      })
  }

  useEffect(() =>
  {
    getLikeFood(foodId)
    getLikeFookInfo()
  },[])

  return(
    <TouchableOpacity
      activeOpacity={0.6}
      /*onPress={() => navigation.navigate('FoodDetail')}*/
      style={[styles.foodItemMainCont]}>
      <View style={[styles.foodItemSubCont,{backgroundColor:themedColors.cardBgColor}]}>
        {likeFoodImg != ''  ?
          <View style={styles.foodItemImgCont}>
            <Image
              style={styles.foodItemImg}
              source={{ uri : likeFoodImg }} />
          </View> : null}
        <View style={styles.foodItemNameMainCont}>
          <View>
            <AppText
              numberOfLine={1}
              style={[styles.foodItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={likeFoodName}/>
          </View>
          <View style={styles.foodItemRateCont}>
            <View>
              <AntDesign
                color={colors.colors.star}
                size={14}
                name={"star"}/>
            </View>
            <View style={styles.foodItemRateTxtCont}>
              <AppText
                style={[styles.foodItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={likeFoodRating != '' ? likeFoodRating : '0.0'}/>
            </View>
          </View>
          <View>
            <AppText
              style={[styles.foodItemSubTxt,{color:themedColors.secondaryTxtColor}]}
              text={likeFoodPrice != '' ? "RS : " + likeFoodPrice : 'RS : 0.00'}/>
          </View>
          <View style={styles.foodAddMainCont}>
            <TouchableOpacity
              style={[styles.foodAddCont, {backgroundColor: themedColors.secondaryIconColor}]}
              activeOpacity={0.6}>
              <Ionicons
                name={"add"}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => checkLikeFood(foodId,parentCatId,resId)}
          activeOpacity={0.6}
          style={[styles.foodHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {checkFoodLike ?
            <MaterialCommunityIcons
              size={15}
              color={colors.colors.red}
              name={"cards-heart"}/> :
            <MaterialCommunityIcons
              size={15}
              name={"cards-heart-outline"}/>}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  foodItemMainCont : {
    flex:1,
    maxWidth : '50%',
  },
  foodItemSubCont : {
    flex:1,
    margin:SPACE._2xs,
    borderRadius:BORDER_RADIUS.lg,
    paddingStart:SPACE._2xs,
    paddingEnd:SPACE._2xs,
    paddingTop:SPACE._2xs,
  },
  foodItemImgCont : {
    flex:1,
    width:'100%',
    marginTop:SPACE._2xl,
    alignItems:'center'
  },
  foodItemImg : {
    resizeMode:'cover',
    flex:1,
    height:110,
    width:110,
    borderRadius:BORDER_RADIUS._8xl,
  },
  foodItemNameMainCont : {
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2md,
  },
  foodItemNameTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.sm
  },
  foodItemSubTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._3xs,
    lineHeight:18,
  },
  foodItemPriceTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  foodItemRateCont : {
    marginTop:2,
    flexDirection:'row',
  },
  foodHeartIconCont : {
    marginEnd:SPACE._2md,
    marginTop:SPACE._2md,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    height:25,
    width:25,
    position:'absolute',
    top:0,
    right:0,
  },
  foodItemRateTxtCont : {
    marginStart:SPACE._2xs,
  },
  foodItemRateTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  foodAddMainCont : {
    marginTop:SPACE._2xs,
    alignItems:'flex-end'
  },
  foodAddCont : {
    width:20,
    height:20,
    padding:2,
    borderRadius:BORDER_RADIUS._2xs,
    alignItems:'center',
    justifyContent:'center',
  }
})
