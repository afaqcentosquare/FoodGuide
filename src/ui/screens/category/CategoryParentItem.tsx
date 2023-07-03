import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { categoryObj } from "../../../models/res_model/CategoryModel";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setCategoryResList, setSelectCatType } from "../../../redux/slice/CategorySlice";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  index : number,
  length : number,
  item : categoryObj,
  selectCatType : string
}

export const CategoryParentItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {foodCatImg,foodCatName} = props.item
  const dispatch = useAppDispatch();
  const { selectCatType } = useSelector((state: RootState) => state.Category);

  function catParentLogic(catItem: categoryObj,catName : string)
  {
    if(catItem.Restaurant != undefined)
    {
      if(props.item.foodCatName === catName)
      {
        dispatch(setCategoryResList(Object.values(catItem.Restaurant)))
      }
    }
    else
    {
      dispatch(setCategoryResList([]))
    }
  }

  useEffect(() =>
  {
    catParentLogic(props.item,selectCatType)
  },[])

  return(
    <TouchableOpacity
      onPress={() => {
        dispatch(setSelectCatType(props.item.foodCatName));
        catParentLogic(props.item, props.item.foodCatName);}}
      activeOpacity={0.6}
      style={[styles.mpItemMainCont,{
        marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={[styles.mpItemSubCont,{backgroundColor : foodCatName === selectCatType ? themedColors.blue : themedColors.iconBgColor}]}>
        <View style={[styles.mpItemImgCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          {foodCatImg != '' ?
            <Image
              style={styles.mpItemImg}
              source={{ uri: foodCatImg }}/> :
            <Ionicons
              color={themedColors.primaryIconColor}
              size={14}
              name={"images"}/>}
        </View>
        <View style={styles.mpItemTxtCont}>
          <AppText
            numberOfLine={1}
            style={[styles.mpItemTxt,{
              color:foodCatName === selectCatType ? themedColors.white : themedColors.primaryTxtColor,}]}
            text={foodCatName != "" ? foodCatName : ''} />
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
