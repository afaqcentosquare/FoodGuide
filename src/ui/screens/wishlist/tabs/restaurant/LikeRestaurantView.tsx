import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import { SPACE } from "../../../../../config/Dimens";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { useAppDispatch } from "../../../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import { LikeRestaurantItem } from "./LikeRestaurantItem";
import { RestaurantSkeleton } from "../../../../components/shimmer/RestaurantSkeleton";
import { NoDataTxt } from "../../../../components/NoDataTxt";
import { NoInternetConnection } from "../../../../components/NoInternetConnection";

type Props = {}

export const LikeRestaurantView = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const { likeRestaurantList,likeResLoad,wishListCheckInternet } = useSelector((state: RootState) => state.Wishlist);
  const {themedColors} = usePreferredTheme();

  return(
    <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
      {likeResLoad ?
        <View style={{marginTop: SPACE.xs, marginBottom: SPACE.xs,marginStart:SPACE._2lg,marginEnd:SPACE._2lg}}>
          <RestaurantSkeleton />
        </View>
        : null}
      {!likeResLoad && likeRestaurantList.length === 0 ? <NoDataTxt noDataTxt={"No Restaurant Yet"}/> : null}
      {!wishListCheckInternet ? <NoInternetConnection/> : null}
      {wishListCheckInternet && likeRestaurantList.length > 0 ?
        <View style={{ marginTop: SPACE.xs, marginBottom: SPACE.xs, marginStart: SPACE._2lg, marginEnd: SPACE._2lg }}>
          <FlatList
            data={likeRestaurantList}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <LikeRestaurantItem
                item={item} />}
            keyExtractor={(item, index) => index.toString()} />
        </View> : null}
    </View>
  )
})

const styles = StyleSheet.create({

})
