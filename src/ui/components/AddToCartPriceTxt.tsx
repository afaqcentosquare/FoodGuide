import React from 'react';
import { StyleSheet, View } from "react-native";
import { AppText } from "./AppText";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";
import { FONT_SIZE } from "../../config/Dimens";
import { Fonts } from "../../config";

type Props = {
  priceTitleTxt : string,
  priceTxt : string
}

export const AddToCartPriceTxt = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={styles.atcPriceTxtMainCont}>
      <View style={styles.atcPriceTitleTxtCont}>
        <AppText
          style={[styles.atcPriceTitleTxt,{color:themedColors.primaryTxtColor}]}
          text={props.priceTitleTxt}/>
      </View>
      <View>
        <AppText
          style={[styles.atcPriceTxt,{color:themedColors.secondaryTxtColor}]}
          text={props.priceTxt}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  atcPriceTxtMainCont : {
    flexDirection:'row',
  },
  atcPriceTitleTxtCont : {
    flex:1
  },
  atcPriceTitleTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.base,
  },
  atcPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
  }
})
