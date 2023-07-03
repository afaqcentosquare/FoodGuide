import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts, GILROY } from "../../../config";
import { InputText } from "../../components/InputText";
import {
  setCheckoutAddress,
  setCheckoutAlternateNum, setCheckoutDeliveryInstr,
  setCheckoutName,
  setCheckoutPhoneNum,
} from "../../../redux/slice/CheckOutSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

export const CheckoutHeaderLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {
    checkoutName,
    checkoutPhoneNum,
    checkoutAddress,
    checkoutAlternateNum,
    checkoutDeliveryInstr,
    checkoutOrderList
  } = useSelector((state: RootState) => state.Checkout);
  const Strings = strings;
  const {
    chlTitleTxt1,
    chlTitleTxt2,
    chlNameHintTxt,
    chlNumHintTxt,
    chlAlterNumHintTxt,
    chlDelAddHintTxt,
    chlDelInsHintTxt
  } = Strings

  return(
    <View style={styles.chlMainCont}>
      <View style={styles.chlTitleTxt1Cont}>
        <AppText
          style={[styles.chlTitleTxt1,{color:themedColors.primaryTxtColor}]}
          text={chlTitleTxt1}/>
      </View>
      <View style={styles.chlTitleTxt2Cont}>
        <AppText
          style={[styles.chlTitleTxt2,{color:themedColors.secondaryTxtColor}]}
          text={chlTitleTxt2}/>
      </View>
      <View style={styles.chlEdtCont}>
        <InputText
          valueToShowAtStart={checkoutName}
          onChangeText={(e) => dispatch(setCheckoutName(e))}
          txtInputStyle={styles.chlEdtTxt}
          txtInputContStyle={[styles.chlEdtTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
          hint={chlNameHintTxt}/>
      </View>
      <View style={styles.chlEdtTxtMainCont}>
        <InputText
          valueToShowAtStart={checkoutPhoneNum}
          onChangeText={(e) => dispatch(setCheckoutPhoneNum(e))}
          keyboardType={"numeric"}
          txtInputStyle={styles.chlEdtTxt}
          txtInputContStyle={[styles.chlEdtTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
          hint={chlNumHintTxt}/>
      </View>
      <View style={styles.chlEdtTxtMainCont}>
        <InputText
          valueToShowAtStart={checkoutAlternateNum}
          onChangeText={(e) => dispatch(setCheckoutAlternateNum(e))}
          keyboardType={"numeric"}
          txtInputStyle={styles.chlEdtTxt}
          txtInputContStyle={[styles.chlEdtTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
          hint={chlAlterNumHintTxt}/>
      </View>
      <View style={styles.chlEdtTxtMainCont}>
        <InputText
          valueToShowAtStart={checkoutAddress}
          onChangeText={(e) => dispatch(setCheckoutAddress(e))}
          txtInputStyle={styles.chlEdtTxt}
          txtInputContStyle={[styles.chlEdtTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
          hint={chlDelAddHintTxt}/>
      </View>
      <View style={styles.chlEdtTxtMainCont}>
        <InputText
          valueToShowAtStart={checkoutDeliveryInstr}
          onChangeText={(e) => dispatch(setCheckoutDeliveryInstr(e))}
          txtInputStyle={styles.chlEdtTxt}
          txtInputContStyle={[styles.chlEdtTxtCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
          hint={chlDelInsHintTxt}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  chlMainCont : {
    flex:1
  },
  chlTitleTxt1Cont : {
    marginTop:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  chlTitleTxt1 : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl
  },
  chlTitleTxt2Cont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  chlTitleTxt2 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  chlEdtCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2xl
  },
  chlEdtTxtMainCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg
  },
  chlEdtTxtCont : {
    height:45,
  },
  chlEdtTxt : {
    fontSize:FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold
  }
})
