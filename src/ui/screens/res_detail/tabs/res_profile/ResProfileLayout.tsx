import React from 'react';
import { Image, StyleSheet,View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE,SPACE } from "../../../../../config/Dimens";
import { AppText } from "../../../../components/AppText";
import { Fonts } from "../../../../../config";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { IconText } from "../../../../components/IconText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {}

export const ResProfileLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { resProfileData }  = useSelector((state: RootState) => state.ResProfile);
  const {
    closeTime ,
    deliveredTime ,
    description ,
    location ,
    name ,
    openTime ,
    phoneNumber ,
    rating ,
    resId ,
    resImg
  } = resProfileData;

  console.log("NAME : " + name);

  return(
    <View>
      <View style={[styles.rplCardMainCont,{backgroundColor:themedColors.cardBgColor}]}>
        <View style={styles.rplImgMainCont}>
          <View style={[styles.rplImgCont,{backgroundColor:themedColors.bgColor}]}>
            {resImg !== '' ?
              <Image
                style={styles.rplImg}
                source={{ uri: resImg }} /> :
              <Ionicons
                color={themedColors.primaryIconColor}
                size={24}
                name={"images"}/>}
          </View>
        </View>
        <View style={styles.rplNameMainCont}>
          <View style={styles.rplNameTxtCont}>
            <AppText
              style={[styles.rplNameTxt,{color:themedColors.primaryTxtColor}]}
              text={name != '' ? name : ''}/>
          </View>
          <View style={styles.rplMarginTop}>
            <IconText
              iconType={Ionicons}
              iconName={"location"}
              iconSize={13}
              iconTxt={location}/>
          </View>
          <View style={styles.rplMarginTop}>
            <IconText
              iconType={Feather}
              iconName={"clock"}
              iconSize={13}
              iconTxt={"Monday - Sunday\n " + openTime + " | " + closeTime }/>
          </View>
          <View style={styles.rplMarginTop}>
            <IconText
              iconType={MaterialCommunityIcons}
              iconName={"phone"}
              iconSize={13}
              iconTxt={phoneNumber}/>
          </View>
          <View style={styles.rplMarginTop}>
            <IconText
              iconType={AntDesign}
              iconName={"star"}
              iconTxtStyle={{ marginTop: 3 }}
              iconSize={13}
              iconTxt={rating != 0 ? rating.toFixed(1) : "0.0"}/>
          </View>
          <View style={styles.rplMarginTop}>
            <IconText
              iconType={FontAwesome}
              iconName={"money"}
              iconSize={13}
              iconTxt={"Rs - " + deliveredTime}/>
          </View>
        </View>
      </View>
      <View style={[styles.rplCardMainCont, { backgroundColor: themedColors.cardBgColor }]}>
        <View style={styles.rplCardTitleTxtCont}>
          <AppText
            style={[styles.rplCardTitleTxt, { color: themedColors.primaryTxtColor }]}
            text={"Description"} />
        </View>
        <View style={styles.rplDesTxtCont}>
          <AppText
            style={[styles.rplDesTxt, { color: themedColors.secondaryTxtColor }]}
            text={description != "" ? description : ""} />
        </View>
      </View>
      {/*<View style={[styles.rplCardMainCont, { backgroundColor: themedColors.cardBgColor }]}>
        <View style={styles.rplCardTitleTxtCont}>
          <AppText
            style={[styles.rplCardTitleTxt, { color: themedColors.primaryTxtColor }]}
            text={"Information"} />
        </View>
        <View style={styles.rplInfoTxtCont}>
          <AppText
            style={[styles.rplInfoTxt, { color: themedColors.secondaryTxtColor }]}
            text={information != "" ? information : ""} />
        </View>
      </View>*/}
    </View>
  )
})

const styles = StyleSheet.create({
  rplCardMainCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg,
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  rplImgMainCont : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  rplImgCont : {
    height:200,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS.lg,
  },
  rplImg : {
    borderRadius:BORDER_RADIUS.lg,
    width:'100%',
    height:200
  },
  rplNameMainCont : {
    marginTop:SPACE.xl
  },
  rplNameTxtCont : {
    alignItems:'flex-start'
  },
  rplNameTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl,
    letterSpacing:1
  },
  rplPhoneCont : {
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center',
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    position:'absolute',
    right:0,
  },
  rplMarginTop : {
    marginTop:SPACE._2md
  },
  rplCardTitleTxtCont : {
    alignItems:'flex-start'
  },
  rplCardTitleTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl,
  },
  rplDesTxtCont : {
    alignItems:'flex-start',
    marginTop:SPACE._2xs
  },
  rplDesTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  rplInfoTxtCont : {
    alignItems:'flex-start',
    marginTop:SPACE._2xs
  },
  rplInfoTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },

})
