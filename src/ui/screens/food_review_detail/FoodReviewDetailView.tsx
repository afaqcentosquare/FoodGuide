import React from 'react';
import { Screens } from '../../components/Screens';
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { FoodReviewDetailItem } from "./FoodReviewDetailItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { FoodReviewSkeleton } from "../../components/shimmer/FoodReviewSkeleton";
import { AppButton } from "../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { foodObj } from "../../../models/res_model/MenuModel";
import { AddFoodReviewSheet } from "../../components/bottom_sheet/AddFoodReviewSheet";
import { setShowFoodReviewSheet } from "../../../redux/slice/FoodReviewSlice";
import { NoDataTxt } from '../../components/NoDataTxt';

type Props = {
  foodInfo : foodObj,
  submitReviewClick? : () => void,
  foodReviewSheetRef : any,
}

type addFoodReviewNavProp = StackNavigationProp<AllScreenStackParamList>;

export const FoodReviewDetailView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addFoodReviewNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {foodReviewList,showFoodReviewSheet,foodReviewLoad} = useSelector((state: RootState) => state.FoodReview);

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.frdMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={"Food Reviews"}/>
        {foodReviewLoad &&
          <View style={styles.frdErrorCont}>
            <FoodReviewSkeleton />
          </View>}
        {!foodReviewLoad && foodReviewList.length === 0 &&
          <View style={styles.frdErrorCont}>
            <NoDataTxt
              noDataTxt={"No Reviews Yet"}/>
          </View>}
        {!foodReviewLoad && foodReviewList.length > 0 ?
          <View style={styles.frdReviewListCont}>
            <FlatList
              data={foodReviewList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <FoodReviewDetailItem
                  length={foodReviewList?.length}
                  index={index}
                  item={item} />}
              keyExtractor={(item, index) => index.toString()} />
          </View> : null}
        <View style={[styles.frdFooterCont,{backgroundColor:themedColors.cardBgColor}]}>
          <AppButton
            onPress={() => {
              props.foodReviewSheetRef.current?.expand();
              dispatch(setShowFoodReviewSheet(true))}}
            btnContStyle={styles.frdFooterBtnCont}
            text={"Write Review "}/>
        </View>
        {showFoodReviewSheet &&
          <AddFoodReviewSheet
            foodReviewSheetRef={props.foodReviewSheetRef}
            submitReviewClick={props.submitReviewClick} />}
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  frdMainCont : {
    flex:1,
  },
  frdReviewListCont : {
    flex:1
  },
  frdErrorCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  frdFooterCont : {
    padding:SPACE._2lg,
    borderTopLeftRadius:BORDER_RADIUS.lg,
    borderTopRightRadius:BORDER_RADIUS.lg,
  },
  frdFooterBtnCont : {
    height:40
  }
})

