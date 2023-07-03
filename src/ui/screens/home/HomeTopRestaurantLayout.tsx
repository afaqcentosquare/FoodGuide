import React from "react";
import { FlatList,View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { HomeTopRestaurantItem } from "./home_items/HomeTopRestaurantItem";
import { CardTitleTxt } from "../../components/CardTitleTxt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { HomeTopResSkeleton } from "../../components/shimmer/home/HomeTopResSkeleton";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

type homeTopResNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeTopRestaurantLayout = React.memo<Props>((props) =>
{
  const navigation = useNavigation<homeTopResNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {
    homeTopResDataList,
    homeTopResLoad
  } = useSelector((state: RootState) => state.Home);

  const Strings = strings;
  const {
    homeTopResTitle,
    seeAllTxt
  } = Strings

  return(
    <View>
      <CardTitleTxt
        seeAllClick={() => navigation.navigate('Search')}
        titleTxt={homeTopResTitle}
        seeAllTxt={seeAllTxt}/>
      {homeTopResLoad &&
        <HomeTopResSkeleton />}
      {homeTopResDataList.length > 0 &&
        <View>
          <FlatList
            data={homeTopResDataList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <HomeTopRestaurantItem
                item={item}
                length={homeTopResDataList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})

