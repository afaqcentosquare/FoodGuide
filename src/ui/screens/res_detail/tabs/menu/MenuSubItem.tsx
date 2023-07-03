import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import { AppText } from "../../../../components/AppText";
import { Fonts } from "../../../../../config";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { foodObj } from "../../../../../models/res_model/MenuModel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import Helper from "../../../../../helper/Helper";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  index : number,
  length : number,
  item : foodObj
}

type menuSubNavProp = StackNavigationProp<AllScreenStackParamList>;

export const MenuSubItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { parentCatId,resId,foodId,foodImg,foodName,foodPrice,foodRating, } = props.item;
  const navigation = useNavigation<menuSubNavProp>();
  const [isFoodAdded,setIsFoodAdded] = useState(false);
  const [checkFoodLike,setCheckFoodLike] = useState(false);

  function checkMenuFoodLikes(foodId : string,menuParentId : string,resId : string)
  {
    Helper.checkFoodLikes(foodId)
      .then((result : any) =>
      {
        if (result === null)
        {
          menuFoodLike(foodId,menuParentId,resId)
        }
        else
        {
          removeMenuFoodLike(foodId)
        }
      })
  }

  function menuFoodLike(foodId : string,menuParentId : string,resId : string)
  {
    Helper.foodLike(foodId,menuParentId,resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getMenuFoodLikes(foodId)
        }
      })
  }

  function removeMenuFoodLike(foodId : string)
  {
    Helper.removeFoodLike(foodId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getMenuFoodLikes(foodId)
        }
      })
  }

  function getMenuFoodLikes(foodId : string)
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
      console.log("New_FOOD_ERROR : " + e);
    }
  }

  //----------------------------------  add to cart ----------------------------

  function checkAddToCartAdd(foodId : string)
  {
    Helper.checkAddToCart(foodId)
      .then((result : any) =>
      {
        if (result === null)
        {
          addToCartFood(foodId)
        }
        else
        {
          removeAddToCartFood(foodId)
        }
      })
  }

  function getAddToCartData(foodId : string)
  {
    const userId : any = auth().currentUser?.uid;

    const showDataRef =
      database()
        .ref()
        .child("AddToCart")
        .child(userId)
        .child(foodId)
    showDataRef.on('value', (showDataSnap)  =>
    {
      setIsFoodAdded(showDataSnap.child("isFoodAdded").val())
    })
  }

  function addToCartFood(foodId : string)
  {
    Helper.addToCartFood(foodPrice,'0',foodId,parentCatId,resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getAddToCartData(foodId)
        }
      })
  }

  function removeAddToCartFood(foodId : string)
  {
    Helper.removeAddToCartFood(foodId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getAddToCartData(foodId)
        }
      })
  }

  useEffect(() =>
  {
    getAddToCartData(foodId)
    getMenuFoodLikes(foodId)
  },[])

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetail',{food_info : props.item})}
      activeOpacity={0.6}
      style={[styles.msItemMainCont]}>
      <View style={[styles.msItemSubCont,{backgroundColor:themedColors.cardBgColor}]}>
        <View style={styles.msItemImgMainCont}>
          <View style={[styles.msItemImgCont,{backgroundColor:themedColors.imgBgColor}]}>
            {foodImg !== "" ?
              <Image
                style={styles.msItemImg}
                source={{ uri: foodImg }} /> :
              <Ionicons
                color={themedColors.primaryIconColor}
                size={24}
                name={"images"}/>}
          </View>
        </View>
        <View style={styles.msItemNameMainCont}>
          <View style={styles.msItemNameTxtCont}>
            <AppText
              numberOfLine={1}
              style={[styles.msItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={foodName != "" ? foodName : ''}/>
          </View>
          <View style={styles.msItemRateCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.msItemRateTxtCont}>
              <AppText
                style={[styles.menuItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={foodRating != 0 ? foodRating.toFixed(1) : '0.0'}/>
            </View>
          </View>
          <View style={styles.msItemPriceTxtCont}>
            <AppText
              style={[styles.msItemPriceTxt,{color:themedColors.secondaryTxtColor}]}
              text={"RS : " + foodPrice === "" ? "RS : 0.00" : "RS : " + foodPrice} />
          </View>
          <View style={styles.msItemAddIconMainCont}>
            <TouchableOpacity
              onPress={() => checkAddToCartAdd(foodId)}
              style={[styles.msItemAddCont, {backgroundColor: themedColors.iconBgColor }]}
              activeOpacity={0.6}>
              {!isFoodAdded ?
                <Ionicons
                  color={themedColors.primaryIconColor}
                  name={"add"} /> :
                <Feather
                  color={themedColors.primaryIconColor}
                  name={"check"}/>}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => checkMenuFoodLikes(foodId,parentCatId,resId)}
          activeOpacity={0.6}
          style={[styles.msItemHeartIconCont,{backgroundColor:themedColors.iconBgColor}]}>
          {checkFoodLike ?
            <MaterialCommunityIcons
              size={15}
              color={themedColors.red}
              name={"cards-heart"}/> :
            <MaterialCommunityIcons
              color={themedColors.primaryIconColor}
              size={15}
              name={"cards-heart-outline"}/>}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  msItemMainCont : {
    flex:1,
    maxWidth : '50%',
  },
  msItemSubCont : {
    flex:1,
    margin:SPACE.xs,
    borderRadius:BORDER_RADIUS.lg,
    paddingStart:SPACE._2xs,
    paddingEnd:SPACE._2xs,
    paddingTop:SPACE._2xs
  },
  msItemImgMainCont : {
    alignItems:'center'
  },
  msItemImgCont : {
    flex:1,
    width:100,
    height:100,
    justifyContent:'center',
    borderRadius:BORDER_RADIUS._8xl,
    marginTop:SPACE._2xl,
    alignItems:'center',
  },
  msItemImg : {
    height:90,
    width:90,
    borderRadius:BORDER_RADIUS._8xl,
  },
  msItemNameMainCont : {
    margin:SPACE._2md
  },
  msItemNameTxtCont : {
    alignItems:'flex-start',
  },
  msItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.sm,
  },
  msItemPriceTxtCont : {
    marginTop:SPACE._3xs,
    alignItems:'flex-start'
  },
  msItemPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  msItemHeartIconCont : {
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
  msItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  msItemRateTxtCont : {
    justifyContent:'center',
    marginTop:1,
    marginStart:SPACE._2xs,
  },
  menuItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  msItemAddIconMainCont : {
    marginTop:SPACE.sm,
    alignItems:'flex-end'
  },
  msItemAddCont : {
    width:20,
    height:20,
    borderRadius:BORDER_RADIUS._2xs,
    alignItems:'center',
    justifyContent:'center',
  }
})
