import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import strings from "../../../config/languages/LocalizedStrings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type policyNavProp = StackNavigationProp<AllScreenStackParamList>;

export const PrivacyPolicyView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<policyNavProp>();
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    ppHeadTitle,
    policyTxt
  } = Strings


  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.policyMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={ppHeadTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.policySubCont,{backgroundColor:themedColors.bgColor}]}>
            <View style={styles.policyTxtCont}>
              <AppText
                style={[styles.policyTxt,{color:themedColors.primaryTxtColor}]}
                text={policyTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  policyMainCont : {
    flex:1,
  },
  policySubCont : {
    flex:1,
  },
  policyTxtCont : {
    margin:SPACE._2lg
  },
  policyTxt : {
    textAlign:'center',
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  }
})
