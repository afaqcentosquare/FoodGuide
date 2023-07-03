import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import strings from "../../../config/languages/LocalizedStrings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type termNavProp = StackNavigationProp<AllScreenStackParamList>;

export const TermAndConditionView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<termNavProp>();
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    termCondHeadTitle,
    termConditionTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.termMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={termCondHeadTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.termSubCont,{backgroundColor:themedColors.bgColor}]}>
            <View style={styles.termTxtCont}>
              <AppText
                style={[styles.termTxt,{color:themedColors.primaryTxtColor}]}
                text={termConditionTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  termMainCont : {
    flex:1,
  },
  termSubCont : {
    flex:1,
  },
  termTxtCont : {
    margin:SPACE._2lg
  },
  termTxt : {
    textAlign:'center',
    fontFamily:Fonts.medium,
    fontSize:FONT_SIZE.xs
  }
})
