import React from 'react';
import {AppText} from "../AppText";
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import { Fonts } from "../../../config";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from '../../../hooks/theme/usePreferredTheme';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import HeaderIcon from '../../../assets/images/home_head_icon.svg';


type Props = {
  title? : string,
  titleTxtVisible? : boolean,
  style? : StyleProp<TextStyle>,
  txtHeadCont? : StyleProp<TextStyle>,
  nextTxtVisible? : boolean,
  heartIconVisible? : boolean,
  searchIconVisible? : boolean,
  cartIconVisible? : boolean,
  nextTxtClick? : () => void,
  searchIconClick? : () => void,
  cartIconClick? : () => void,
  favIconClick? : () => void,
  feedIconClick? : () => void
  feedIconVisible? : boolean,
  iconVisible? : boolean
}

export const HomeHeader = React.memo<Props>((props) =>
{
  const {themedColors}  = usePreferredTheme();

  return(
    <View style={[styles.homeHeaderMainCont,props.txtHeadCont,{backgroundColor:themedColors.primaryColor}]}>
      <View style={styles.homeHeaderTitleCont}>
        {props.iconVisible &&
          <View>
            <HeaderIcon/>
          </View>}
        {props.titleTxtVisible &&
          <View style={styles.homeHeaderTitleTxtCont}>
            <AppText
              style={[styles.homeHeaderTitleTxt,{color:themedColors.primaryTxtColor}]}
              text={props.title} />
          </View>}
      </View>
      <View style={styles.homeHeaderIconMainCont}>
        {props.searchIconVisible &&
          <TouchableOpacity
            style={[styles.homeHeaderIconCont,{backgroundColor:themedColors.secondaryIconColor}]}
            onPress={props.searchIconClick}
            activeOpacity={0.6}>
            <Ionicons
              color={themedColors.primaryIconColor}
              size={14}
              name={"search"}/>
          </TouchableOpacity>}
        {props.feedIconVisible &&
          <TouchableOpacity
            style={[styles.homeHeaderIconCont,{backgroundColor:themedColors.iconBgColor}]}
            onPress={props.feedIconClick}
            activeOpacity={0.6}>
            <MaterialIcons
              color={themedColors.primaryIconColor}
              size={14}
              name={"dynamic-feed"}/>
          </TouchableOpacity>}
        {props.heartIconVisible &&
          <TouchableOpacity
            onPress={props.favIconClick}
            style={[styles.homeHeaderIconCont,{marginStart: SPACE._2md, marginEnd: SPACE._2md,backgroundColor:themedColors.iconBgColor}]}
            activeOpacity={0.6}>
            <AntDesign
              color={themedColors.primaryIconColor}
              size={14}
              name={"hearto"}/>
          </TouchableOpacity>}
        {props.cartIconVisible &&
          <TouchableOpacity
            onPress={props.cartIconClick}
            style={[styles.homeHeaderIconCont,{backgroundColor:themedColors.iconBgColor}]}
            activeOpacity={0.6}>
            <AntDesign
              color={themedColors.primaryIconColor}
              size={14}
              name={"shoppingcart"}/>
          </TouchableOpacity>}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  homeHeaderMainCont : {
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    flexDirection:'row',
    alignItems : 'center',
  },
  homeHeaderTitleCont : {
    flex:1
  },
  homeHeaderTitleTxtCont : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  homeHeaderTitleTxt : {
    fontFamily: Fonts.semi_bold,
    fontSize: FONT_SIZE.lg,
  },
  homeHeaderIconMainCont : {
    flexDirection:'row'
  },
  homeHeaderIconCont : {
    width:35,
    height:35,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
})
