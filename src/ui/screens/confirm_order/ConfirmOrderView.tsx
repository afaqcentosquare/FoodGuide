import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Screens } from "../../components/Screens";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { AppText } from '../../components/AppText';
import { GILROY } from "../../../config";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";

type Props = {}

export const ConfirmOrderView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:themedColors.bgColor}}>
        <View>
          <LottieView style={{height:190,width:190}} source={require('../../../assets/images/order_confirm.json')} autoPlay loop />
        </View>
        <View style={{marginTop:SPACE._2lg}}>
          <AppText
            style={{fontFamily:GILROY.bold,fontSize:FONT_SIZE.xl,color:themedColors.primaryTxtColor}}
            text={"Order is Confirmed"}/>
        </View>
        <View style={{marginTop:SPACE._2md}}>
          <AppText
            style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.sm,color:themedColors.secondaryTxtColor}}
            text={"Your Order is Deliverd within 35 mint"}/>
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({

})
