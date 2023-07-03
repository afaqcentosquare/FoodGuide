import React, { useRef } from "react";
import { Animated,FlatList,View } from "react-native";
import { CardTitleTxt } from "../../components/CardTitleTxt";
import { HomeSliderSkeleton } from "../../components/shimmer/home/HomeSliderSkeleton";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { HomeDealsItem } from "./home_items/HomeDealsItem";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

export const HomeDealsLayout = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const home = useSelector((state: RootState) => state.Home);
  const scrollX = useRef(new Animated.Value(0)).current ;
  const Strings = strings;
  const {
    homeDealsTitle,
    seeAllTxt
  } = Strings

  return(
    <View>
      <CardTitleTxt
        titleTxt={homeDealsTitle}
        seeAllTxt={seeAllTxt}/>
      {home.homeNewFoodLoad &&
        <HomeSliderSkeleton/>}
      {home.homeDealsDataList.length > 0 &&
        <View>
          <FlatList
            data={home.homeDealsDataList}
            horizontal={true}
            pagingEnabled={true}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={"center"}
            renderItem={({ item }) =>
              <HomeDealsItem
                homeItem={item} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})
