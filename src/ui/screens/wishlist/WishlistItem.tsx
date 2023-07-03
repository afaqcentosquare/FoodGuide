import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "../../components/AppText";
import colors from "../../../config/colors";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts, GILROY } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  index : number,
  length : number,
  item : any
}

type favNavProp = StackNavigationProp<AllScreenStackParamList>;

export const WishlistItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<favNavProp>();

  return(
    <TouchableOpacity
      activeOpacity={0.6}
      /*onPress={() => navigation.navigate('FoodDetail')}*/
      style={[styles.favItemMainCont]}>
      <View style={[styles.favItemSubCont,{backgroundColor:themedColors.cardBgColor}]}>
        <View style={styles.favItemImgCont}>
          <Image
            style={styles.favItemImg}
            source={props.item.image}/>
        </View>
        <View style={styles.favItemNameMainCont}>
          <View>
            <AppText
              numberOfLine={1}
              style={[styles.favItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={props.item.name}/>
          </View>
          <View style={styles.favItemRateCont}>
            <View>
              <AntDesign
                color={colors.colors.star}
                size={14}
                name={"star"}/>
            </View>
            <View style={styles.favItemRateTxtCont}>
              <AppText
                style={[styles.favItemRateTxt,{color:themedColors.primaryTxtColor}]}
                text={"4.5"}/>
            </View>
          </View>
          <View>
            <AppText
              style={[styles.favItemSubTxt,{color:themedColors.secondaryTxtColor}]}
              text={props.item.price}/>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <TouchableOpacity
              style={[styles.favAddCont, { backgroundColor: themedColors.secondaryIconColor }]}
              activeOpacity={0.6}>
              <Ionicons
                name={"add"}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.favHeartIconCont,{backgroundColor:themedColors.secondaryIconColor}]}>
          <FontAwesome
            size={10}
            name={"heart-o"}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  favItemMainCont : {
    flex:1,
    maxWidth : '50%',
  },
  favItemSubCont : {
    flex:1,
    margin:SPACE._2xs,
    borderRadius:BORDER_RADIUS.lg,
    paddingStart:SPACE._2xs,
    paddingEnd:SPACE._2xs,
    paddingTop:SPACE._2xs
  },
  favItemImgCont : {
    flex:1,
    width:'100%',
    marginTop:SPACE._2xl,
    alignItems:'center'
  },
  favItemImg : {
    resizeMode:'cover',
    flex:1,
    height:110,
    width:110,
    borderRadius:BORDER_RADIUS._8xl,
  },
  favItemNameMainCont : {
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2md,
  },
  favItemNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.sm
  },
  favItemSubTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs
  },
  favItemPriceTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs,
  },
  favItemRateCont : {
    marginTop:2,
    flexDirection:'row',
  },
  favHeartIconCont : {
    marginEnd:SPACE._2md,
    marginTop:SPACE._2md,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    height:25,
    width:25,
    position:'absolute',
    top:0,
    right:0,
  },
  favItemRateTxtCont : {
    marginStart:SPACE._2xs,
  },
  favItemRateTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs,
    lineHeight:18
  },
  favAddCont : {
    width:20,
    height:20,
    padding:2,
    borderRadius:BORDER_RADIUS._2xs,
    alignItems:'center',
    justifyContent:'center',
  }
})
