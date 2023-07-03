import React from "react";
import { FlatList,View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { HomeTrendingItem } from "./home_items/HomeTrendingItem";
import { CardTitleTxt } from "../../components/CardTitleTxt";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { HomeTrendSkeleton } from "../../components/shimmer/home/HomeTrendSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

type homeCatNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeTrendingLayout = React.memo<Props>((props) =>
{
  const navigation = useNavigation<homeCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const {
    homeTrendLoad,
    homeTrendFoodDataList
  } = useSelector((state: RootState) => state.Home);

  const Strings = strings;
  const {
    homeTrendWeekTitle,
    seeAllTxt
  } = Strings

  return(
    <View>
      {!homeTrendLoad && homeTrendFoodDataList.length > 0 &&
        <CardTitleTxt
          seeAllClick={() => navigation.navigate("TrendFoodAll")}
          titleTxt={homeTrendWeekTitle}
          seeAllTxt={seeAllTxt} />}
      {homeTrendLoad &&
        <HomeTrendSkeleton />}
      {!homeTrendLoad && homeTrendFoodDataList.length > 0 &&
        <View>
          <FlatList
            data={homeTrendFoodDataList.slice(0,4)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <HomeTrendingItem
                item={item}
                length={homeTrendFoodDataList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})
