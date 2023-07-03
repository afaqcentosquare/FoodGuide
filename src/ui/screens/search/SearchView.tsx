import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { InputText } from "../../components/InputText";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { SearchItem } from "./SearchItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../components/Screens";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { RestaurantSkeleton } from "../../components/shimmer/RestaurantSkeleton";
import { NoDataTxt } from "../../components/NoDataTxt";
import { NoInternetConnection } from "../../components/NoInternetConnection";
import { Fonts } from "../../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  searchChangeTxt : (e : string) => void
}

type searchNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SearchView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<searchNavProp>();
  const {themedColors} = usePreferredTheme();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const {searchChangeTxt} = props
  const search = useSelector((state: RootState) => state.Search);
  const {
    searchDataLoad,
    searchDataList,
    searchCheckInternet
  } = search;
  const Strings = strings;
  const {
    edtSearchHintTxt,
    searchNoDataTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.searchMainCont,{backgroundColor:themedColors.bgColor}]}>
        <View style={[styles.searchHeadMainCont,{backgroundColor:themedColors.primaryColor}]}>
          <View style={styles.searchHeadEdtMainCont}>
            <TouchableOpacity
              style={[styles.backBtnIconCont,{backgroundColor:themedColors.secondaryIconColor}]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.4}>
              <Octicons
                name={"arrow-left"}
                size={16}
                color={themedColors.primaryTxtColor}/>
            </TouchableOpacity>
            <View style={styles.searchHeadEdtCont}>
              <InputText
                onChangeText={(e) => searchChangeTxt(e)}
                edtStartIconVisible={true}
                edtStartIconType={Ionicons}
                edtStartIconName={"search"}
                edtStartIconSize={18}
                txtInputStyle={[styles.searchEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.searchEdtTxtCont,{backgroundColor:themedColors.editTxtSecondaryCont}]}
                hint={edtSearchHintTxt}/>
            </View>
          </View>
        </View>
        <View style={styles.searchResList}>
          {searchCheckInternet && searchDataLoad &&
            <View style={styles.searchErrMainCont}>
              <RestaurantSkeleton />
            </View>}
          {searchCheckInternet && !searchDataLoad && searchDataList.length === 0 &&
            <View style={styles.searchErrMainCont}>
              <NoDataTxt
                noDataTxt={searchNoDataTxt} />
            </View>}
          {!searchCheckInternet &&
            <View style={styles.searchErrMainCont}>
              <NoInternetConnection />
            </View>}
          {searchCheckInternet && !searchDataLoad && searchDataList.length > 0 &&
            <View>
              <FlatList
                data={searchDataList}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <SearchItem
                    item={item} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>}
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  searchMainCont : {
    flex:1
  },
  homeMainCont : {
    flex:1,
  },
  backBtnIconCont : {
    height:33,
    width:33,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  searchHeadMainCont : {
    borderBottomRightRadius:BORDER_RADIUS.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  searchHeadEdtMainCont : {
    alignItems:'center',
    flexDirection:'row',
    marginTop:SPACE._2md,
    marginBottom:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  searchHeadEdtCont : {
    flex:1,
    marginEnd:SPACE._2xs,
    marginStart:SPACE._2md
  },
  searchEdtTxtCont : {
    height:35,
  },
  searchEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  searchFilterIconCont : {
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl
  },
  searchResList : {
    flex:1,
    marginTop:SPACE._2md,
    marginBottom:SPACE._2md,
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm
  },
  searchErrMainCont : {
    flex:1
  }
})
