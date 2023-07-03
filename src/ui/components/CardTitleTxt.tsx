import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { FONT_SIZE, SPACE } from "../../config/Dimens";
import { Fonts } from "../../config";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";

type Props = {
  titleTxt? : string,
  seeAllTxt? : string,
  seeAllClick? : () => void,
  titleStyle? : any,
  seeAllStyle? : any,
  cardTitleTxtStyle? : any
}

export const CardTitleTxt = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {
    titleStyle,
    titleTxt,
    seeAllTxt,
    seeAllStyle,
    cardTitleTxtStyle
  } = props;

  return(
    <View style={styles.cardTitleCont}>
      <View style={[styles.cardTitleTxtCont,cardTitleTxtStyle]}>
        <AppText
          style={[styles.cardTitleTxt,titleStyle,{color:themedColors.primaryTxtColor}]}
          text={titleTxt}/>
      </View>
      <TouchableOpacity
        onPress={props.seeAllClick}
        activeOpacity={0.6}>
        <AppText
          style={[styles.cardSeeAllTxt,seeAllStyle,{color:themedColors.secondaryTxtColor}]}
          text={seeAllTxt}/>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  cardTitleCont : {
    alignItems:'center',
    flexDirection:'row'
  },
  cardTitleTxtCont : {
    flex:1,
    marginStart:SPACE._2lg,
    alignItems:'flex-start'
  },
  cardTitleTxt : {
    marginEnd:SPACE._2lg,
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl
  },
  cardSeeAllTxt : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.sm
  },
})
