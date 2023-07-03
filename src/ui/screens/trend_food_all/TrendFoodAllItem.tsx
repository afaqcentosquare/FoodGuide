import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts, GILROY } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { homeFoodObj } from "../../../models/res_model/HomeModel";
import Helper from "../../../helper/Helper";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  item : homeFoodObj
}

type foodNavProp = StackNavigationProp<AllScreenStackParamList>;

export const TrendFoodAllItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<foodNavProp>();
  const {themedColors} = usePreferredTheme();
  const { homeResId,homeParentMenuId,homeNewFoodId } = props.item;
  const [newFoodName,setNewFoodName] = useState('');
  const [newFoodImg,setNewFoodImg] = useState('');
  const [newFoodPrice,setNewFoodPrice] = useState('');
  const [newFoodRating,setNewFoodRating] = useState(0);
  const [newFoodDelivery,setNewFoodDelivery] = useState('');
  const [checkNewFoodLike,setCheckNewFoodLike] = useState(false);
  const [parentCatId,setParentCatId] = useState('');
  const [isFoodAdded,setIsFoodAdded] = useState(false);
  const [foodId,setFoodId] = useState('');
  const [resId,setResId] = useState('');
  const [newFoodDes,setNewFoodDes] = useState('');


  function checkNewFoodLikes(foodId : string,menuParentId : string,resId : string)
  {
    Helper.checkFoodLikes(foodId)
      .then((result : any) =>
      {
        if (result === null)
        {
          newFoodLike(foodId,menuParentId,resId)
        }
        else
        {
          removeNewFoodLike(foodId)
        }
      })
  }

  function newFoodLike(foodId: string,menuParentId : string,resId : string)
  {
    Helper.foodLike(foodId,menuParentId,resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getNewFoodLikes(foodId)
        }
      })
  }

  function removeNewFoodLike(foodId : string)
  {
    Helper.removeFoodLike(foodId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getNewFoodLikes(foodId)
        }
      })
  }

  function getNewFoodLikes(foodId : string)
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
        setCheckNewFoodLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("New_FOOD_ERROR : " + e);
    }
  }

  function getNewFoodData()
  {
    Helper.getFoodData(homeNewFoodId,homeParentMenuId,homeResId)
      .then((result : any) =>
      {
        setNewFoodName(result.foodName)
        setNewFoodImg(result.foodImg)
        setNewFoodPrice(result.foodPrice)
        setNewFoodDes(result.foodDes)
        setNewFoodRating(result.foodRating)
        setParentCatId(result.parentCatId)
        setFoodId(result.foodId)
        setResId(result.resId)
        setNewFoodDelivery(result.delivery)
      })
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
    Helper.addToCartFood(newFoodPrice,newFoodDelivery,foodId,parentCatId,resId)
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
    getNewFoodData()
    getNewFoodLikes(homeNewFoodId)
    getAddToCartData(homeNewFoodId)
    //checkNewFood()
  },[])


  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetail',{food_info : { foodCatName : '',
          foodDes : newFoodDes,
          foodId : foodId,
          foodImg : newFoodImg,
          foodName : newFoodName,
          foodPrice : newFoodPrice,
          foodRating : newFoodRating,
          parentCatId : parentCatId,
          resId : resId, }})}
      activeOpacity={0.6}
      style={styles.tfaItemMainCont}>
      <View style={[styles.tfaItemSubCont,{backgroundColor:themedColors.cardBgColor,}]}>
        <View style={styles.tfaItemImgMainCont}>
          <View style={[styles.tfaItemImgCont,{backgroundColor:themedColors.imgBgColor}]}>
            {newFoodImg != '' ?
              <Image
                style={styles.tfaItemImg}
                source={{ uri: newFoodImg }} /> :
              <Ionicons
                color={themedColors.primaryIconColor}
                size={24}
                name={"images"}/>}
          </View>
        </View>
        <View style={styles.tfaItemNameMainCont}>
          <View>
            <AppText
              numberOfLine={1}
              style={[styles.tfaItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={newFoodName != '' ? newFoodName : ''}  />
          </View>
          <View style={styles.tfaItemRateCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.tfaItemRateTxtCont}>
              <AppText
                style={[styles.tfaItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={newFoodRating != 0 ? newFoodRating.toFixed(1) : '0.0'}/>
            </View>
          </View>
          <View style={styles.tfaItemPriceTxtCont}>
            <AppText
              style={[styles.tfaItemPriceTxt,{color:themedColors.secondaryTxtColor}]}
              text={newFoodPrice != '' ? "RS : " + newFoodPrice : "RS : 0.00"}/>
          </View>
          <View style={styles.tfaAddMainCont}>
            <TouchableOpacity
              onPress={() => checkAddToCartAdd(homeNewFoodId)}
              style={[styles.tfaAddCont, {backgroundColor: themedColors.iconBgColor }]}
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
          onPress={() => checkNewFoodLikes(homeNewFoodId,homeParentMenuId,homeResId,)}
          activeOpacity={0.6}
          style={[styles.tfaHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {checkNewFoodLike ?
            <FontAwesome
              color={themedColors.red}
              name={"heart"}/> :
            <FontAwesome
              color={themedColors.primaryIconColor}
              name={"heart-o"}/>}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  tfaItemMainCont : {
    flex:1,
    maxWidth: '50%',
  },
  tfaItemSubCont : {
    flex:1,
    margin:SPACE.sm,
    borderRadius:BORDER_RADIUS.lg,
  },
  tfaItemImgMainCont : {
    justifyContent:'center',
    alignItems:'center',
  },
  tfaItemImgCont : {
    width:110,
    height:110,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    marginTop:SPACE._3xl,
  },
  tfaItemImg : {
    height:100,
    width:100,
    borderRadius:BORDER_RADIUS._8xl,
  },
  tfaItemNameMainCont : {
    margin:SPACE.md
  },
  tfaItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.lg
  },
  tfaItemSubTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  tfaItemPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  tfaItemPriceTxtCont : {
    marginTop:SPACE._3xs,
    alignItems:'flex-start'
  },
  tfaItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  tfaItemRateTxtCont : {
    marginTop:1,
    marginStart:SPACE._2xs,
  },
  tfaItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  tfaHeartIconCont : {
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
  tfaAddMainCont : {
    marginTop:SPACE.sm,
    alignItems:'flex-end'
  },
  tfaAddCont : {
    width:20,
    height:20,
    borderRadius:BORDER_RADIUS._2xs,
    alignItems:'center',
    justifyContent:'center',
  }
})
