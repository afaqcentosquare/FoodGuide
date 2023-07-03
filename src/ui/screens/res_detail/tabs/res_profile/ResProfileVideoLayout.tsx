import React from 'react';
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { FlatList, StyleSheet,View } from "react-native";
import { BORDER_RADIUS,SPACE } from "../../../../../config/Dimens";
import { ResProfileViewItem } from "./ResProfileVideoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import { NoDataTxt } from "../../../../components/NoDataTxt";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { CardTitleTxt } from "../../../../components/CardTitleTxt";

type Props = {}

type resProfileLayoutNavProp = StackNavigationProp<AllScreenStackParamList>;

export const ResProfileVideoLayout = React.memo<Props>((props) =>
{
  const navigation = useNavigation<resProfileLayoutNavProp>();
  const {themedColors} = usePreferredTheme();
  const { resProfileVideoList } = useSelector((state: RootState) => state.ResProfile);

  return(
    <View style={[styles.rpvlMainCont,{backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.rpvlCardTitleCont}>
        <CardTitleTxt
          titleTxt={"Videos"}
          seeAllTxt={"See All"}/>
      </View>
      {resProfileVideoList.length === 0 &&
        <View style={styles.rpvlNoDataCont}>
          <NoDataTxt
            noMoreDataVisible={true}
            noDataTxt={"No Video Yet"} />
        </View>}
      {resProfileVideoList.length > 0 &&
        <View style={styles.rpvlVideoListCont}>
          <FlatList
            data={resProfileVideoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <ResProfileViewItem
                item={item}
                index={index}
                length={resProfileVideoList?.length} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  rpvlMainCont : {
    borderRadius:BORDER_RADIUS.lg,
    marginTop:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  rpvlCardTitleCont : {
    marginTop:SPACE._2lg
  },
  rpvlVideoListCont : {
    marginTop: SPACE.xs,
    marginBottom: SPACE._2lg
  },
  rpvlNoDataCont : {
    flex: 1,
    marginBottom: SPACE.xl
  },
})
