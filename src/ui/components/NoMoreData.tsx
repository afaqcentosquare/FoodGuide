import React from 'react';
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { FONT_SIZE, SPACE } from "../../config/Dimens";
import { AppText } from "./AppText";
import { Fonts } from "../../config";

type Props = {
  loadData : boolean,
  showError : boolean,
  noDataTxt : string
}

export const NoMoreData = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {
    loadData,
    showError,
    noDataTxt
  } = props

  return(
    <>
      {loadData &&
        <View style={{ height: 60 }}>
          <LottieView source={require("../../assets/images/pagination_loader.json")} autoPlay loop />
        </View>}
      {showError &&
        <View style={styles.nmdMainCont}>
          <View style={styles.nmdImgCont}>
            <LottieView
              source={require("../../assets/images/no_more_data.json")}
              autoPlay loop />
          </View>
          <View>
            <AppText
              style={[styles.nmdTxt,{color:themedColors.primaryTxtColor}]}
              text={noDataTxt}/>
          </View>
        </View>}
    </>
  )
})

const styles = StyleSheet.create({
  nmdMainCont : {
    width:'100%',
    marginBottom:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center',
  },
  nmdImgCont : {
    height:120,
    width:120
  },
  nmdTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  }
})
