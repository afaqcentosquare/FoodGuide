import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
// @ts-ignore
import SignInBgImg1 from "../../../assets/images/splash_img.svg";
import { AppText } from "../../components/AppText";
import { InputText } from "../../components/InputText";
import { AppButton } from "../../components/AppButton";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts,  Strings } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setSignUpEdtConfirmPass, setSignUpEdtEmail, setSignUpEdtPass } from "../../../redux/slice/SignUpSlice";
import { ProgressBar } from "../../components/ProgressBar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import strings from "../../../config/languages/LocalizedStrings";
import * as Yup from "yup";
import { useFormik } from "formik";

type Props = {
  signUpBtn : (values : SignUpFormValues) => void;
}

type SignUpFormValues = {
  email : string;
  password : string;
  confirmPass : string
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.signInEmailErrorTxt),
  password: Yup.string()
    .required(strings.signInPassErrorTxt)
    .min(8, "Password cannot be less than eight characters."),
  confirmPass: Yup.string()
    .required(strings.signInPassErrorTxt)
});

const initialFormValues: SignUpFormValues = {
  email: "",
  password: "",
  confirmPass : ""
};

type signUpNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SignUpView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<signUpNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const signUp = useSelector((state: RootState) => state.SignUp);
  const Strings = strings;
  const {
    signUpTitle1,
    signUpTitle2,
    signUpEmailHintTxt,
    signUpPassHintTxt,
    signUpConfPassHintTxt,
    signUpNoAccountTxt,
    signUpTxt,
    signUpBtnTxt,
    signUpEmailErrorTxt,
    signUpPassErrorTxt,
    signUpConfirmPassErrorTxt
  } = Strings

  const  {
    signUpBtn
  } = props

  const { handleChange,handleSubmit,errors,values,isValid } = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit : (values) => {
      signUpBtn?.(values);
    },
  });

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.keyboardAvoidingView]}>
      <Screens statusBarColor={themedColors.primaryColor}>
        {signUp.signUpLoad &&
          <View style={styles.signUpLoadCont}>
            <ProgressBar />
          </View>}
        {!signUp.signUpLoad &&
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.signUpMainCont}>
              <View style={styles.signUpLogoCont}>
                <Image
                  style={styles.signUpLogo}
                  source={require("../../../assets/images/splash_img.png")} />
              </View>
              <View style={styles.signUpTitleTxtCont1}>
                <AppText
                  style={[styles.signUpTitleTxt1, { color: themedColors.primaryTxtColor }]}
                  text={signUpTitle1} />
              </View>
              <View style={styles.singUpTitleTxtCont2}>
                <AppText
                  style={[styles.signUpTitleTxt2, { color: themedColors.secondaryTxtColor }]}
                  text={signUpTitle2} />
              </View>
              <View style={styles.signUpEdtEmailCont}>
                <InputText
                  valueToShowAtStart={signUp.signUpEdtEmail}
                  onChangeText={(e) => dispatch(setSignUpEdtEmail(e))}
                  edtStartIconVisible={true}
                  edtStartIconType={MaterialIcons}
                  edtStartIconName={"alternate-email"}
                  edtStartIconSize={18}
                  txtInputStyle={[styles.signUpEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.signUpEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                  hint={signUpEmailHintTxt} />
              </View>
              {errors.email &&
                <View style={styles.signUpEdtErrorTxtCont}>
                  <AppText
                    style={[styles.signUpEdtErrorTxt, { color: themedColors.red }]}
                    text={signUpEmailErrorTxt} />
                </View>}
              <View style={styles.signUpEdtPassCont}>
                <InputText
                  onChangeText={(e) => dispatch(setSignUpEdtPass(e))}
                  valueToShowAtStart={signUp.signUpEdtPass}
                  secureTxtEntry={true}
                  maxLength={8}
                  edtStartIconVisible={true}
                  edtStartIconType={MaterialCommunityIcons}
                  edtStartIconName={"lock-outline"}
                  edtStartIconSize={18}
                  txtInputStyle={[styles.signUpEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.signUpEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                  hint={signUpPassHintTxt} />
              </View>
              {errors.password &&
                <View style={styles.signUpEdtErrorTxtCont}>
                  <AppText
                    style={[styles.signUpEdtErrorTxt, { color: themedColors.red }]}
                    text={signUpPassErrorTxt} />
                </View>}
              <View style={styles.signUpEdtPassCont}>
                <InputText
                  valueToShowAtStart={signUp.signUpEdtConfirmPass}
                  secureTxtEntry={true}
                  maxLength={8}
                  edtStartIconType={MaterialCommunityIcons}
                  edtStartIconName={"lock-outline"}
                  onChangeText={(e) => dispatch(setSignUpEdtConfirmPass(e))}
                  edtStartIconSize={18}
                  txtInputStyle={[styles.signUpEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.signUpEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                  hint={signUpConfPassHintTxt} />
              </View>
              {errors.confirmPass &&
                <View style={styles.signUpEdtErrorTxtCont}>
                  <AppText
                    style={[styles.signUpEdtErrorTxt, { color: themedColors.red }]}
                    text={signUpConfirmPassErrorTxt} />
                </View>}
              <View style={styles.signUpBtnCont}>
                <AppButton
                  onPress={handleSubmit}
                  btnContStyle={styles.signUpBtnHeight}
                  text={signUpBtnTxt} />
              </View>
              <View style={styles.signUpNoAccountTxtCont}>
                <View>
                  <AppText
                    style={[styles.signUpNoAccountTxt, { color: themedColors.secondaryTxtColor }]}
                    text={signUpNoAccountTxt} />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignIn")}
                  activeOpacity={0.6}>
                  <AppText
                    style={[styles.signUpNoAccountTxt, { color: themedColors.bgColor }]}
                    text={signUpTxt} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>}
      </Screens>
    </KeyboardAvoidingView>

  )
})

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
  signUpLoadCont : {
    flex : 1,
  },
  signUpMainCont : {
    flex:1,
    margin:SPACE._2xl,
    justifyContent:'center'
  },
  signUpLogoCont : {
    alignItems:'center'
  },
  signUpLogo : {
    width: 180,
    height: 180
  },
  signUpEdtErrorTxtCont : {
    marginTop:SPACE.sm,
    alignItems : "flex-start"
  },
  signUpEdtErrorTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE._2xs
  },
  signUpTitleTxtCont1 : {
    marginTop:SPACE._2xl,
  },
  singUpTitleTxtCont2 : {
    marginTop:SPACE.sm
  },
  signUpTitleTxt1 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xl
  },
  signUpTitleTxt2 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  signUpEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  signUpEdtHeight : {
    height:45,
  },
  signUpEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  signUpEdtPassCont : {
    marginTop:SPACE.sm
  },
  signUpForgetPassTxtCont : {
    alignItems:'flex-end',
    marginTop:SPACE.xl
  },
  signUpForgetPassTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  signUpBtnCont : {
    marginTop:SPACE._2xl,
  },
  signUpBtnHeight : {
    height:45
  },
  signUpNoAccountTxtCont : {
    marginTop:SPACE._2lg,
  },
  signUpNoAccountTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
  },
})
