import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { HomeItem } from "./HomeItem";
import { NoInternetConnection } from "../../components/NoInternetConnection";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { HomeHeader } from "../../components/headers/HomeHeader";


type Props = {}

type homeNavProp = StackNavigationProp<AllScreenStackParamList>;

export const HomeView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<homeNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const homeJob = useSelector((state: RootState) => state.Home);
  const { homeMainList,checkHomeInternet,homeSliderLoad } = homeJob

  return(
    <View style={[styles.homeMainCont,{backgroundColor:themedColors.bgColor}]}>
      <View style={[styles.homeMainCont,{backgroundColor:themedColors.bgColor}]}>
        <View style={[styles.homeHeadMainCont,{backgroundColor:themedColors.primaryColor}]}>
          <HomeHeader
            favIconClick={() => navigation.navigate('Favourites')}
            cartIconClick={() => navigation.navigate('AddToCart')}
            searchIconClick={() => navigation.navigate('Search')}
            feedIconVisible={false}
            iconVisible={true}
            heartIconVisible={true}
            searchIconVisible={true}
            cartIconVisible={true} />
        </View>
        <View style={[styles.homeMainCont,{backgroundColor:themedColors.bgColor}]}>
          {!homeSliderLoad && checkHomeInternet  &&
            <View style={[styles.homeListCont, { backgroundColor: themedColors.bgColor }]}>
              <FlatList
                data={homeMainList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>
                  <HomeItem
                    item={item} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>}
          {!checkHomeInternet &&
            <View style={{ flex: 1 }}>
              <NoInternetConnection />
            </View>}
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  homeHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE.md,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  homeMainCont : {
    flex:1,
  },
  homeListCont : {
    flex:1,
    borderTopLeftRadius:BORDER_RADIUS.xl
  }
})
