import React from 'react';
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { AppText } from "./AppText";
import { Fonts } from "../../config";
import { FONT_SIZE, SPACE } from "../../config/Dimens";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";
import { ImagesPath } from "../../config/ImagesPath";
import strings from "../../config/languages/LocalizedStrings";

type Props = {}

export const NoInternetConnection = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    oopsTxt,
    noInternetTxt
  } = Strings

  return(
    <View style={styles.nicMainCont}>
      <View style={styles.nicImgCont}>
        <LottieView
          source={ImagesPath.noInternet}
          autoPlay
          loop/>
      </View>
      <View>
        <AppText
          style={[styles.nicTxt1,{color:themedColors.primaryTxtColor}]}
          text={oopsTxt}/>
      </View>
      <View style={styles.nicTxt2Cont}>
        <AppText
          style={[styles.nicTxt2,{color:themedColors.secondaryTxtColor,}]}
          text={noInternetTxt}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  nicMainCont : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  nicImgCont : {
    height:280,
    width:280
  },
  nicTxt1 : {
    textAlign:'center',
    fontFamily:Fonts.extra_bold,
    fontSize:FONT_SIZE._3xl
  },
  nicTxt2Cont : {
    marginTop:SPACE._2xl
  },
  nicTxt2 : {
    textAlign:'center',
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
  }
})
