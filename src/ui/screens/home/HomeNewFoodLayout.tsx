import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { SPACE } from "../../../config/Dimens";
import { CardTitleTxt } from "../../components/CardTitleTxt";
import { Strings } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { HomeNewFoodItem } from "./home_items/HomeNewFoodItem";
import { HomeTrendSkeleton } from "../../components/shimmer/home/HomeTrendSkeleton";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

type homeCatNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeNewFoodLayout = React.memo<Props>((props) =>
{
  const navigation = useNavigation<homeCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {
    homeNewFoodDataList,
    homeNewFoodLoad
  } = useSelector((state: RootState) => state.Home);
  const Strings = strings;
  const {
    homeNewFoodTitle,
    seeAllTxt
  } = Strings

  return(
    <View>
      <CardTitleTxt
        seeAllClick={() => navigation.navigate('NewFoodAll')}
        titleTxt={homeNewFoodTitle}
        seeAllTxt={seeAllTxt}/>
      {homeNewFoodLoad &&
        <HomeTrendSkeleton/>}
      {homeNewFoodDataList.length > 0 &&
        <View>
          <FlatList
            data={homeNewFoodDataList.slice(0,4)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <HomeNewFoodItem
                item={item}
                length={homeNewFoodDataList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})
