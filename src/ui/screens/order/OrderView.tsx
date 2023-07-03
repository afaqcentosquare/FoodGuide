import React from "react";
import { Screens } from "../../components/Screens";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS } from "../../../config/Dimens";
import Strings from "../../../config/strings";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { OrderItems } from "./OrderItems";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type orderNavProp = StackNavigationProp<AllScreenStackParamList>;

export const OrderView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<orderNavProp>();
  const {themedColors} = usePreferredTheme();
  const orderHeadTxt = Strings.header;
  const { orderDataList } = useSelector((state: RootState) => state.Order);

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.orderMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnHeaderCont={styles.orderHeadCont}
          backBtnVisible={true}
          title={orderHeadTxt.orderHeadTxt}/>
        <View style={[styles.orderListCont,{backgroundColor:themedColors.bgColor}]}>
          <FlatList
            data={orderDataList}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <OrderItems
                index={index}
                length={orderDataList?.length}
                item={item} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  orderMainCont : {
    flex:1,
  },
  orderHeadCont : {
    borderBottomRightRadius:BORDER_RADIUS.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  orderListCont : {
    flex:1,
  }
})
