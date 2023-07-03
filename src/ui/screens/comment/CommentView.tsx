import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Screens } from "../../components/Screens";
import { FlatList, StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS,SPACE } from "../../../config/Dimens";
import { CommentItem } from "./CommentItem";
import { AppButton } from "../../components/AppButton";
import { AddFoodReviewSheet } from "../../components/bottom_sheet/AddFoodReviewSheet";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { setShowFoodReviewSheet } from "../../../redux/slice/FoodReviewSlice";
import { postObj } from "../../../models/res_model/PostModel";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  submitReviewClick? : () => void,
  foodReviewSheetRef : any,
  postData : postObj,
  videoReviewLoad : boolean
}

type commNavProp = StackNavigationProp<AllScreenStackParamList>;


export const CommentView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<commNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {
    showFoodReviewSheet
  } = useSelector((state: RootState) => state.FoodReview);

  const Strings = strings;
  const {
    comHeadTitleTxt,
    comBtnTxt
  } = Strings

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
      <View style={[styles.comMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={comHeadTitleTxt}/>
        <View style={[styles.comSubCont,{backgroundColor:themedColors.bgColor}]}>
            <View style={[styles.comListCont,{backgroundColor:themedColors.bgColor}]}>
              <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <CommentItem
                    videoReviewLoad={props.videoReviewLoad}
                    postData={props.postData}
                    item={item} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>
          <View style={[styles.comBottomMainCont,{backgroundColor:themedColors.cardBgColor}]}>
            <AppButton
              onPress={() => {
                props.foodReviewSheetRef.current?.expand();
                dispatch(setShowFoodReviewSheet(true))}}
              text={comBtnTxt}/>
          </View>
          {showFoodReviewSheet && <AddFoodReviewSheet
            foodReviewSheetRef={props.foodReviewSheetRef}
            submitReviewClick={props.submitReviewClick} />}
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  comMainCont : {
    flex:1,
  },
  comSubCont : {
    flex:1,
  },
  comListCont : {
    flex: 1,
  },
  comBottomMainCont : {
    padding:SPACE._2lg,
    borderTopRightRadius:BORDER_RADIUS.lg,
    borderTopLeftRadius:BORDER_RADIUS.lg
  }
})
