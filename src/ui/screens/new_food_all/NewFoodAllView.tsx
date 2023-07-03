import React from 'react';
import { FlatList,StyleSheet,View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { SPACE } from "../../../config/Dimens";
import { NewFoodAllItem } from "./NewFoodAllItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { homeFoodObj } from "../../../models/res_model/HomeModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { FoodAllSkeleton } from "../../components/shimmer/FoodAllSkeleton";
import { NoDataTxt } from "../../components/NoDataTxt";
import strings from "../../../config/languages/LocalizedStrings";
import { NoMoreData } from "../../components/NoMoreData";

type Props = {
  newFoodAllList : homeFoodObj[],
  onReachEnd : () => void,
}

type nfaNavProp = StackNavigationProp<AllScreenStackParamList>;

export const NewFoodAllView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<nfaNavProp>();
  const { newFoodAllList } = props
  const {
    newFoodAllDataLoad,
    newFoodAllFooterLoading,
    newFoodAllNoMoreData,
  } = useSelector((state: RootState) => state.NewFoodAll);

  const Strings = strings;
  const {
    nfsHeadTitle,
    nfsNoMoreData,
    nfaNoDataTxt
  } = Strings

  function listSearchJobFooter()
  {
    return(
      <NoMoreData
        noDataTxt={nfsNoMoreData}
        loadData={newFoodAllFooterLoading}
        showError={newFoodAllNoMoreData}/>
    )
  }

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.nfaMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={nfsHeadTitle}/>
        {newFoodAllDataLoad &&
          <View style={styles.nfaErrCont}>
            <FoodAllSkeleton />
          </View>}
        {!newFoodAllDataLoad && newFoodAllList.length === 0 &&
          <View style={styles.nfaErrCont}>
            <NoDataTxt
              noDataTxt={nfaNoDataTxt} />
          </View>}
        {!newFoodAllDataLoad && newFoodAllList.length > 0 &&
          <View style={styles.nfaResList}>
            <FlatList
              data={newFoodAllList}
              numColumns={2}
              onEndReachedThreshold={0.10}
              ListFooterComponent={() => listSearchJobFooter()}
              onEndReached={() => props.onReachEnd()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <NewFoodAllItem
                  item={item} />}
              keyExtractor={(item, index) => index.toString()} />
          </View>}
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  nfaMainCont : {
    flex:1,
  },
  nfaResList : {
    flex:1,
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md,
    marginTop:SPACE._2md,
    marginBottom:SPACE._2md
  },
  nfaErrCont : {
    flex:1
  }
})
