import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import { AppText } from "../../../../components/AppText";
import { Fonts } from "../../../../../config";
import { ResProfileReviewItem } from "./ResProfileReviewItem";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { AppButton } from "../../../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import { NoDataTxt } from "../../../../components/NoDataTxt";

type Props = {}

type resProfileReviewNavProp = StackNavigationProp<AllScreenStackParamList>;

export const ResProfileReviewLayout = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<resProfileReviewNavProp>();
  const { resProfileData }  = useSelector((state: RootState) => state.ResProfile);
  const { resReviewList } = useSelector((state: RootState) => state.ResReview);
  const resDetail = useSelector((state: RootState) => state.ResDetail);
  const { resId } = resProfileData
  const { resReviewLoad } = resDetail

  return(
    <View style={[styles.rprlMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.rprlTitleMainCont}>
        <View style={styles.rprlDesTitleTxtCont}>
          <AppText
            style={[styles.rprlDesTitleTxt, { color: themedColors.primaryTxtColor }]}
            text={"Reviews"} />
        </View>
        <View>
          <AppButton
            onPress={() => navigation.navigate('AddResReview',{resId : resId})}
            btnContStyle={styles.rprlAddBtnCont}
            btnTxtStyle={styles.rprlBtnTxt}
            text={"Add Review"}/>
        </View>
      </View>
      {resReviewList.length === 0 &&
        <View style={{marginBottom:SPACE.xl}}>
          <NoDataTxt
            noMoreDataVisible={true}
            noDataTxt={"No Reviews Yet"} />
        </View>}
      {resReviewList.length > 0  &&
        <View>
          <FlatList
            data={resReviewList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <ResProfileReviewItem
                item={item}
                length={resReviewList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  rprlMainCont : {
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2lg,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  rprlTitleMainCont : {
    flexDirection:'row'
  },
  rprlDesTitleTxtCont : {
    flex:1
  },
  rprlDesTitleTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xl,
  },
  rprlAddBtnCont : {
    height:25,
    paddingStart:SPACE.md,
    paddingEnd:SPACE.md,
  },
  rprlBtnTxt : {
    fontSize:FONT_SIZE._3xs,
  }
})
