import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { TextHeader } from "../../components/headers/TextHeader";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { CategoryParentItem } from "./CategoryParentItem";
import { CategorySubItem } from "./CategorySubItem";
import Strings from "../../../config/strings";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { NoInternetConnection } from "../../components/NoInternetConnection";
import { MenuParentSkeleton } from "../../components/shimmer/res_detail/MenuParentSkeleton";
import { RestaurantSkeleton } from "../../components/shimmer/RestaurantSkeleton";

type Props = {}

export const CategoryView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const catHeadTxt = Strings.header;
  const { selectCatType,categoryResList,categoryList,categoryInternetCheck,catParentLoad,catChildLoad } = useSelector((state: RootState) => state.Category);

  return(
    <View style={[styles.catMainCont,{backgroundColor:themedColors.bgColor}]}>
      <View style={[styles.profileHeadMainCont,{backgroundColor:themedColors.primaryColor}]}>
        <TextHeader
          titleTxtVisible={true}
          title={catHeadTxt.catHeadTxt}/>
      </View>
      {!categoryInternetCheck &&
        <View style={{flex:1}}>
          <NoInternetConnection />
        </View>}
      {categoryInternetCheck &&
        <View style={[styles.catSubCont]}>
          <View style={[styles.catListCont1, { backgroundColor: themedColors.primaryColor }]}>
            {catParentLoad && <MenuParentSkeleton />}
            {categoryList.length > 0 && <FlatList
              data={categoryList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <CategoryParentItem
                  item={item}
                  selectCatType={categoryList[0].foodCatName}
                  length={categoryList?.length}
                  index={index} />}
              keyExtractor={(item, index) => index.toString()} />}
          </View>
          <View style={[styles.catListCont2, { backgroundColor: themedColors.bgColor }]}>
            {catChildLoad && <RestaurantSkeleton/>}
            {categoryResList.length > 0 && <FlatList
              data={categoryResList}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <CategorySubItem
                  item={item}
                  length={categoryResList?.length}
                  index={index} />}
              keyExtractor={(item, index) => index.toString()} />}
          </View>
        </View>}
      </View>
  )
})

const styles = StyleSheet.create({
  profileHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE.md,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  catMainCont : {
    flex:1,
  },
  catSubCont : {
    flex:1,
    flexDirection:'row',
    marginTop:SPACE._2md,
    marginBottom:SPACE._2md
  },
  catListCont1 : {
    width:75,
    borderTopRightRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:SPACE.xl
  },
  catListCont2 : {
    flex:1,
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm
  },
})
