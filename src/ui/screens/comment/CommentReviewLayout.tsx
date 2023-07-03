import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { CommentReviewItem } from "./CommentReviewItem";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import { NoDataTxt } from "../../components/NoDataTxt";
import { FoodReviewSkeleton } from "../../components/shimmer/FoodReviewSkeleton";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  videoReviewLoad : boolean
}

export const CommentReviewLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {foodReviewList,showFoodReviewSheet} = useSelector((state: RootState) => state.FoodReview);
  const Strings = strings;
  const {
    comHeadTitleTxt,
    noReviewTxt
  } = Strings

  return(
    <View style={[styles.crlMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.crlTitleTxtCont}>
        <AppText
          style={[styles.crlTitleTxt, { color: themedColors.primaryTxtColor }]}
          text={comHeadTitleTxt} />
      </View>
      <View style={styles.crListCont}>
        {props.videoReviewLoad &&
          <View style={styles.crlSkelCont}>
            <FoodReviewSkeleton />
          </View>}
        {!props.videoReviewLoad && foodReviewList.length === 0 &&
          <View style={styles.crNoDataTxtCont}>
            <NoDataTxt
              noMoreDataVisible={true}
              noDataTxt={noReviewTxt} />
          </View>}
        {!props.videoReviewLoad && foodReviewList.length > 0 &&
          <FlatList
            data={foodReviewList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <CommentReviewItem
                index={index}
                length={foodReviewList.length}
                item={item} />}
            keyExtractor={(item, index) => index.toString()} />}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  crlMainCont : {
    marginBottom:SPACE._2lg,
    padding:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  crlSkelCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  crlTitleTxtCont : {
    flex:1,
  },
  crlTitleTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl,
  },
  crNoDataTxtCont : {
    marginBottom:SPACE.xl
  },
  crListCont : {
    flex:1
  }
})
