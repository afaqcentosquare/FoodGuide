import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
// @ts-ignore
import SplashImg from "../../../assets/images/splash_img.svg";

type Props = {}

export const SplashView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.splashCont,{backgroundColor:themedColors.primaryColor}]}>
       {/* <SplashImg/>*/}
        <Image source={require('../../../assets/images/splash_img.png')}/>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  splashCont : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})
