import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../AppText";
import { Fonts } from "../../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  resId : string
}

type fdHeadNavProp = StackNavigationProp<AllScreenStackParamList>;

export const FoodDetailHeader = React.memo<Props>((props) =>
{
  const navigation = useNavigation<fdHeadNavProp>();
  const {themedColors} = usePreferredTheme();
  const lng = useSelector((state: RootState) => state.Lng);
  const { isRtl } = lng;
  const foodDetail = useSelector((state: RootState) => state.FoodDetail);
  const {phoneNumber} = foodDetail.resProfileData;
  const {
    resId
  } = props

  return(
    <View style={[styles.fdhMainCont,{backgroundColor:themedColors.primaryColor}]}>
      <View style={styles.fdhBackBtnMainCont}>
        <TouchableOpacity
          style={[styles.fdhBackBtnIconCont,{backgroundColor:themedColors.iconBgColor}]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.4}>
          {isRtl ?
            <Octicons
              name={"arrow-right"}
              size={16}
              color={themedColors.primaryIconColor} /> :
            <Octicons
              name={"arrow-left"}
              size={16}
              color={themedColors.primaryIconColor} />}
        </TouchableOpacity>
        <View style={styles.fdhTitleTxtCont}>
          <AppText
            numberOfLine={1}
            style={[styles.fdhTitleTxt,{color:themedColors.primaryTxtColor}]}
            text={""}/>
        </View>
      </View>
      <View style={styles.fdhIconMainCont}>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          activeOpacity={0.6}
          style={[styles.fdhIconSubCont,{backgroundColor:themedColors.iconBgColor}]}>
          <MaterialIcons
            color={themedColors.primaryIconColor}
            size={16}
            name={"call"}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('InboxDetail',{resId : resId.toString()})}
          activeOpacity={0.6}
          style={[styles.fdhIconSubCont,{marginStart:SPACE._2md,marginEnd:SPACE._2md,backgroundColor:themedColors.iconBgColor}]}>
          <AntDesign
            color={themedColors.primaryIconColor}
            size={16}
            name={"message1"}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddToCart')}
          activeOpacity={0.6}
          style={[styles.fdhIconSubCont,{backgroundColor:themedColors.iconBgColor}]}>
          <AntDesign
            color={themedColors.primaryIconColor}
            size={16}
            name={"shoppingcart"} />
        </TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  fdhMainCont : {
    flexDirection:'row',
    alignItems:'center',
    paddingTop:SPACE.sm,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl,
    paddingBottom:SPACE._2md,
  },
  fdhBackBtnMainCont : {
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  fdhBackBtnIconCont : {
    height:33,
    width:33,
    marginStart:SPACE._2lg,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  fdhIconMainCont : {
    flexDirection:'row',
    marginEnd:SPACE._2lg
  },
  fdhIconSubCont : {
    width:35,
    height:35,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  fdhTitleTxtCont : {
    marginStart:SPACE._2md,
    marginEnd:SPACE._2lg,
    alignItems : "center"
  },
  fdhTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
  }
})
