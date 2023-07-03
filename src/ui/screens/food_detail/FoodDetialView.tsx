import React from 'react';
import { FlatList,StyleSheet,View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { AppButton } from "../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { foodObj } from "../../../models/res_model/MenuModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { NoInternetConnection } from '../../components/NoInternetConnection';
import { FoodDetailItem } from "./FoodDetailItem";
import { FoodDetailHeader } from "../../components/headers/FoodDetailHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  foodInfo : foodObj,
  addToCartBtn : () => void,
  isFoodAdded : boolean
}

type addToCartNavProp = StackNavigationProp<AllScreenStackParamList>;

export const FoodDetailView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addToCartNavProp>();
  const {themedColors} = usePreferredTheme();
  const { resId,foodPrice } = props.foodInfo
  const { foodDetailCheckInternet } = useSelector((state: RootState) => state.FoodDetail);

  const data = [
    {
      id : 0,
      name : 'header'
    },
    {
      id : 1,
      name : 'review'
    }
  ]

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.fdMainCont,{backgroundColor:themedColors.bgColor}]}>
        <FoodDetailHeader
          resId={resId}/>
        {!foodDetailCheckInternet &&
          <View style={styles.fdMainCont}>
            <NoInternetConnection />
          </View>}
        {foodDetailCheckInternet &&
          <View style={styles.fdMainCont}>
            <View style={styles.fdResList}>
              <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <FoodDetailItem
                    item={item}
                    foodInfo={props.foodInfo} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>
            <View style={[styles.fdFooterMainCont,{backgroundColor: themedColors.cardBgColor}]}>
              <View style={styles.fdFooterPriceMainCont}>
                <View style={styles.fdFooterPriceSubCont}>
                  <View style={[styles.fdFooterPriceIconCont,{backgroundColor: themedColors.iconBgColor}]}>
                    <FontAwesome
                      color={themedColors.primaryIconColor}
                      name={"money"} />
                  </View>
                  <View style={styles.fdPriceIconTxtCont}>
                    <AppText
                      style={[styles.fdPriceIconTxt,{color:themedColors.primaryTxtColor}]}
                      text={foodPrice != "" ? "RS : " + foodPrice.toString() : "RS : 0.00"} />
                  </View>
                </View>
              </View>
              <View style={styles.fdCartBtnCont}>
                <View style={{ flex: 1 }}>
                  <AppButton
                    btnContStyle={styles.fdCartBtn}
                    onPress={props.addToCartBtn}
                    /*onPress={props.addToCartBtn}*/
                    text={"ADD TO CART"} />
                </View>
                {/* <View style={{flex: 1}}>
                <AppButton
                  btnContStyle={styles.fdCartBtn}
                  onPress={() => navigation.navigate("AddToCart")}
                  text={"View To Cart"} />
              </View>*/}
              </View>
            </View>
          </View>}
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  fdMainCont : {
    flex:1,
  },
  fdListCont : {
    flex: 1
  },
  fdFooterMainCont : {
    elevation: 12,
    padding: SPACE._2lg,
    borderTopRightRadius: BORDER_RADIUS.xl,
    borderTopLeftRadius: BORDER_RADIUS.xl,
  },
  fdFooterPriceMainCont : {
    flexDirection: "row"
  },
  fdFooterPriceSubCont : {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  fdFooterPriceIconCont : {
    borderRadius: BORDER_RADIUS._8xl,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
  fdPriceIconTxtCont : {
    flex: 1,
    marginStart: SPACE._2lg,
    alignItems:'flex-start'
  },
  fdPriceIconTxt : {
    fontFamily: Fonts.semi_bold,
    fontSize: FONT_SIZE.xl
  },
  fdCartBtnCont : {
    marginTop: SPACE._2lg,
    flexDirection: "row"
  },
  fdCartBtn : {
    height: 40,
    marginEnd: SPACE.sm
  },
  fdResList : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
})
