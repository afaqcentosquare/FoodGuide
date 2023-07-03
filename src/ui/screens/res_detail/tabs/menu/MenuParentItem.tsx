import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { AppText } from '../../../../components/AppText';
import { Fonts, GILROY } from "../../../../../config";
import { useAppDispatch } from "../../../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import { menuObj } from "../../../../../models/res_model/MenuModel";
import { setMenuSelectType, setMenuSubData } from "../../../../../redux/slice/ResDetailSlice";
import colors from "../../../../../config/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  index : number,
  length : number,
  item : menuObj,
  selectType : string
}

export const MenuParentItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {
    menuCatImg,
    menuCatName,
  } = props.item;
  const  {
    selectType
  } = props
  const dispatch = useAppDispatch();
  const resDetail = useSelector((state: RootState) => state.ResDetail);
  const  {menuSelectType} = resDetail

  function menuParentSelect(menuItem: menuObj,catName : string)
  {
    if(menuItem.Food != undefined)
    {
      if(menuCatName === catName)
      {
        dispatch(setMenuSubData(Object.values(menuItem.Food)))
      }
    }
    else
    {
      dispatch(setMenuSubData([]))
    }
  }

  useEffect(() =>
  {
    menuParentSelect(props.item,selectType)
  },[])

  return(
    <TouchableOpacity
      onPress={() => {
        menuParentSelect(props.item, menuCatName);
        dispatch(setMenuSelectType(menuCatName))}}
      activeOpacity={0.6}
      style={[styles.mpItemMainCont,{
        marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={[styles.mpItemSubCont,{backgroundColor : menuCatName === menuSelectType ? themedColors.blue : themedColors.iconBgColor}]}>
        <View style={[styles.mpItemImgCont,{backgroundColor:themedColors.cardBgColor}]}>
          {menuCatImg != '' ?
            <Image
              style={styles.mpItemImg}
              source={{ uri: menuCatImg }}/> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={14}
              name={"images"}/>}
        </View>
        <View style={styles.mpItemTxtCont}>
          <AppText
            numberOfLine={1}
            style={[styles.mpItemTxt,{
              color:menuCatName === menuSelectType ? themedColors.white : themedColors.primaryTxtColor,}]}
            text={menuCatName != "" ? menuCatName : ''} />
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  mpItemMainCont : {
    alignItems:'center',
    marginStart:SPACE.xl,
    marginEnd:SPACE.xl,
  },
  mpItemSubCont : {
    padding:SPACE._2md,
    borderRadius:BORDER_RADIUS.lg
  },
  mpItemImgCont : {
    width:40,
    height:40,
    borderRadius:BORDER_RADIUS._8xl,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  mpItemImg : {
    borderRadius:BORDER_RADIUS._8xl,
    width:33,
    height:33
  },
  mpItemTxtCont : {
    marginTop:SPACE.sm
  },
  mpItemTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  }
})
