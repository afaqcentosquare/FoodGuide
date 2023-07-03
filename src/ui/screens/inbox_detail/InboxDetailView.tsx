import React from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { InboxDetailItem } from "./InboxDetailItem";
import { InputText } from "../../components/InputText";
import colors from "../../../config/colors";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Fonts, GILROY } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { setInboxDetailMsgTxt } from "../../../redux/slice/InboxDetailSlice";

type Props = {
  sendMsgBtnClick : () => void,
  flatListRef : any
}

type inboxDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

export const InboxDetailView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<inboxDetailNavProp>();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const {
    inboxResProfileData,
    inboxDetailList,
    inboxDetailMsgTxt
  } = useSelector((state: RootState) => state.InboxDetail);
  const dispatch = useAppDispatch();

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{flex:1}}>
        <View style={[styles.idhMainCont,{backgroundColor:themedColors.bgColor}]}>
          <View style={[styles.idhSubCont,{backgroundColor:themedColors.primaryColor,}]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.4}>
              <AntDesign
                name={"arrowleft"}
                size={22}
                color={themedColors.primaryTxtColor}/>
            </TouchableOpacity>
            <View style={styles.idhImgMainCont}>
              <View style={styles.idhImgCont}>
                {inboxResProfileData.resImg != '' &&
                  <Image
                    style={styles.idhImg}
                    source={{ uri: inboxResProfileData.resImg }} />}
              </View>
              <View style={styles.idhNameCont}>
                <View>
                  <AppText
                    numberOfLine={1}
                    style={[styles.idhNameTxt,{color:themedColors.primaryTxtColor}]}
                    text={inboxResProfileData.name}/>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.idhCallIconCont,{backgroundColor:themedColors.bgColor,}]}
                activeOpacity={0.6}>
                <MaterialIcons
                  size={16}
                  name={"call"}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.idChatCont,{backgroundColor:themedColors.bgColor}]}>
            <View style={{flex:1}}>
              <FlatList
                ref={props.flatListRef}
                data={inboxDetailList}
                inverted={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index}) =>
                  <InboxDetailItem
                    item={item}
                    length={inboxDetailList.length}
                    index={index}/>}
                keyExtractor={(item, index) => index.toString()}/>
            </View>
            <View style={styles.idChatInputMainCont}>
              <View style={styles.idChatInputCont}>
                <InputText
                  valueToShowAtStart={inboxDetailMsgTxt}
                  onChangeText={(e) => dispatch(setInboxDetailMsgTxt(e))}
                  txtInputStyle={[styles.idChatInputTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.idChatInputHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter message"}/>
              </View>
              <TouchableOpacity
                onPress={props.sendMsgBtnClick}
                activeOpacity={0.6}
                style={[styles.idChatSendBtnCont,{backgroundColor:themedColors.commonBtnColor}]}>
                <Feather
                  size={18}
                  color={themedColors.white}
                  name={"send"}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screens>
  )
})

const styles = StyleSheet.create({
  idhMainCont : {
    flex:1,
  },
  idhSubCont : {
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    alignItems:'center',
    flexDirection:"row",
    borderBottomRightRadius:BORDER_RADIUS.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  idhImgMainCont : {
    flex:1,
    alignItems:'center',
    flexDirection:'row'
  },
  idhImgCont : {
    marginStart:SPACE._2md
  },
  idhImg : {
    width:35,
    height:35,
    borderRadius:BORDER_RADIUS._8xl
  },
  idhCallIconCont : {
    height:35,
    width:35,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center'
  },
  idhNameCont : {
    flex:1,
    marginStart:SPACE._2md
  },
  idhNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
    fontWeight:'600'
  },
  idhNameTxt2Cont : {
    marginTop:SPACE._2xs
  },
  idhNameTxt2 : {
    fontSize:FONT_SIZE._2xs,
    fontFamily:Fonts.semi_bold,
  },
  idChatCont : {
    flex:1,
  },
  idChatInputMainCont : {
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    paddingTop:SPACE.xs,
    paddingBottom:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  idChatInputCont : {
    flex:1,
    marginEnd:SPACE._2md
  },
  idChatInputHeight : {
    height:45,
  },
  idChatInputTxt : {
    includeFontPadding:false,
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  idChatSendBtnCont : {
    justifyContent:'center',
    alignItems:'center',
    height:45,
    width:45,
    borderRadius:BORDER_RADIUS._8xl
  }
})
