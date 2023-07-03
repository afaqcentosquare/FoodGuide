import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { AppText } from "../../components/AppText";
import { Fonts, Strings } from "../../../config";
import { InputText } from '../../components/InputText';
import { AppButton } from "../../components/AppButton";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import {
  setUserProfileLocation,
  setUserProfileName,
  setUserProfilePhoneNumber,
} from "../../../redux/slice/UserProfileSlice";
import { DefaultUserImg } from "../../components/DefaultUserImg";

type Props = {
  resProfileBtn : () => void,
  photoClick : () => void
}

export const UserProfileView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const signInTxt = Strings.signIn;
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.UserProfile);

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.keyboardAvoidingView]}>
      <Screens statusBarColor={themedColors.primaryColor}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.profileMainCont,{backgroundColor:themedColors.bgColor}]}>
            <TouchableOpacity
              onPress={props.photoClick}
              activeOpacity={0.6}
              style={{alignItems:'center'}}>
              {userProfile.userProfileImage != '' ?
                <Image
                  style={{width:100,height:100,borderRadius:BORDER_RADIUS._8xl}}
                  source={{uri : userProfile.userProfileImage}}/> :
                <DefaultUserImg/>}
            </TouchableOpacity>
            <View style={{alignItems:'center',marginTop:SPACE.md}}>
              <AppText
                style={{fontFaimly:Fonts.semi_bold,fontSize:FONT_SIZE.lg}}
                text={"Add User Image"}/>
            </View>
            <View style={{marginTop:SPACE._2xl}}>
              <InputText
                valueToShowAtStart={userProfile.userProfileName}
                onChangeText={(e) => dispatch(setUserProfileName(e))}
                txtInputContStyle={[styles.signInEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                txtInputStyle={{ fontSize:FONT_SIZE.base,fontFamily: Fonts.semi_bold,includeFontPadding:true}}
                hint={"Enter Name"}/>
            </View>
            <View style={{marginTop:SPACE._2lg}}>
              <InputText
                valueToShowAtStart={userProfile.userProfileLocation}
                onChangeText={(e) => dispatch(setUserProfileLocation(e))}
                txtInputContStyle={[styles.signInEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                txtInputStyle={{ fontSize:FONT_SIZE.base,fontFamily: Fonts.semi_bold,includeFontPadding:true}}
                hint={"Location"}/>
            </View>
            <View style={{marginTop:SPACE._2lg}}>
              <InputText
                valueToShowAtStart={userProfile.userProfilePhoneNumber}
                onChangeText={(e) => dispatch(setUserProfilePhoneNumber(e))}
                txtInputContStyle={[styles.signInEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                txtInputStyle={{ fontSize:FONT_SIZE.base,fontFamily: Fonts.semi_bold,includeFontPadding:true}}
                hint={"Enter Phone Number"}/>
            </View>
            <View style={{marginTop:SPACE._2xl}}>
              <AppButton
                onPress={() => props.resProfileBtn()}
                btnContStyle={styles.signInBtnHeight}
                text={"Next"}/>
            </View>
          </View>
        </ScrollView>
      </Screens>
    </KeyboardAvoidingView>

  )
})

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
  profileMainCont : {
    flex:1,
    padding:SPACE._2xl,
  },
  signInEdtHeight : {
    height:45,
  },
  signInBtnHeight : {
    height:45
  },
})
