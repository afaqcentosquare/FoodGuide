import React from 'react';
import { Screens } from "../../components/Screens";
import { FlatList, StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { AppButton } from "../../components/AppButton";
import { FoodReviewSkeleton } from "../../components/shimmer/FoodReviewSkeleton";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { AddResReviewItem } from "./AddResReviewItem";
import { AddResReviewSheet } from "../../components/bottom_sheet/AddResReviewSheet";
import { setShowResReviewSheet } from "../../../redux/slice/ResReviewSlice";
import { NoDataTxt } from "../../components/NoDataTxt";
import strings from "../../../config/languages/LocalizedStrings";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";

type Props = {
  resReviewSheetRef : any,
  submitResReviewClick? : () => void,
}

type addResNavProp = StackNavigationProp<AllScreenStackParamList>;


export const AddResReviewView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addResNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {
    resReviewList,
    resReviewLoad,
    showResReviewSheet
  } = useSelector((state: RootState) => state.ResReview);

  const Strings = strings;
  const {
    addResHeadTitle,
    arrNoDataTxt,
    arrWriteReviewBtnTxt
  } = Strings;

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.arrMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={addResHeadTitle}/>
        {resReviewLoad &&
          <View style={styles.arrLoadCont}>
            <FoodReviewSkeleton />
          </View>}
        {!resReviewLoad && resReviewList.length === 0 &&
          <View style={styles.arrNoDataTxtCont}>
            <NoDataTxt
              noDataTxt={arrNoDataTxt}/>
          </View>}
        {!resReviewLoad && resReviewList.length > 0 &&
          <View style={styles.arrReviewListCont}>
            <FlatList
              data={resReviewList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <AddResReviewItem
                  length={resReviewList?.length}
                  index={index}
                  item={item} />}
              keyExtractor={(item, index) => index.toString()} />
          </View>}
        <View style={[styles.arrBtnMainCont,{backgroundColor:themedColors.cardBgColor}]}>
          <AppButton
            onPress={() => {
              props.resReviewSheetRef.current?.expand();
              dispatch(setShowResReviewSheet(true))}}
            btnContStyle={styles.arrBtnCont}
            text={arrWriteReviewBtnTxt}/>
        </View>
        {showResReviewSheet &&
          <AddResReviewSheet
            resReviewSheetRef={props.resReviewSheetRef}
            submitResReviewClick={props.submitResReviewClick} />}
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  arrMainCont : {
    flex:1,
  },
  arrLoadCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  arrNoDataTxtCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  arrBtnMainCont : {
    padding:SPACE._2lg,
    borderTopLeftRadius:BORDER_RADIUS.lg,
    borderTopRightRadius:BORDER_RADIUS.lg,
  },
  arrReviewListCont : {
    flex:1
  },
  arrBtnCont : {
    height:40
  }
})
