import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE, } from "../../../../config/Dimens";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import { AppText } from "../../../components/AppText";
import { Fonts } from "../../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { homeFoodObj } from "../../../../models/res_model/HomeModel";
import Helper from "../../../../helper/Helper";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

type Props = {
  index : number,
  length : number,
  item : homeFoodObj
}

type trendNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeNewFoodItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<trendNavProp>();
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
      style={[styles.hnfItemMainCont, {
        backgroundColor:themedColors.cardBgColor,
        marginStart: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: props.index === props.length - 1 ?  SPACE._2lg : SPACE._2xs}]}>
      <View style={styles.hnfItemSubCont}>
        <View style={styles.hnfItemImgMainCont}>
          <View style={[styles.hnfItemImgCont,{backgroundColor:themedColors.imgBgColor}]}>
            {newFoodImg != '' ?
              <Image
                style={styles.hnfItemImg}
                source={{ uri: newFoodImg }} /> :
              <Ionicons
                color={themedColors.primaryIconColor}
                size={24}
                name={"images"}/>}
          </View>
        </View>
        <View style={styles.hnfItemNameMainCont}>
          <View>
            <AppText
              numberOfLine={1}
              style={[styles.htItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={newFoodName != '' ? newFoodName : ''} />
          </View>
          <View style={styles.hnfItemRateCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.hnfItemRateTxtCont}>
              <AppText
                style={[styles.hnfItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={newFoodRating != 0 ? newFoodRating.toFixed(1) : '0.0'}/>
            </View>
          </View>
          <View style={styles.hnfItemPriceTxtCont}>
            <AppText
              style={[styles.hnfItemPriceTxt,{color:themedColors.secondaryTxtColor}]}
              text={newFoodPrice != '' ? "RS : " + newFoodPrice : "RS : 0.00"}/>
          </View>
          <View style={styles.hnfItemAddMainCont}>
            <TouchableOpacity
              onPress={() => checkAddToCartAdd(homeNewFoodId)}
              style={[styles.hnfItemAddCont, {backgroundColor: themedColors.iconBgColor }]}
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
          style={[styles.hnfItemHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {checkNewFoodLike ?
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
  hnfItemMainCont : {
    borderRadius:BORDER_RADIUS.lg,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2lg,
  },
  hnfItemSubCont : {
    flex:1,
    width:130,
  },
  hnfItemImgMainCont : {
    justifyContent:'center',
    alignItems:'center',
  },
  hnfItemImgCont : {
    width:100,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    marginTop:SPACE._3xl,
  },
  hnfItemImg : {
    height:90,
    width:90,
    borderRadius:BORDER_RADIUS._8xl,
  },
  hnfItemNameMainCont : {
    margin:SPACE._2md
  },
  htItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base
  },
  hnfItemSubTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  hnfItemPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  hnfItemPriceTxtCont : {
    marginTop:SPACE._3xs,
    alignItems:'flex-start'
  },
  hnfItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  hnfItemRateTxtCont : {
    marginTop:1,
    marginStart:SPACE._2xs,
  },
  hnfItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  hnfItemHeartIconCont : {
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
  hnfItemAddMainCont : {
    marginTop:SPACE.sm,
    alignItems:'flex-end'
  },
  hnfItemAddCont : {
    width:20,
    height:20,
    borderRadius:BORDER_RADIUS._2xs,
    alignItems:'center',
    justifyContent:'center',
  }
})
