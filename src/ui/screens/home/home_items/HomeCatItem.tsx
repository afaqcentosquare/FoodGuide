import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../config/Dimens";
import { Fonts } from "../../../../config";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import database from "@react-native-firebase/database";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../../../routes/bottom_nav_routes/BottomNavStack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../../redux";
import { setCategoryResList, setSelectCatType } from "../../../../redux/slice/CategorySlice";
import { categoryObj } from "../../../../models/res_model/CategoryModel";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Props = {
  index : number,
  length : number,
  item : categoryObj
}

type homeCatNavProp = StackNavigationProp<HomeStackParamList>;

export const HomeCatItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<homeCatNavProp>();
  const { foodCatId } = props.item;
  const dispatch = useAppDispatch();
  const [foodCatName,setFoodCatName] = useState('')
  const [fooCatImg,setFoodCatImg] = useState('');

  useEffect(() =>
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("FoodCategory")
          .child(foodCatId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setFoodCatImg(showDataSnap.child("foodCatImg").val())
        setFoodCatName(showDataSnap.child("foodCatName").val())
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  },[])

  return(
    <View style={[styles.hcItemMainCont , {
      backgroundColor:themedColors.cardBgColor,
      marginStart: props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginEnd: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={[styles.hcImgItemCont,{backgroundColor:themedColors.imgBgColor,}]}>
        {fooCatImg != '' ?
          <Image
            style={styles.hcImgItem}
            source={{ uri: fooCatImg }} /> : null}
      </View>
      <View style={styles.hcItemTxtCont}>
        <AppText
          numberOfLine={1}
          style={[styles.hcItemTxt,{color:themedColors.primaryTxtColor}]}
          text={foodCatName != '' ? foodCatName : ''}/>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Category");
          dispatch(setSelectCatType(foodCatName))
          dispatch(setCategoryResList(Object.values(props.item.Restaurant)))}}
        activeOpacity={0.6}
        style={[styles.hcIconCont,{backgroundColor:themedColors.iconBgColor}]}>
        <MaterialIcons
          color={themedColors.primaryIconColor}
          size={14}
          name={"keyboard-arrow-right"}/>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  hcItemMainCont : {
    width:100,
    elevation:4,
    marginTop:SPACE.md,
    marginBottom:SPACE.md,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS.lg,
    paddingStart:SPACE.md,
    paddingEnd:SPACE.md,
    paddingTop:SPACE.xl,
    paddingBottom:SPACE.xl
  },
  hcImgItemCont : {
    height:60,
    width:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  hcImgItem : {
    height:53,
    width:53,
    resizeMode:'contain',
    borderRadius:BORDER_RADIUS._8xl
  },
  hcItemTxtCont : {
    marginTop:SPACE.md,
    justifyContent:'center'
  },
  hcItemTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xs
  },
  hcIconCont : {
    width:25,
    height:25,
    marginTop:SPACE.md,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  }
})
