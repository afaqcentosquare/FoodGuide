import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE, } from "../../../../config/Dimens";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import { AppText } from "../../../components/AppText";
import { Fonts } from "../../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import database from "@react-native-firebase/database";
import { homeFoodObj } from "../../../../models/res_model/HomeModel";
import auth from "@react-native-firebase/auth";
import Helper from "../../../../helper/Helper";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

type Props = {
  index : number,
  length : number,
  item : homeFoodObj
}

type trendNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeTrendingItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<trendNavProp>();
  const {themedColors} = usePreferredTheme();
  const { homeResId,homeParentMenuId,homeNewFoodId } = props.item;
  const [trendFoodName,setTrendFoodName] = useState('');
  const [trendFoodImg,setTrendFoodImg] = useState('');
  const [trendFoodPrice,setTrendFoodPrice] = useState('');
  const [trendFoodRating,setTrendFoodRating] = useState(0);
  const [trendFoodDelivery,setTrendFoodDelivery] = useState('');
  const [checkTrendLike,setCheckTrendLike] = useState(false);
  const [parentCatId,setParentCatId] = useState('');
  const [isFoodAdded,setIsFoodAdded] = useState(false);
  const [foodId,setFoodId] = useState('');
  const [resId,setResId] = useState('');
  const [trendFoodDes,setTrendFoodDes] = useState('');

  function checkTrendFoodLikes(foodId : string,menuParentId : string,resId : string)
  {
    Helper.checkFoodLikes(foodId)
      .then((result : any) =>
      {
        if (result === null)
        {
          trendFoodLike(foodId,menuParentId,resId)
        }
        else
        {
          removeTrendFoodLike(foodId)
        }
      })
  }

  function trendFoodLike(foodId: string,menuParentId : string,resId : string)
  {
    Helper.foodLike(foodId,menuParentId,resId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getTrendFoodLikes(foodId)
        }
      })
  }

  function removeTrendFoodLike(foodId : string )
  {
    Helper.removeFoodLike(foodId)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getTrendFoodLikes(foodId)
        }
      })
  }

  function getTrendFoodLikes(foodId : string)
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
        setCheckTrendLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("HOME_TREND_ERROR : " + e);
    }
  }

  function getTrendFoodData()
  {
    Helper.getFoodData(homeNewFoodId,homeParentMenuId,homeResId)
      .then((result : any) =>
      {
        setTrendFoodName(result.foodName)
        setTrendFoodImg(result.foodImg)
        setTrendFoodPrice(result.foodPrice)
        setTrendFoodRating(result.foodRating)
        setTrendFoodDes(result.foodDes)
        setParentCatId(result.parentCatId)
        setTrendFoodDelivery(result.delivery)
        setFoodId(result.foodId)
        setResId(result.resId)
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
    Helper.addToCartFood(trendFoodPrice,trendFoodDelivery,foodId,parentCatId,resId)
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
    getTrendFoodData()
    getAddToCartData(homeNewFoodId)
    getTrendFoodLikes(homeNewFoodId)
  },[])

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetail',{food_info : { foodCatName : '',
          foodDes : trendFoodDes,
          foodId : foodId,
          foodImg : trendFoodImg,
          foodName : trendFoodName,
          foodPrice : trendFoodPrice,
          foodRating : trendFoodRating,
          parentCatId : parentCatId,
          resId : resId, }})}
      activeOpacity={0.6}
      style={[styles.htItemMainCont, {
        backgroundColor:themedColors.cardBgColor,
        marginStart: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: props.index === props.length - 1 ?  SPACE._2lg : SPACE._2xs}]}>
      <View style={styles.htItemSubCont}>
        <View style={styles.htcItemImgMainCont}>
          <View style={[styles.htItemImgCont,{backgroundColor:themedColors.imgBgColor}]}>
            {trendFoodImg != '' ?
              <Image
                style={styles.htItemImg}
                source={{ uri: trendFoodImg }} /> :
              <Ionicons
                color={themedColors.primaryIconColor}
                size={24}
                name={"images"}/>}
          </View>
        </View>
        <View style={styles.htItemNameMainCont}>
          <View>
            <AppText
              numberOfLine={1}
              style={[styles.htItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={trendFoodName != '' ? trendFoodName : ''}  />
          </View>
          <View style={styles.htItemRateCont}>
            <View>
              <AntDesign
                color={themedColors.yellow}
                size={15}
                name={"star"}/>
            </View>
            <View style={styles.htItemRateTxtCont}>
              <AppText
                style={[styles.htItemRateTxt,{color:themedColors.secondaryTxtColor}]}
                text={trendFoodRating != 0 ?  trendFoodRating.toFixed(1)  : '0.0'}/>
            </View>
          </View>
          <View style={styles.htItemPriceTxtCont}>
            <AppText
              style={[styles.htItemPriceTxt,{color:themedColors.secondaryTxtColor}]}
              text={trendFoodPrice != '' ? "RS : " + trendFoodPrice : "RS : 0.00"}/>
          </View>
          <View style={styles.htAddMainCont}>
            <TouchableOpacity
              onPress={() => checkAddToCartAdd(homeNewFoodId)}
              style={[styles.htAddCont, {backgroundColor: themedColors.iconBgColor }]}
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
          onPress={() => checkTrendFoodLikes(homeNewFoodId,homeParentMenuId,homeResId)}
          activeOpacity={0.6}
          style={[styles.htHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {checkTrendLike ?
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
  htItemMainCont : {
    borderRadius:BORDER_RADIUS.lg,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2lg,
  },
  htItemSubCont : {
    flex:1,
    width:130,
  },
  htcItemImgMainCont : {
    justifyContent:'center',
    alignItems:'center',
  },
  htItemImgCont : {
    width:100,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    marginTop:SPACE._3xl,
  },
  htItemImg : {
    height:90,
    width:90,
    borderRadius:BORDER_RADIUS._8xl,
  },
  htItemNameMainCont : {
    margin:SPACE._2md
  },
  htItemNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base
  },
  htItemSubTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  htItemPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  htItemPriceTxtCont : {
    marginTop:SPACE._3xs,
    alignItems:'flex-start'
  },
  htItemRateCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  htItemRateTxtCont : {
    marginTop:1,
    marginStart:SPACE._2xs,
  },
  htItemRateTxt : {
    marginTop:1,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
  },
  htHeartIconCont : {
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
  htAddMainCont : {
    marginTop:SPACE.sm,
    alignItems:'flex-end'
  },
  htAddCont : {
    width:20,
    height:20,
    borderRadius:BORDER_RADIUS._2xs,
    alignItems:'center',
    justifyContent:'center',
  }
})
