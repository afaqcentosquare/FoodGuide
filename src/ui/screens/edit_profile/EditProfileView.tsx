import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { InputText } from "../../components/InputText";
import { AppButton } from "../../components/AppButton";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import { Fonts } from "../../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { setEditUserLoc, setEditUserName, setEditUserNum } from "../../../redux/slice/EditUserSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  updateUserBtn : () => void,
  editUserImgClick : () => void
}

type epNavProp = StackNavigationProp<AllScreenStackParamList>;

export const EditProfileView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<epNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const editUser = useSelector((state: RootState) => state.EditUser);
  const {editUserNum,editUserImg,editUserLoc,editUserName} = editUser
  const Strings = strings;
  const {
    editProfileTitle,
    epNameHintTxt,
    epLocHintTxt,
    epNumHintTxt,
    epBtnTxt
  } = Strings

  return(
    <Screens
      statusBarColor={themedColors.primaryColor}>
      <View style={[styles.epMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={editProfileTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.edtSubCont}>
            <TouchableOpacity
              onPress={props.editUserImgClick}
              style={styles.epImgCont}>
              {editUserImg != '' ?
                <View>
                  <Image
                    style={styles.epImg}
                    source={{ uri: editUserImg }} />
                  <View>
                    <View style={[styles.addIconCont,{backgroundColor:themedColors.blue}]}>
                      <Ionicons
                        color={themedColors.white}
                        size={18}
                        name={"ios-add"} />
                    </View>
                  </View>
                </View> :
                <DefaultUserImg showAddIcon={true}/>}
            </TouchableOpacity>
            <View style={styles.epInputMainCont}>
              <View style={styles.epInputSubCont}>
                <InputText
                  valueToShowAtStart={editUserName}
                  onChangeText={(e) => dispatch(setEditUserName(e))}
                  txtInputStyle={styles.epInputTxt}
                  txtInputContStyle={[styles.epInputTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={epNameHintTxt}/>
              </View>
              <View style={styles.epInputSubCont}>
                <InputText
                  valueToShowAtStart={editUserLoc}
                  onChangeText={(e) => dispatch(setEditUserLoc(e))}
                  txtInputStyle={styles.epInputTxt}
                  txtInputContStyle={[styles.epInputTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={epLocHintTxt}/>
              </View>
              <View style={styles.epInputSubCont}>
                <InputText
                  valueToShowAtStart={editUserNum}
                  onChangeText={(e) => dispatch(setEditUserNum(e))}
                  txtInputStyle={styles.epInputTxt}
                  txtInputContStyle={[styles.epInputTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={epNumHintTxt}/>
              </View>
              <View style={styles.epBtnCont}>
                <AppButton
                  onPress={props.updateUserBtn}
                  text={epBtnTxt}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  epMainCont : {
    flex:1,
  },
  edtSubCont : {
    flex:1,
    marginTop:SPACE._2xl
  },
  addIconCont : {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
    width: 30,
    height: 30,
    position: "absolute",
    right:0,
    bottom:0
  },
  epImgCont : {
    justifyContent:'center',
    alignItems:'center'
  },
  epImg : {
    width:110,
    height:110,
    borderRadius:BORDER_RADIUS._8xl
  },
  epInputMainCont : {
    marginTop:SPACE._2xl
  },
  epInputSubCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg
  },
  epInputTxtCont : {
    height:45
  },
  epInputTxt : {
    fontSize:FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
  },
  epDesInputCont : {
    borderRadius:BORDER_RADIUS.lg,
    height:150,
  },
  epDesInput : {
    paddingStart:SPACE._2md,
    paddingTop:SPACE._2lg,
    alignSelf:'flex-start'
  },
  epBtnCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._4xl
  }
})
