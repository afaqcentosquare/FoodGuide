import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Screens } from "../../components/Screens";
import { AppText } from "../../components/AppText";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import { InputText } from "../../components/InputText";
import { AppButton } from "../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setShowPassTxt } from "../../../redux/slice/SignInSlice";
import { ProgressBar } from '../../components/ProgressBar';
import { ImagesPath } from "../../../config/ImagesPath";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../../config/languages/LocalizedStrings";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import { useFormik } from "formik";

type Props = {
  signInBtn : (values : SignInFormValues) => void;
}

type SignInFormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.signInEmailErrorTxt),
  password: Yup.string()
    .required(strings.signInPassErrorTxt)
    .min(8, "Password cannot be less than eight characters.")
});

const initialFormValues: SignInFormValues = {
  email: "",
  password: ""
};

type signInNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SignInView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<signInNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const Strings = strings;
  const {
    signInTitle1,
    signInTitle2,
    signInEmailEdtHintTxt,
    signInPassEdtHintTxt,
    signInNoAccountTxt,
    signUpTxt,
    signInBtnTxt,
    signInEmailErrorTxt,
    signInPassErrorTxt
  } = Strings

  const sign_in = useSelector((state: RootState) => state.SignIn);
  const {
    signInLoad,
    showPassTxt,
  } = sign_in;

  const {
    signInBtn
  } = props

  const { handleChange,handleSubmit,errors,values,isValid } = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit : (values) => {
      signInBtn?.(values);
    },
  });

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.keyboardAvoidingView]}>
      <Screens statusBarColor={themedColors.primaryColor}>
        {signInLoad &&
          <View style={styles.signInLoadCont}>
            <ProgressBar />
          </View>}
        {!signInLoad &&
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.signInMainCont,{backgroundColor:themedColors.bgColor}]}>
              <View style={styles.signInLogoCont}>
                <Image
                  style={styles.signInLogo}
                  source={ImagesPath.splashLogo} />
              </View>
              <View style={styles.signInTitleTxtCont1}>
                <AppText
                  style={[styles.signInTitleTxt1, { color: themedColors.primaryTxtColor }]}
                  text={signInTitle1} />
              </View>
              <View style={styles.singInTitleTxtCont2}>
                <AppText
                  style={[styles.signInTitleTxt2, { color: themedColors.secondaryTxtColor }]}
                  text={signInTitle2} />
              </View>
              <View style={styles.signInEdtEmailCont}>
                <InputText
                  onChangeText={handleChange("email")}
                  valueToShowAtStart={initialFormValues.email}
                  edtStartIconVisible={true}
                  edtStartIconType={MaterialIcons}
                  edtStartIconName={"alternate-email"}
                  edtStartIconSize={18}
                  txtInputStyle={[styles.signInEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.signInEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                  hint={signInEmailEdtHintTxt} />
              </View>
              {errors.email &&
                <View style={styles.signInEdtErrorTxtCont}>
                  <AppText
                    style={[styles.signInEdtErrorTxt, { color: themedColors.red }]}
                    text={signInEmailErrorTxt} />
                </View>}
              <View style={styles.signInEdtPassCont}>
                <InputText
                  valueToShowAtStart={initialFormValues.password}
                  onChangeText={handleChange("password")}
                  edtStartIconType={MaterialCommunityIcons}
                  edtStartIconName={"lock-outline"}
                  edtStartIconSize={18}
                  edtStartIconVisible={true}
                  edtEndIconVisible={true}
                  edtEndIconSize={18}
                  secureTxtEntry={showPassTxt}
                  edtEndIconType={Ionicons}
                  edtEndIconName={showPassTxt ? 'ios-eye-off' : 'ios-eye'}
                  endIconClick={() => dispatch(setShowPassTxt(!showPassTxt))}
                  txtInputStyle={[styles.signInEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.signInEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                  hint={signInPassEdtHintTxt} />
              </View>
              {errors.password &&
                <View style={styles.signInEdtErrorTxtCont}>
                  <AppText
                    style={[styles.signInEdtErrorTxt, { color: themedColors.red }]}
                    text={signInPassErrorTxt} />
                </View>}
              <View style={styles.signInBtnCont}>
                <AppButton
                  onPress={handleSubmit}
                  btnContStyle={styles.signInBtnHeight}
                  text={signInBtnTxt} />
              </View>
              <View style={styles.signInNoAccountTxtCont}>
                <View>
                  <AppText
                    style={[styles.signInNoAccountTxt, { color: themedColors.secondaryTxtColor }]}
                    text={signInNoAccountTxt} />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp")}
                  activeOpacity={0.6}>
                  <AppText
                    style={[styles.signInNoAccountTxt, { color: themedColors.blue }]}
                    text={signUpTxt}/>
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
  signInLoadCont : {
    flex:1
  },
  signInMainCont : {
    flex:1,
    padding:SPACE._2xl,
  },
  signInLogoCont : {
    alignItems:'center'
  },
  signInLogo : {
    width: 180,
    height: 180
  },
  signInTitleTxtCont1 : {
    marginTop:SPACE._2xl,
  },
  singInTitleTxtCont2 : {
    marginTop:SPACE.sm
  },
  signInTitleTxt1 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xl
  },
  signInTitleTxt2 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  signInEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  signInEdtHeight : {
    height:45,
  },
  signInEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  signInEdtErrorTxtCont : {
    marginTop:SPACE.sm,
    alignItems : "flex-start"
  },
  signInEdtErrorTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE._2xs
  },
  signInEdtPassCont : {
    marginTop:SPACE.lg
  },
  signInBtnCont : {
    marginTop:SPACE._2xl,
  },
  signInBtnHeight : {
    height:45
  },
  signInNoAccountTxtCont : {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._4xl
  },
  signInNoAccountTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
  },
})
