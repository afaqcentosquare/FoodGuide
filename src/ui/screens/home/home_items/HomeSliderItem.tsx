import React from "react";
import {Image, StyleSheet, View} from "react-native"
import colors from "../../../../config/colors";
import { BORDER_RADIUS, width } from "../../../../config/Dimens";
import { sliderDataObj } from "../../../../models/res_model/HomeModel";

type Props = {
    homeItem : sliderDataObj
}


export const HomeSliderItem = React.memo<Props>((props) =>
{
    const { sliderImg } = props.homeItem
    return(
        <View style={styles.homeSliderCont}>
          {sliderImg != '' ?
            <Image style={styles.homeSliderImg} source={{ uri: sliderImg }} /> : null}
        </View>
    )
})

const styles = StyleSheet.create({
    homeSliderCont: {
      flex:1,
      width:width - 30,
      margin:15,
      elevation:2,
      overflow:'hidden',
      borderRadius:BORDER_RADIUS.lg,
      backgroundColor:colors.colors.white,
      justifyContent:'center',
      alignItems:'center'
    },

    homeSliderImg : {
      resizeMode:'cover',
      height:200,
      width:width - 30,
      justifyContent:'center',
      alignItems:'center',
    }
})
