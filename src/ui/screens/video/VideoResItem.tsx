import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { resProfileObj } from "../../../models/res_model/ResModel";
import { useAppDispatch } from "../../../redux";
import { setSelectResId, setSelectResName } from "../../../redux/slice/VideoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";

type Props = {
  item : resProfileObj,
  length : number,
  index : number,
  selectClick : (resId : string) => void
}

type videoResNavProp = StackNavigationProp<AllScreenStackParamList>;

export const VideoResItem = React.memo<Props>((props) =>
{
  const { name,resId } = props.item
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const { selectResName } = useSelector((state: RootState) => state.Video);

  return(
    <TouchableOpacity
      onPress={() => {
        props.selectClick(resId)
        dispatch(setSelectResName(name));
        dispatch(setSelectResId(resId))}}
      activeOpacity={0.8}
      style={[styles.vrItemMainCont,{
        marginStart: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs,
        backgroundColor:name === selectResName ? themedColors.commonBtnColor : themedColors.secondaryIconColor}]}>
      <View>
        <AppText
          style={[styles.vrItemTxt,{color:name === selectResName ? themedColors.white : themedColors.secondaryTxtColor}]}
          text={name != '' ? name : ''}/>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  vrItemMainCont : {
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
    paddingTop:SPACE.sm,
    paddingBottom:SPACE.sm,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
  },
  vrItemTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE._2xs
  },
})
