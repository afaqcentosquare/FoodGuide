import React from 'react';
import { Image,StyleSheet,View } from "react-native";
import { AppText } from "../../components/AppText";
import { IconText } from "../../components/IconText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { foodObj } from "../../../models/res_model/MenuModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  foodInfo : foodObj
}

type fdNavProp = StackNavigationProp<AllScreenStackParamList>;

export const FoodDetailListHeader = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<fdNavProp>();
  const {foodName,foodImg,foodDes,foodRating,} = props.foodInfo;
  const foodDetail = useSelector((state: RootState) => state.FoodDetail);
  const {foodVideoThumbnail} = foodDetail;
  const {minOrder,phoneNumber,location,deliveredTime} = foodDetail.resProfileData;

  return(
    <View style={[styles.fdlhMainCont, { backgroundColor: themedColors.bgColor }]}>
      <View style={[styles.fdlhImgMainCont,{backgroundColor:themedColors.bgColor}]}>
        {foodVideoThumbnail.postThumbNail != '' ?
          <Image
            style={styles.fdlhImg}
            source={{ uri: foodVideoThumbnail.postThumbNail }} /> :
          <View style={[styles.fdlhImg,{backgroundColor:themedColors.cardBgColor}]}>
            <Ionicons
              color={themedColors.primaryIconColor}
              size={28}
              name={"images"}/>
          </View>}
      </View>
      <View style={[styles.fdlhInfoCont,{backgroundColor:themedColors.cardBgColor}]}>
        <View style={styles.fdlhNameTxtCont}>
          <AppText
            style={[styles.fdlhNameTxt, { color: themedColors.primaryTxtColor }]}
            text={foodName != '' ? foodName : ''} />
        </View>
        <View style={styles.fdlhMarginTop}>
          <View>
            <IconText
              iconType={Ionicons}
              iconName={"location"}
              iconSize={13}
              iconTxt={location != '' ? location : ''} />
          </View>
          <View style={styles.fdlhMarginTop}>
            <IconText
              iconType={Feather}
              iconName={"clock"}
              iconSize={13}
              iconTxt={"Delivered in " + deliveredTime} />
          </View>
          <View style={styles.fdlhMarginTop}>
            <IconText
              iconType={MaterialCommunityIcons}
              iconName={"phone"}
              iconSize={13}
              iconTxt={phoneNumber != '' ? phoneNumber : ''} />
          </View>
          <View style={styles.fdlhMarginTop}>
            <IconText
              iconType={AntDesign}
              iconName={"star"}
              iconSize={13}
              iconTxtStyle={{ marginTop: 3 }}
              iconTxt={foodRating != 0 ? foodRating.toFixed(1) : "0.0"} />
          </View>
          <View style={styles.fdlhMarginTop}>
            <IconText
              iconType={FontAwesome}
              iconName={"money"}
              iconSize={13}
              iconTxt={"Order minim : RS - " + minOrder} />
          </View>
        </View>
      </View>
      <View style={[styles.fdlhCardMainCont,{backgroundColor:themedColors.cardBgColor}]}>
        <View style={styles.fdlhCardTitleTxtCont}>
          <AppText
            style={[styles.fdlhCardTitleTxt, { color: themedColors.primaryTxtColor }]}
            text={"Description"} />
        </View>
        <View style={styles.fdlhCardDesTxtCont}>
          <AppText
            style={[styles.fdlhCardDesTxt, { color: themedColors.secondaryTxtColor }]}
            text={foodDes != '' ? foodDes : ''}  />
        </View>
      </View>
      {/*<View style={[styles.fdlhCardMainCont,{backgroundColor: themedColors.cardBgColor}]}>
        <View style={styles.fdlhCardTitleTxtCont}>
          <AppText
            style={[styles.fdlhCardTitleTxt, { color: themedColors.primaryTxtColor }]}
            text={"Ingredient"} />
        </View>
        <View style={styles.fdlhCardDesTxtCont}>
          <AppText
            style={[styles.fdlhCardDesTxt, { color: themedColors.secondaryTxtColor }]}
            text={ingredients != '' ? ingredients : ''} />
        </View>
      </View>*/}
    </View>
  )
})

const styles = StyleSheet.create({
  fdlhMainCont : {
    flex:1,
  },
  fdlhMarginTop : {
    marginTop:SPACE._2md
  },
  fdlhImgMainCont : {
    marginTop:SPACE._2lg,
  },
  fdlhImgCont : {
    marginTop:SPACE._2lg,
  },
  fdlhImg : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS.lg,
    width:'100%',
    height:200,
    resizeMode:'cover'
  },
  fdlhInfoCont : {
    marginTop:SPACE.md,
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  fdlhNameTxtCont : {
    alignItems:'flex-start',
    marginStart:SPACE._2xs,
  },
  fdlhNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  fdlhCardMainCont : {
    marginTop:SPACE.md,
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  fdlhCardTitleTxtCont : {
    alignItems:'flex-start'
  },
  fdlhCardTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  fdlhCardDesTxtCont : {
    alignItems:'flex-start',
    marginTop: SPACE.xs
  },
  fdlhCardDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
})
