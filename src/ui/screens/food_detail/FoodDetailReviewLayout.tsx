import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { FoodReviewItem } from "./FoodReviewItem";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { AppText } from "../../components/AppText";
import { Fonts, GILROY } from "../../../config";
import { AppButton } from "../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { foodObj } from "../../../models/res_model/MenuModel";
import { NoDataTxt } from "../../components/NoDataTxt";

type Props = {
  foodInfo : foodObj
}

type addToCartNavProp = StackNavigationProp<AllScreenStackParamList>;

export const FoodDetailReviewLayout = React.memo<Props>((props) =>
{
  const { foodDetailReviewLoad } = useSelector((state: RootState) => state.FoodDetail);
  const {foodReviewList,foodReviewTxt} = useSelector((state: RootState) => state.FoodReview);
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<addToCartNavProp>();

  return(
    <View style={[styles.fdrlMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.fdrlTitleCont}>
        <View style={styles.fdrlTitleTxtCont}>
          <AppText
            style={[styles.fdrlTitleTxt, { color: themedColors.primaryTxtColor }]}
            text={"Reviews"} />
        </View>
        <View>
          <AppButton
            onPress={() => navigation.navigate('FoodReviewDetail',{foodInfo : props.foodInfo})}
            btnContStyle={styles.fdrlBtnCont}
            btnTxtStyle={styles.fdrlBtnTxt}
            text={"Add Review"}/>
        </View>
      </View>
      {!foodDetailReviewLoad && foodReviewList.length === 0 &&
        <View style={{marginBottom:SPACE.xl}}>
          <NoDataTxt
            noMoreDataVisible={true}
            noDataTxt={"No Reviews Yet"} />
        </View>}
      {!foodDetailReviewLoad && foodReviewList.length > 0 &&
        <View style={styles.fdrlList}>
          <FlatList
            data={foodReviewList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <FoodReviewItem
                item={item}
                length={foodReviewList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}

    </View>
  )
})

const styles = StyleSheet.create({
  fdrlMainCont : {
    marginTop:SPACE.md,
    marginBottom:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,
  },
  fdrlTitleCont : {
    alignItems:'center',
    justifyContent:'center',
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    paddingTop:SPACE._2lg,
    flexDirection:'row'
  },
  fdrlTitleTxtCont : {
    flex:1,
    alignItems:'flex-start'
  },
  fdrlTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  fdrlBtnCont : {
    height:25,
    paddingStart:SPACE.md,
    paddingEnd:SPACE.md
  },
  fdrlBtnTxt : {
    fontSize:FONT_SIZE._3xs
  },
  fdrlList : {
    flex:1,
    paddingBottom:SPACE._2md,
  },
})
