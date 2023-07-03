import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../../config/Dimens";
import { Fonts } from "../../../../../config";
import { MenuParentItem } from "./MenuParentItem";
import { useAppDispatch } from "../../../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";
import { MenuSubItem } from "./MenuSubItem";
import { MenuParentSkeleton } from "../../../../components/shimmer/res_detail/MenuParentSkeleton";
import { MenuChildSkeleton } from "../../../../components/shimmer/res_detail/MenuChildSkeleton";
import { NoInternetConnection } from "../../../../components/NoInternetConnection";
import { NoDataTxt } from "../../../../components/NoDataTxt";
import strings from "../../../../../config/languages/LocalizedStrings";

type Props = {}

export const MenuView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { menuParentLoad,menuChildLoad,menuData,menuSubData,menuCheckInternet } = useSelector((state: RootState) => state.ResDetail);
  const dispatch = useAppDispatch();
  const Strings = strings;
  const {
    foodNoDataTxt
  } = Strings

  return(
    <View style={[styles.menuParentListMainCont]}>
      {!menuCheckInternet &&
        <NoInternetConnection/>}
      {menuCheckInternet &&
        <>
          <View style={[styles.menuParentListCont, { backgroundColor: themedColors.primaryColor }]}>
            {menuParentLoad &&
              <MenuParentSkeleton />}
            {menuData.length > 0 &&
              <FlatList
                data={menuData}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <MenuParentItem
                    selectType={menuData[0].menuCatName}
                    item={item}
                    length={menuData?.length}
                    index={index} />}
                keyExtractor={(item, index) => index.toString()} />}
          </View>
          <View style={[styles.menuSubListCont, { backgroundColor: themedColors.bgColor }]}>
            {menuChildLoad &&
              <MenuChildSkeleton/>}
            {!menuChildLoad && menuSubData.length < 0 &&
              <NoDataTxt
                noDataTxt={foodNoDataTxt}/>}
            {menuSubData.length > 0 &&
              <FlatList
                data={menuSubData}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <MenuSubItem
                    item={item}
                    length={menuData?.length}
                    index={index} />}
                keyExtractor={(item, index) => index.toString()} />}
          </View>
      </>}
    </View>
  )
})

const styles = StyleSheet.create({
  homeTrendItemImgCont : {
    width:130,
    marginTop:SPACE.xl,
    alignItems:'center'
  },
  homeTrendItemImg : {
    height:85,
    width:85,
    borderRadius:BORDER_RADIUS._8xl,
  },
  menuParentListMainCont : {
    flex:1,
    flexDirection:'row',
    marginTop:SPACE._2md,
    marginBottom:SPACE._2md
  },
  menuParentListCont : {
    width:75,
    borderTopRightRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:SPACE.xl
  },
  menuSubListCont : {
    flex:1,
    marginStart:SPACE.xs,
    marginEnd:SPACE.xs
  },
  homeTrendingItemMainCont : {
    borderRadius:BORDER_RADIUS.lg,
    paddingStart:SPACE._2xs,
    paddingEnd:SPACE._2xs,
    paddingTop:SPACE._2xs
  },

})
