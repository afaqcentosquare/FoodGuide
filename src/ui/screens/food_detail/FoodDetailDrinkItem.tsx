import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { GILROY } from "../../../config";

type Props = {
  index : number,
  length : number,
}

export const FoodDetailDrinkItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={[styles.foodDetailDrinkItemMainCont,{backgroundColor:themedColors.cardBgColor,marginStart: props.index === 0 ? 15 : 6,marginEnd: props.index === props.length - 1 ?  15 : 6}]}>
      <View>
        <Image
          style={styles.foodDetailDrinkItemImg}
          source={require('../../../assets/images/pepsi_img_1.jpeg')}/>
      </View>
      <View style={styles.foodDetailDrinkItemNameMainCont}>
        <View style={styles.foodDetailDrinkItemNameTxtCont}>
          <AppText
            style={[styles.foodDetailDrinkItemNameTxt,{color:themedColors.primaryTxtColor,}]}
            text={"Pepsi - 345 ml"}/>
        </View>
        <View style={styles.foodDetailDrinkPriceTxtCont}>
          <AppText
            style={[styles.foodDetailDrinkPriceTxt,{color:themedColors.secondaryTxtColor,}]}
            text={"Free"}/>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.foodDetailCheckMainCont}>
          <AntDesign
            size={22}
            name={"checkcircleo"}/>
        </TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  foodDetailDrinkItemMainCont : {
    width:120,
    borderRadius:BORDER_RADIUS.lg,
    paddingTop:SPACE._2lg,
    paddingBottom:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center'
  },
  foodDetailDrinkItemImg : {
    width:60,
    height:60,
    borderRadius:BORDER_RADIUS._8xl
  },
  foodDetailDrinkItemNameMainCont : {
    justifyContent:'center',
    alignItems:'center',
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md
  },
  foodDetailDrinkItemNameTxtCont : {
    marginTop:SPACE._2lg
  },
  foodDetailDrinkItemNameTxt : {
    fontSize:FONT_SIZE._2xs,
    textAlign:'center',
    fontFamily:GILROY.semi_bold,
  },
  foodDetailDrinkPriceTxtCont : {
    marginTop:SPACE._2xs
  },
  foodDetailDrinkPriceTxt : {
    fontSize:FONT_SIZE._3xs,
    textAlign:'center',
    fontFamily:GILROY.semi_bold,
  },
  foodDetailCheckMainCont : {
    marginTop:SPACE._2md
  }
})
