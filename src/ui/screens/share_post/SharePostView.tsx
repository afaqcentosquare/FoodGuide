import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { InputText } from "../../components/InputText";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { GILROY, MONTSERRAT } from "../../../config";
// @ts-ignore
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppButton } from "../../components/AppButton";
import { ProfileCard } from "../../components/ProfileCard";
import Strings from "../../../config/strings";
import { TextHeader } from "../../components/headers/TextHeader";

type Props = {}

export const SharePostView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const spTxt = Strings.SharePost;

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.spMainCont,{backgroundColor:themedColors.bgColor}]}>
        <TextHeader
          titleTxtVisible={true}
          title={"Add Post"}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.spSubCont}>
            <View style={[styles.spImgMainCont,{backgroundColor:themedColors.cardBgColor}]}>
              <View>
                <View>
                  <Image
                    style={styles.spImg}
                    source={require('../../../assets/images/burger_img_2.jpeg')}/>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{position:'absolute',bottom:0,top:0,left:0,right:0,alignItems:'center',justifyContent:'center'}}>
                  <View style={{justifyContent:'center',alignItems:'center',width:30,height:30,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor}}>
                    <Ionicons
                      color={"#000"}
                      size={18}
                      name={"add"}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.spCaptionMainCont}>
                <InputText
                  txtInputContStyle={styles.spInputCont}
                  txtInputStyle={styles.spInput}
                  multiLine={true}
                  hint={spTxt.spCaptionHintTxt}/>
              </View>
            </View>
            <View style={[styles.spIconMainCont,{backgroundColor:themedColors.cardBgColor,}]}>
              <View>
                <ProfileCard
                  iconType={MaterialIcons}
                  iconName={"location-on"}
                  profileCardTxt={spTxt.spLocTxt}/>
                {/*<ProfileCard
                  iconType={Ionicons}
                  iconName={"arrow-down-circle-outline"}
                  profileCardTxt={spTxt.spSaveTOLocalTxt}/>*/}
              </View>
              <View style={styles.spBtnCont}>
                <AppButton
                  text={spTxt.spBtnTxt}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  spMainCont : {
    flex:1
  },
  spHeadCont : {
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0
  },
  spSubCont : {
    flex:1,
    margin:SPACE._2lg
  },
  spImgMainCont : {
    justifyContent:'center',
    alignItems:'center',
    height:200,
    padding:SPACE._2md,
    flexDirection:'row',
    borderRadius:BORDER_RADIUS.lg
  },
  spImg : {
    height:180,
    width:120,
    borderRadius:BORDER_RADIUS.lg,
  },
  spCaptionMainCont : {
    flex:1
  },
  spInputCont : {
    alignItems:'flex-start',
    height:180,
    marginTop:0,
    padding:0,
    margin:0,
    borderRadius:0
  },
  spInput : {
    fontFamily:MONTSERRAT.semi_bold,
    fontSize:FONT_SIZE.xs,
    paddingStart:0,
    paddingEnd:0,
    paddingTop:0,
    paddingBottom:0
  },
  spIconMainCont : {
    marginTop:SPACE._2lg,
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  spBtnCont : {
    marginTop:SPACE._2xl
  }
})
