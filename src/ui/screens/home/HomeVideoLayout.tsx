import React from 'react';
import { useSelector } from "react-redux";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { RootState } from "../../../redux/stores/store";
import { FlatList, StyleSheet, View } from "react-native";
import { FONT_SIZE } from "../../../config/Dimens";
import { HomeVideoItem } from "./home_items/HomeVideoItem";
import { Fonts, GILROY } from "../../../config";
import { CardTitleTxt } from "../../components/CardTitleTxt";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

type homeVideoNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeVideoLayout = React.memo<Props>((props) =>
{
  const navigation = useNavigation<homeVideoNavProp>();
  const {themedColors} = usePreferredTheme();
  const { homeVideoDataList } = useSelector((state: RootState) => state.Home);
  const Strings = strings;
  const {
    homeVideosTitle,
    seeAllTxt
  } = Strings

  return(
    <View>
      <CardTitleTxt
        seeAllClick={() => navigation.navigate('VideoDetail')}
        titleTxt={homeVideosTitle}
        seeAllTxt={seeAllTxt}/>
      {homeVideoDataList.length > 0 &&
        <View>
          <FlatList
            data={homeVideoDataList.slice(0,4)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <HomeVideoItem
                item={item}
                index={index}
                length={homeVideoDataList?.length} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  foodDetailDesTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xl,
  },
})
