import React from 'react';
import { Screens } from "../../components/Screens";
import { FlatList,StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS,SPACE } from "../../../config/Dimens";
import { AppButton } from "../../components/AppButton";
import { useAppDispatch } from "../../../redux";
import { CheckoutItem } from "./CheckoutItem";
import strings from "../../../config/languages/LocalizedStrings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {
  checkoutBtn : () => void
}

type checkOutNavProp = StackNavigationProp<AllScreenStackParamList>;

export const CheckoutView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<checkOutNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const Strings = strings;
  const {
    checkOutTitle,
    coBtnTxt
  } = Strings

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
      <View style={[styles.coMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={checkOutTitle}/>
        <View style={styles.coOrderListCont}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index}) => <CheckoutItem item={item}/>}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
        <View style={[styles.coFooterMainCont,{backgroundColor:themedColors.cardBgColor}]}>
          <View style={styles.coFooterBtnCont}>
            <AppButton
              onPress={props.checkoutBtn}
              text={coBtnTxt}/>
          </View>
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  coMainCont : {
    flex:1,
  },
  coOrderListCont : {
    flex:1,
  },
  coFooterMainCont : {
    marginTop:SPACE._2lg,
    padding:SPACE._2lg,
    borderTopRightRadius:BORDER_RADIUS.lg,
    borderTopLeftRadius:BORDER_RADIUS.lg
  },
  coFooterBtnCont : {
    marginTop:SPACE.xs
  }
})
