import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import strings from "../../../config/languages/LocalizedStrings";
import { orderObj } from "../../../models/res_model/OrdersModel";
import { OrderDetailOrderItem } from "./OrderDetailOrderItem";

type Props = {
  orderData : orderObj
}

export const OrderDetailOrderLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { orderTotal } = useSelector((state: RootState) => state.OrderDetail);
  const Strings = strings;
  const {
    odolOrderCardTitleTxt,
    orderCatTitleTxt,
    orderNameTitleTxt,
    orderQuanTitleTxt,
    orderPriceTitleTxt,
    orderTotalTxt
  } = Strings

  return(
    <View style={[styles.odolMainCont,{backgroundColor:themedColors.cardBgColor,}]}>
      <View style={styles.odolCardCont}>
        <View>
          <AppText
            style={[styles.odolCardTitleTxt,{color:themedColors.primaryTxtColor,}]}
            text={odolOrderCardTitleTxt}/>
        </View>
        <View style={styles.odolOrderDetailCont}>
          <View style={styles.odolOrderCatTxtCont}>
            <AppText
              style={styles.odolOrderCatTxt}
              text={orderCatTitleTxt}/>
          </View>
          <View style={styles.odolOrderCatTxtCont}>
            <AppText
              style={styles.odolOrderCatTxt}
              text={orderNameTitleTxt}/>
          </View>
          <View style={styles.odolOrderCatTxtCont}>
            <AppText
              style={styles.odolOrderCatTxt}
              text={orderQuanTitleTxt}/>
          </View>
          <View style={styles.odolPriceTxtCont}>
            <AppText
              style={styles.odolOrderCatTxt}
              text={orderPriceTitleTxt}/>
          </View>
        </View>
      </View>
      <View style={styles.odolOrderListCont}>
        <FlatList
          data={props.orderData.orderList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item,index}) =>
            <OrderDetailOrderItem
              item={item}
              length={props.orderData.orderList?.length}
              index={index}/>}
          keyExtractor={(item, index) => index.toString()}/>
      </View>
      <View style={styles.odolTotalTxtCont}>
        <View>
          <AppText
            style={styles.odolTotalTxt}
            text={orderTotalTxt}/>
        </View>
        <View>
          <AppText
            style={styles.odolTotalTxt}
            text={orderTotal.toString()}/>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  odolMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  odolCardCont : {
    padding:SPACE._2lg
  },
  odolCardTitleTxt : {
    fontSize:FONT_SIZE.lg,
    fontFamily:Fonts.bold
  },
  odolOrderDetailCont : {
    flex:1,
    flexDirection:'row',
    marginTop:SPACE._2md
  },
  odolPriceTxtCont : {
    flex:1
  },
  odolOrderCatTxtCont : {
    flex:1,
    marginEnd:SPACE.md
  },
  odolOrderCatTxt : {
    fontFamily:Fonts.semi_bold ,
    fontSize:FONT_SIZE.xs,
    textAlign:'center',
  },
  odolOrderListCont : {
    flex:1
  },
  odolTotalTxtCont : {
    flexDirection:'row',
    marginEnd:SPACE._2lg,
    marginBottom:SPACE._2lg,
    justifyContent:'flex-end',
  },
  odolTotalTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  }
})
