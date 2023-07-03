import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Image, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { postObj } from "../../../models/res_model/PostModel";

type Props = {
  postData : postObj
}

export const CommentInfoLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {foodData} = useSelector((state: RootState) => state.FoodReview);
  const {foodImg,foodPrice,foodName,foodCatName,foodRating} = foodData
  const {postDes} = props.postData

  return(
    <View style={[styles.cilMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.cilSubCont}>
        <View style={[styles.cilImgCont,{backgroundColor:themedColors.bgColor}]}>
          {foodImg != '' ?
            <Image
              style={styles.cilImg}
              source={{ uri: foodImg }} /> :
            <DefaultUserImg/>}
        </View>
        <View style={styles.cilNameCont}>
          <View>
            <AppText
              style={[styles.cilNameTxt,{color:themedColors.primaryTxtColor}]}
              text={foodName != '' ? foodName : ''}/>
          </View>
          <View>
            <AppText
              style={[styles.cilSubTxt,{color:themedColors.secondaryTxtColor}]}
              text={"from Tandooristan"}/>
          </View>
          <View>
            <View style={styles.cilCardMainCont}>
              <View style={[styles.cilCardCont1,{backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <MaterialCommunityIcons
                    name={"food"}
                    size={14}/>
                </View>
                <View style={styles.cilCardTxtCont}>
                  <AppText
                    style={[styles.cilCardTxt,{color:themedColors.secondaryTxtColor}]}
                    text={foodCatName != '' ? foodCatName : ''}/>
                </View>
              </View>
              <View style={[styles.cilCardCont1,{marginStart:SPACE._2md,backgroundColor:themedColors.cardPrimaryColor}]}>
                <View>
                  <AntDesign
                    color={themedColors.yellow}
                    size={14}
                    name={"star"}/>
                </View>
                <View style={styles.cilCardTxtCont}>
                  <AppText
                    style={[styles.cilCardTxt,{color:themedColors.secondaryTxtColor}]}
                    text={foodRating != 0 ? foodRating.toFixed(1) : ''}/>
                </View>
              </View>
            </View>
            <View style={[styles.cilCardCont2,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View>
                <FontAwesome
                  color={themedColors.primaryIconColor}
                  size={14}
                  name={"money"} />
              </View>
              <View style={styles.cilCardTxtCont}>
                <AppText
                  style={[styles.cilCardTxt,{color:themedColors.secondaryTxtColor}]}
                  text={foodPrice != '' ? "RS : " + foodPrice : ''}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cilDesTxtCont}>
        <AppText
          style={[styles.cilDesTxt,{color:themedColors.secondaryTxtColor}]}
          text={postDes != '' ? postDes : ''}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  cilMainCont : {
    flex:1,
    margin:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2lg
  },
  cilSubCont : {
    flexDirection:'row'
  },
  cilImgCont : {
    width:80,
    height:80,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  cilImg : {
    height: 70,
    width: 70,
    borderRadius: BORDER_RADIUS._8xl,
  },
  cilNameCont : {
    flex:1,
    justifyContent:'center',
    marginStart:SPACE._2lg,
  },
  cilNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl,
  },
  cilSubTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  cilCardMainCont : {
    flexDirection:'row',
    marginTop:SPACE.xs
  },
  cilCardCont1 : {
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  cilCardTxtCont : {
    marginStart:SPACE._2xs
  },
  cilCardTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._3xs
  },
  cilCardCont2 : {
    width:100,
    height:25,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._2md,
    borderRadius:BORDER_RADIUS._8xl,
  },
  cilDesTxtCont : {
    marginTop:SPACE._2lg
  },
  cilDesTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xs,
  }
})
