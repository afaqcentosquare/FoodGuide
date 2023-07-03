import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { CheckoutOrderItem } from "./CheckoutOrderItem";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts, GILROY } from "../../../config";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

export const CheckoutOrderLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { checkoutOrderList } = useSelector((state: RootState) => state.Checkout);
  const { addToCartList } = useSelector((state: RootState) => state.AddToCart);
  const Strings = strings;
  const {
    coOrderTitleTxt,
    coOrderCatTxt,
    coOrderNameTxt,
    coOrderQuanTxt,
    coOrderPriceTxt
  } = Strings

  return(
    <View style={[styles.colMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.colEdtMainCont}>
        <View>
          <AppText
            style={[styles.colOrderTitleTxt,{color:themedColors.primaryTxtColor}]}
            text={coOrderTitleTxt}/>
        </View>
        <View style={styles.colEdtSubCont}>
          <View style={styles.colTableCont}>
            <AppText
              style={[styles.colTableTxt,{color:themedColors.primaryTxtColor}]}
              text={coOrderCatTxt}/>
          </View>
          <View style={styles.colTableCont}>
            <AppText
              style={[styles.colTableTxt,{color:themedColors.primaryTxtColor}]}
              text={coOrderNameTxt}/>
          </View>
          <View style={styles.colTableCont}>
            <AppText
              style={[styles.colTableTxt,{color:themedColors.primaryTxtColor}]}
              text={coOrderQuanTxt}/>
          </View>
          <View style={styles.colTableCont}>
            <AppText
              style={[styles.colTableTxt,{color:themedColors.primaryTxtColor}]}
              text={coOrderPriceTxt}/>
          </View>
        </View>
      </View>
      <View style={styles.colListCont}>
        <FlatList
          data={addToCartList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item,index}) =>
            <CheckoutOrderItem
              item={item}
              length={checkoutOrderList?.length}
              index={index}/>}
          keyExtractor={(item, index) => index.toString()}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  colMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  colEdtMainCont : {
    padding:SPACE._2lg
  },
  colOrderTitleTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.lg,
  },
  colEdtSubCont : {
    flex:1,
    flexDirection:'row',
    marginTop:SPACE._2md
  },
  colTableCont : {
    flex:1,
    marginEnd:SPACE.md
  },
  colTableTxt : {
    fontSize:FONT_SIZE.xs,
    textAlign:'center',
  },
  colListCont : {
    flex:1
  }
})
