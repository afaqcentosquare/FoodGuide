import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { AddToCartItem } from "./AddToCartItem";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { AppButton } from '../../components/AppButton';
import { AddToCartPriceTxt } from "../../components/AddToCartPriceTxt";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { AddToCartSkeleton } from "../../components/shimmer/AddToCartSkeleton";
import { NoDataTxt } from "../../components/NoDataTxt";
import { NoInternetConnection } from "../../components/NoInternetConnection";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

type atcNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddToCartView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<atcNavProp>();
  const {themedColors} = usePreferredTheme();
  const {
    addToCartList,
    addToCartTotal,
    addToCartLoad,
    addToCartCheckNetwork,
  } = useSelector((state: RootState) => state.AddToCart);

  const Strings = strings;
  const {
    total,
    addToCartTitle,
    atcBtnTxt,
    atcNoDataTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.atcSubCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={addToCartTitle}/>
        {addToCartCheckNetwork && addToCartLoad &&
          <View style={styles.atcLoadCont}>
            <AddToCartSkeleton />
          </View>}
        {addToCartCheckNetwork && !addToCartLoad && addToCartList.length === 0  &&
          <View style={styles.atcErrorCont}>
            <NoDataTxt
              reloadBtnVisible={false}
              noDataTxt={atcNoDataTxt} />
          </View>}
        {!addToCartLoad && !addToCartCheckNetwork &&
          <View style={styles.atcErrorCont}>
            <NoInternetConnection />
          </View> }
        {addToCartCheckNetwork && addToCartList.length > 0 &&
          <View style={styles.atcListMainCont}>
            <View style={styles.atcListSubCont}>
              <FlatList
                data={addToCartList}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <AddToCartItem
                    item={item}
                    length={addToCartList?.length}
                    index={index} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>
            <View style={[styles.atcBottomMainCont,{backgroundColor:themedColors.cardBgColor}]}>
              <AddToCartPriceTxt
                priceTitleTxt={total}
                priceTxt={"Rs. " + addToCartTotal + ".00"}/>
              <View style={styles.atcBtnMainCont}>
                <AppButton
                  btnContStyle={styles.atcBtnCont}
                  onPress={() => navigation.navigate('Checkout',{orderList : addToCartList})}
                  text={atcBtnTxt}/>
              </View>
            </View>
          </View>}
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  atcBottomMainCont : {
    borderTopRightRadius:BORDER_RADIUS.xl,
    borderTopLeftRadius:BORDER_RADIUS.xl,
    padding:SPACE._2lg
  },
  atcLoadCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  atcErrorCont : {
    flex:1
  },
  atcSubCont : {
    flex:1,
  },
  atcBtnMainCont : {
    marginTop:SPACE._2lg
  },
  atcBtnCont : {
    height:45
  },
  atcListMainCont : {
    flex:1,
  },
  atcListSubCont : {
    flex: 1
  }
})
