import React from "react";
import { Screens } from "../../components/Screens";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS } from "../../../config/Dimens";
import Strings from "../../../config/strings";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { OrderDetailItem } from "./OrderDetailItem";
import { orderObj } from "../../../models/res_model/OrdersModel";

type Props = {
  orderData : orderObj,
}

export const OrderDetailView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const orderHeadTxt = Strings.header;
  const { orderDataList } = useSelector((state: RootState) => state.Order);

  const data = [
    {
      id : 0,
      name : 'header'
    },
    {
      id : 1,
      name : 'order'
    }
  ]

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
        <BackBtnHeader
          backBtnHeaderCont={{borderBottomRightRadius:BORDER_RADIUS.xl,borderBottomLeftRadius:BORDER_RADIUS.xl}}
          backBtnVisible={true}
          title={"Order Detail"}/>
        <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index}) =>
              <OrderDetailItem
                orderData={props.orderData}
                item={item}/>}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({

})
