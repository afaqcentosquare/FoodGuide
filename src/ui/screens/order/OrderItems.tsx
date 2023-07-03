import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { orderObj } from "../../../models/res_model/OrdersModel";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../../config";

type Props = {
  item : orderObj,
  length : number,
  index : number
}

type orderNavProp = StackNavigationProp<AllScreenStackParamList>;

export const OrderItems = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<orderNavProp>();

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetail',{orderData : props.item,orderTotal : props.item.orderTotal})}
      activeOpacity={0.6}
      style={[styles.orderItemMainCont,{
        marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs,
        backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.orderTxtCont}>
        <View>
          <AppText
            style={[styles.orderNoTxt,{color:themedColors.primaryTxtColor}]}
            text={"Order No : " + props.item.orderNum}/>
        </View>
        <View style={styles.orderDateTxtCont}>
          <AppText
            style={[styles.orderDateTxt,{color:themedColors.secondaryTxtColor}]}
            text={"Order Date : " + props.item.orderDate}/>
        </View>
      </View>
      <View style={styles.orderIconMainCont}>
        <View style={[styles.orderIconSubCont,{backgroundColor:themedColors.iconBgColor}]}>
          <View style={styles.orderIconCont}>
            <Ionicons
              size={18}
              color={themedColors.primaryIconColor}
              name={"ios-chevron-forward-outline"}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  orderItemMainCont : {
    flexDirection:'row',
    marginEnd:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2lg,
    marginStart:SPACE._2lg,
  },
  orderTxtCont : {
    flex:1
  },
  orderNoTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.lg,
  },
  orderDateTxtCont : {
    marginTop:SPACE.xs
  },
  orderDateTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  },
  orderIconMainCont : {
    justifyContent:'center'
  },
  orderIconSubCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  orderIconCont : {
    height:30,
    width:30,
    justifyContent:'center',
    alignItems:'center'
  }
})
