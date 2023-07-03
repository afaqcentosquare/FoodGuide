import React from 'react';
import
{
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
  View
} from "react-native";
import {Fonts } from "../../config";
import {AppText} from "./AppText";
import {BORDER_RADIUS,SPACE} from '../../config/Dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";

type Props = {
  onPress? : () => void,
  text? : string,
  btnContStyle? : StyleProp<TextStyle>,
  btnTxtStyle? : StyleProp<TextStyle>,
  visible? : boolean,
  startIconVisible? : boolean,
  startIconType? : any,
  startIconName? : string,
  startIconSize? : number,
  endIconSize? : number
};

export const AppButton = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {
    text,
    btnContStyle,
    startIconVisible,
    visible,
    btnTxtStyle,
    startIconName,
    startIconSize,
    endIconSize
  } = props

  return(
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}>
      <View style={[styles.btnContainer,btnContStyle,{backgroundColor:themedColors.commonBtnColor}]}>
        {startIconVisible &&
          <props.startIconType
            size={startIconSize}
            color={themedColors.white}
            name={startIconName}/>}
        <AppText
          text={text?.toString()}
          style={[styles.btnText,btnTxtStyle,{color:themedColors.white}]}/>
        {visible &&
          <View style={styles.btnIconCont}>
            <AntDesign
              name={'arrowright'}
              color={themedColors.white}
              size={endIconSize}/>
          </View>}
      </View>
    </TouchableOpacity>

  )

});

const styles = StyleSheet.create({
  btnContainer: {
    height:45,
    flexDirection:'row',
    paddingStart:SPACE.xl,
    paddingEnd:SPACE.xl,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  btnIconCont : {
    marginTop:1,
    marginStart: SPACE.xs
  },
  btnIcon : {
    marginStart: SPACE.xs
  },
  btnText: {
    fontFamily:Fonts.bold,
    includeFontPadding:true,
    letterSpacing : 1,
    textAlignVertical:'center',
  },
})
