import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../config/Dimens";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";
import { IconText } from "./IconText";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { Fonts } from "../../config";

type Props = {
  profileCardTxt? : string,
  profileCardIconName? : string,
  profileCardIconTxt? : string,
  profileCardClick? : () => void,
  iconType : any,
  iconName : string,
}

export const ProfileCard = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <TouchableOpacity
      onPress={props.profileCardClick}
      activeOpacity={0.6}
      style={styles.pcMainCont}>
      <View style={[styles.pcIconCont,{backgroundColor:themedColors.imgBgColor}]}>
        <props.iconType
          color={themedColors.primaryIconColor}
          size={14}
          name={props.iconName}/>
      </View>
      <View style={styles.pcTextCont}>
        <AppText
          style={[styles.pcText,{color:themedColors.primaryTxtColor}]}
          text={props.profileCardTxt}/>
      </View>
      <View>
        <Ionicons
          size={22}
          color={themedColors.primaryIconColor}
          name={"chevron-forward"}/>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  pcMainCont : {
    marginTop:SPACE.xs,
    marginBottom:SPACE.xs,
    flexDirection:'row',
    alignItems:'center'
  },
  pcIconCont : {
    width:35,
    height:35,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  pcTextCont : {
    flex:1,
    marginStart:SPACE.md
  },
  pcText : {
    fontFamily:Fonts.bold,
    justifyContent:'center',
    textAlignVertical:'center',
    fontSize:FONT_SIZE.base,
  }
})
