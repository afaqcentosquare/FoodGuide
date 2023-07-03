import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StyleSheet, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import strings from "../../../config/languages/LocalizedStrings";
import { orderObj } from "../../../models/res_model/OrdersModel";

type Props = {
  orderData : orderObj
}

export const OrderDetailHeaderLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {
    orderNum,
    orderDate,
    orderPhoneNum,
    orderAddress,
    orderName
  } = props.orderData
  const Strings = strings;
  const {
    orderNoTxt,
    orderNameTxt,
    orderAddresTxt,
    orderPhoneTxt,
    orderDateTxt,
  } = Strings

  return(
    <View style={[styles.odhlMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.odhlSubCont}>
        <View style={styles.odhlTxtMainCont}>
          <View>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.primaryTxtColor}]}
              text={orderNoTxt}/>
          </View>
          <View style={styles.odhlSubTxtCont}>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.secondaryTxtColor}]}
              text={orderNum.toString()}/>
          </View>
        </View>
        <View style={[styles.odhlTxtMainCont,{marginTop:SPACE._2xs}]}>
          <View>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.primaryTxtColor}]}
              text={orderNameTxt}/>
          </View>
          <View style={styles.odhlSubTxtCont}>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.secondaryTxtColor}]}
              text={orderName}/>
          </View>
        </View>
        <View style={[styles.odhlTxtMainCont,{marginTop:SPACE._2xs}]}>
          <View>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.primaryTxtColor}]}
              text={orderAddresTxt}/>
          </View>
          <View style={styles.odhlSubTxtCont}>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.secondaryTxtColor}]}
              text={orderAddress}/>
          </View>
        </View>
        <View style={[styles.odhlTxtMainCont,{marginTop:SPACE._2xs}]}>
          <View>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.primaryTxtColor}]}
              text={orderPhoneTxt}/>
          </View>
          <View style={styles.odhlSubTxtCont}>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.secondaryTxtColor}]}
              text={orderPhoneNum}/>
          </View>
        </View>
        <View style={[styles.odhlTxtMainCont,{marginTop:SPACE._2xs}]}>
          <View>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.primaryTxtColor}]}
              text={orderDateTxt}/>
          </View>
          <View style={styles.odhlSubTxtCont}>
            <AppText
              style={[styles.odhlTitleTxt,{color:themedColors.secondaryTxtColor}]}
              text={orderDate}/>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  odhlMainCont : {
    marginTop:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2lg
  },
  odhlSubCont : {
    flex:1,
  },
  odhlTxtMainCont : {
    flex:1,
    flexDirection:'row'
  },
  odhlTitleTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xs,
  },
  odhlSubTxtCont : {
    flex:1,
  }
})
