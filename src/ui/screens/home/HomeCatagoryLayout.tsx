import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { CardTitleTxt } from "../../components/CardTitleTxt";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../../routes/bottom_nav_routes/BottomNavStack";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { HomeCatSkeleton } from "../../components/shimmer/home/HomeCatSkeleton";
import { HomeCatItem } from "./home_items/HomeCatItem";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

type homeCatNavProp = StackNavigationProp<HomeStackParamList>;

export const HomeCategoryLayout = React.memo<Props>((props) =>
{
  const navigation = useNavigation<homeCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const Strings = strings;
  const {
    homeFoodCat,
    seeAllTxt
  } = Strings
  const home = useSelector((state: RootState) => state.Home);

  return(
    <View style={styles.homeCatMainCont}>
      <CardTitleTxt
        seeAllClick={() => navigation.navigate('Category')}
        titleTxt={homeFoodCat}
        seeAllTxt={seeAllTxt}/>
      {home.homeCatLoad &&
        <HomeCatSkeleton />}
      {home.homeFoodCatDataList.length > 0 &&
        <View>
          <FlatList
            data={home.homeFoodCatDataList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <HomeCatItem
                item={item}
                length={home.homeFoodCatDataList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  homeCatMainCont : {
    marginTop:SPACE._2md,
  },
})
