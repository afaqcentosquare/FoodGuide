import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { GILROY } from "../../../config";

type Props = {
  index : number,
  length : number
}

export const FoodDetailIngredientItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={[styles.foodDetailIngreItemMainCont,{backgroundColor:themedColors.cardBgColor,marginStart: props.index === 0 ? 15 : 6,marginEnd: props.index === props.length - 1 ?  15 : 6}]}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image
          style={styles.foodDetailIngreItemImgCont}
          source={require('../../../assets/images/zinger_burger.jpeg')}/>
      </View>
      <View style={styles.foodDetailIngreItemNameMainCont}>
        <View style={{}}>
          <AppText
            style={[styles.foodDetailIngreItemNameTxt,{color:themedColors.primaryTxtColor}]}
            text={"Mirchi"}/>
        </View>
        <View style={styles.foodDetailIngreItemGramTxtCont}>
          <AppText
            style={[styles.foodDetailIngreItemGramTxt,{color:themedColors.secondaryTxtColor}]}
            text={"20 gram"}/>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  foodDetailIngreItemMainCont : {
    width:100,
    borderRadius:BORDER_RADIUS.lg,
    paddingTop:SPACE._2lg,
    paddingBottom:SPACE._2lg,
  },
  foodDetailIngreItemImgCont : {
    width:60,
    height:60,
    borderRadius:BORDER_RADIUS._8xl
  },
  foodDetailIngreItemNameMainCont : {
    justifyContent:'center',
    alignItems:'center',
  },
  foodDetailIngreItemNameCont : {
    marginTop:SPACE._2md
  },
  foodDetailIngreItemNameTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  foodDetailIngreItemGramTxtCont : {
    marginTop:SPACE._2xs
  },
  foodDetailIngreItemGramTxt : {
   fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._2xs
  }
})
