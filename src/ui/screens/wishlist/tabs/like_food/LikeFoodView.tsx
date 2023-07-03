import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import { useAppDispatch } from "../../../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import { LikeFoodItem } from "./LikeFoodItem";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { SPACE } from "../../../../../config/Dimens";
import { RestaurantSkeleton } from "../../../../components/shimmer/RestaurantSkeleton";
import { NoDataTxt } from "../../../../components/NoDataTxt";
import { NoInternetConnection } from '../../../../components/NoInternetConnection';

type Props = {}

export const LikeFoodView = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const { likeFoodList,likeFoodLoad,wishListCheckInternet } = useSelector((state: RootState) => state.Wishlist);
  const {themedColors} = usePreferredTheme();

  return(
    <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
      {likeFoodLoad ?
        <View style={{marginTop: SPACE.xs, marginBottom: SPACE.xs,marginStart:SPACE._2lg,marginEnd:SPACE._2lg}}>
          <RestaurantSkeleton />
        </View>
        : null}
      {!likeFoodLoad && likeFoodList.length === 0 ? <NoDataTxt noDataTxt={"No Food Yet"}/> : null}
      {!wishListCheckInternet ? <NoInternetConnection/> : null}
      {wishListCheckInternet && likeFoodList.length > 0 ?
        <View style={{ marginTop: SPACE.xs, marginBottom: SPACE.xs, marginStart: SPACE._2lg, marginEnd: SPACE._2lg }}>
          <FlatList
            data={likeFoodList}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <LikeFoodItem
                item={item}
                index={index}
                length={likeFoodList.length} />}
            keyExtractor={(item, index) => index.toString()} />
        </View> : null}
    </View>
  )
})

const styles = StyleSheet.create({

})
