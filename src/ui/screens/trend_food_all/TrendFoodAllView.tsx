import React from 'react';
import { FlatList, StyleSheet,View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { SPACE } from "../../../config/Dimens";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { homeFoodObj } from "../../../models/res_model/HomeModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { TrendFoodAllItem } from "./TrendFoodAllItem";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { FoodAllSkeleton } from "../../components/shimmer/FoodAllSkeleton";
import { NoDataTxt } from "../../components/NoDataTxt";
import strings from "../../../config/languages/LocalizedStrings";
import { NoMoreData } from "../../components/NoMoreData";

type Props = {
  trendFoodAllList : homeFoodObj[],
  onReachEnd : () => void,
}

type tfaNavProp = StackNavigationProp<AllScreenStackParamList>;

export const TrendFoodAllView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<tfaNavProp>();
  const { trendFoodAllList } = props
  const {
    trendFoodAllDataLoad,
    trendFoodAllFooterLoading,
    trendFoodAllNoMoreData
  } = useSelector((state: RootState) => state.TrendFoodAll);

  const Strings = strings;
  const {
    trendFoodAll,
    tfaNoDataTxt,
    tfaNoMoreDataTxt
  } = Strings

  function listSearchJobFooter()
  {
    return(
      <NoMoreData
        noDataTxt={tfaNoMoreDataTxt}
        loadData={trendFoodAllFooterLoading}
        showError={trendFoodAllNoMoreData}/>

    )
  }

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.tfaMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={trendFoodAll}/>
        {trendFoodAllDataLoad &&
          <View style={styles.tfaErrCont}>
            <FoodAllSkeleton />
          </View>}
        {!trendFoodAllDataLoad && trendFoodAllList.length === 0 &&
          <View style={styles.tfaErrCont}>
            <NoDataTxt
              noDataTxt={tfaNoDataTxt} />
          </View>}
        {!trendFoodAllDataLoad && trendFoodAllList.length > 0 &&
          <View style={styles.tfaList}>
            <FlatList
              data={trendFoodAllList}
              numColumns={2}
              onEndReachedThreshold={0.10}
              ListFooterComponent={() => listSearchJobFooter()}
              onEndReached={() => props.onReachEnd()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <TrendFoodAllItem
                  item={item} />}
              keyExtractor={(item, index) => index.toString()} />
          </View>}
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  tfaMainCont : {
    flex:1,
  },
  tfaList : {
    flex:1,
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md,
    marginTop:SPACE._2md,
    marginBottom:SPACE._2md
  },
  tfaErrCont : {
    flex:1
  }
})
