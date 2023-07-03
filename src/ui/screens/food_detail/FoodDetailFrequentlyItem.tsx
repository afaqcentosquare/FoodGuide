import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
import { GILROY } from "../../../config";

type Props = {
  index : number,
  length : number,
}

export const FoodDetailFrequentlyItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={[styles.foodDetailFreqItemMainCont,{backgroundColor:themedColors.cardBgColor,marginStart: props.index === 0 ? 15 : 6,marginEnd: props.index === props.length - 1 ?  15 : 6}]}>
      <View style={styles.foodDetailFreqItemImgCont}>
        <Image
          style={styles.foodDetailFreqItemImg}
          source={require('../../../assets/images/zinger_burger.jpeg')}/>
      </View>
      <View style={styles.foodDetailFreqItemNameMainCont}>
        <View style={styles.foodDetailFreqItemNameTxtCont}>
          <AppText
            style={styles.foodDetailFreqItemNameTxt}
            text={"Chocolate Lava Cake"}/>
        </View>
        <View style={styles.foodDetailFreqItemPriceTxtCont}>
          <AppText
            style={[styles.foodDetaiFreqItemPriceTxt,{color:themedColors.secondaryTxtColor}]}
            text={"Rs. 250.00"}/>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.foodDetailFreqItemCheckCont}>
          <AntDesign
            size={22}
            name={"checkcircleo"}/>
        </TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  foodDetailFreqItemMainCont : {
    width:120,
    borderRadius:BORDER_RADIUS.lg,
    paddingTop:SPACE._2lg,
    paddingBottom:SPACE._2lg,
  },
  foodDetailFreqItemImgCont : {
    justifyContent:'center',
    alignItems:'center'
  },
  foodDetailFreqItemImg : {
    width:70,
    height:70,
    borderRadius:BORDER_RADIUS._8xl
  },
  foodDetailFreqItemNameMainCont : {
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md
  },
  foodDetailFreqItemNameTxtCont : {
    marginTop:SPACE.sm
  },
  foodDetailFreqItemNameTxt : {
    textAlign:'center',
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  foodDetailFreqItemPriceTxtCont : {
    marginTop:SPACE._2xs
  },
  foodDetaiFreqItemPriceTxt : {
    textAlign:'center',
    fontSize:FONT_SIZE._3xs,
    fontFamily:GILROY.semi_bold,
  },
  foodDetailFreqItemCheckCont : {
    alignItems:'center',
    marginTop:SPACE.sm
  }
})
