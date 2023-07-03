import React from "react";
import {Image, StyleSheet, View} from "react-native"
import { BORDER_RADIUS, SPACE, width } from "../../../../config/Dimens";
import { dealsDataObj } from "../../../../models/res_model/HomeModel";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";

type Props = {
  homeItem : dealsDataObj
}

export const HomeDealsItem = React.memo<Props>((props) =>
{
  const { dealsImg } = props.homeItem;
  const {themedColors} = usePreferredTheme();

  return(
    <View style={[styles.homeDealsCont,{backgroundColor:themedColors.cardBgColor}]}>
      {dealsImg != '' &&
        <Image
          style={styles.homeDealsImg}
          source={{ uri: dealsImg }} />}
    </View>
  )
})

const styles = StyleSheet.create({
  homeDealsCont: {
    flex:1,
    width:width - 30,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE.md,
    marginBottom:SPACE.md,
    elevation:2,
    overflow:'hidden',
    borderRadius:BORDER_RADIUS.lg,
    justifyContent:'center',
    alignItems:'center'
  },

  homeDealsImg : {
    resizeMode:'cover',
    height:200,
    width:width - 30,
    justifyContent:'center',
    alignItems:'center',
  }
})
