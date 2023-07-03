import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Helper from "../../../helper/Helper";
import { addToCartObj } from "../../../models/res_model/AddToCartModel";

type Props = {
  index : number,
  length : number,
  item : addToCartObj
}

export const AddToCartItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { foodId,parentCatId,resId,quantity,price,addToCartKey } = props.item
  const [cartFoodName,setFoodCartName] = useState('');
  const [cartFoodImg,setCartFoodImg] = useState('');
  const [cartFoodPrice,setCartFoodPrice] = useState('');

  function getFoodData()
  {
    Helper.getFoodData(foodId,parentCatId,resId)
      .then((result : any) =>
      {
        setFoodCartName(result.foodName)
        setCartFoodImg(result.foodImg)
        setCartFoodPrice(result.foodPrice)
      })
  }

  function addQuanCart(quantity : number,foodId : string,parentCatId : string,resId : string)
  {
    Helper.addFoodQuanCart(quantity,parentCatId,resId,foodId,cartFoodPrice)
      .then((result : any) => {

      })
  }

  function removeQuanCart(addToCartKey : string,quantity : number,foodId : string,parentCatId : string,resId : string)
  {
    if(quantity > 1)
    {
      Helper.removeFoodQuanCart(quantity,parentCatId,resId,foodId,cartFoodPrice)
        .then((result : any) => {})
    }
    else
    {
      Helper.removeFoodCart(addToCartKey)
        .then((result) => {})

      Helper.updateFoodNode(false,resId,parentCatId,foodId)
        .then((result) => {})
    }
  }

  function calculatePrice()
  {
    let prices = 0;
    prices  += parseInt(price) * quantity ;
  }

  useEffect(() =>
  {
    calculatePrice()
    getFoodData()
  },[])

  return(
    <View style={[styles.atcItemMainCont,
      { backgroundColor:themedColors.cardBgColor,
        marginEnd:SPACE._2lg,marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={[styles.atcItemImgCont,{backgroundColor:themedColors.imgBgColor}]}>
        {cartFoodImg != '' ?
          <Image
            style={styles.atcItemImg}
            source={{ uri: cartFoodImg }}/> :
          <Ionicons
            color={themedColors.primaryIconColor}
            size={16}
            name={"images"}/>}
      </View>
      <View style={styles.atcNameMainCont}>
        <View>
          <AppText
            numberOfLine={2}
            style={[styles.atcNameTxt,{color:themedColors.primaryTxtColor}]}
            text={cartFoodName}/>
        </View>
        <View style={styles.atcPriceTxtCont}>
          <AppText
            style={[styles.atcPriceTxt,{color:themedColors.secondaryTxtColor,}]}
            text={"RS : " + cartFoodPrice}/>
        </View>
      </View>
      <View style={styles.atcFooterMainCont}>
        <TouchableOpacity
          onPress={() => removeQuanCart(addToCartKey,quantity,foodId,parentCatId,resId)}
          activeOpacity={0.6}
          style={[styles.atcMinusBtnCont,{backgroundColor:themedColors.iconBgColor,}]}>
          <AntDesign
            color={themedColors.primaryIconColor}
            size={12}
            name={"minus"}/>
        </TouchableOpacity>
        <View style={styles.atcCountTxtCont}>
          <AppText
            style={[styles.atcCountTxt,{color:themedColors.secondaryTxtColor}]}
            text={quantity.toString()}/>
        </View>
        <TouchableOpacity
          onPress={() => addQuanCart(quantity,foodId,parentCatId,resId)}
          activeOpacity={0.6}
          style={[styles.atcAddBtnCont,{backgroundColor:themedColors.iconBgColor}]}>
          <Ionicons
            color={themedColors.primaryIconColor}
            size={12}
            name={"add"}/>
        </TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  atcItemMainCont : {
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,
    flexDirection:'row',
    marginStart:SPACE._2lg,
    alignItems:'center'
  },
  atcItemImgCont : {
    height:65,
    width:65,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  atcItemImg : {
    width:58,
    height:58,
    borderRadius:BORDER_RADIUS._8xl
  },
  atcNameMainCont : {
    flex:1,
    marginStart:SPACE._2md,
    marginEnd:SPACE._2lg
  },
  atcNameTxt : {
    lineHeight:20,
    fontSize:FONT_SIZE.base,
    fontFamily:Fonts.bold,
  },
  atcPriceTxtCont : {

  },
  atcPriceTxt : {
    fontSize:FONT_SIZE.xs,
    fontFamily:Fonts.semi_bold,
  },
  atcFooterMainCont : {
    flexDirection:'row',
    alignItems:'center'
  },
  atcMinusBtnCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._2xs,
    height:22,
    width:22,
  },
  atcCountTxtCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  atcCountTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.sm
  },
  atcAddBtnCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._2xs,
    height:22,
    width:22,
  }
})
