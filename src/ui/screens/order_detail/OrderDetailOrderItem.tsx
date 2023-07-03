import React, { useEffect, useState } from "react";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StyleSheet, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import Helper from "../../../helper/Helper";
import { orderCartObj } from "../../../models/res_model/OrdersModel";

type Props = {
  item : orderCartObj,
  index : number,
  length : number,
}

export const OrderDetailOrderItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {foodId,parentCatId,resId,quantity} = props.item
  const [orderFoodName,setOrderFoodName] = useState('')
  const [orderCatNam,setOrderCatName]= useState('')
  const [orderFoodPrice,setOrderFoodPrice] = useState('');

  function getOrderFoodData()
  {
    Helper.getFoodData(foodId,parentCatId,resId)
      .then((result : any) =>
      {
        setOrderFoodPrice(result.foodPrice)
        setOrderCatName(result.foodCatName)
        setOrderFoodName(result.foodName);
      })
  }

  useEffect(() =>
  {
    getOrderFoodData()
  },[])

  return(
    <View style={[styles.odoItemMainCont,{
      paddingTop: props.index === 0 ? SPACE.sm : SPACE._2xs,
      paddingBottom: props.index === props.length - 1 ?  SPACE._2xs : SPACE.xs,
      backgroundColor:themedColors.cardBgColor,}]}>
      <View style={styles.odoItemSubCont}>
        <View style={styles.odoItemTxtCont}>
          <AppText
            style={[styles.odoItemTxt,{color:themedColors.secondaryTxtColor,}]}
            text={orderCatNam}/>
        </View>
        <View style={styles.odoItemTxtCont}>
          <AppText
            style={[styles.odoItemTxt,{color:themedColors.secondaryTxtColor,}]}
            text={orderFoodName}/>
        </View>
        <View style={styles.odoItemTxtCont}>
          <AppText
            style={[styles.odoItemTxt,{color:themedColors.secondaryTxtColor,}]}
            text={quantity + "x"}/>
        </View>
        <View style={styles.odoItemTxtCont}>
          <AppText
            style={[styles.odoItemTxt,{color:themedColors.secondaryTxtColor,}]}
            text={"RS : " + orderFoodPrice}/>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  odoItemMainCont : {
    paddingStart:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  odoItemSubCont : {
    flexDirection:'row',
    paddingBottom:SPACE._2xs
  },
  odoItemTxtCont : {
    flex:1,
    marginEnd:SPACE.sm
  },
  odoItemTxt : {
    textAlign:'center',
    fontSize:FONT_SIZE._2xs,
    fontFamily:Fonts.semi_bold
  }
})
