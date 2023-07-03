import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { TabBar, TabView } from "react-native-tab-view";
import { routeObj } from "../../../models/dummy_model/Routes";
import { Fonts } from "../../../config";
import { BORDER_RADIUS, FONT_SIZE } from "../../../config/Dimens";
import LikeRestaurantController from "./tabs/restaurant/LikeRestaurantController";
import LikeFoodController from "./tabs/like_food/LikeFoodController";
import strings from "../../../config/languages/LocalizedStrings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type wishListNavProp = StackNavigationProp<AllScreenStackParamList>;

export const WishlistView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<wishListNavProp>();
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    tabResTxt,
    tabFoodTxt,
    wishListHeadTxt
  } = Strings

  const [routes,setRoutes] = useState<Array<routeObj>>([]);
  const [index, setIndex] = React.useState(0);

  useEffect(() =>
  {
    setRoutes([
      { key: 'restaurant', title: tabResTxt },
      { key: 'food', title: tabFoodTxt },
    ])
  },[])

  // @ts-ignore
  const renderScene = ({ route }) =>
  {
    switch (route.key) {
      case 'restaurant':
        return (
          <LikeRestaurantController/>
        )
      case 'food':
        return(
          <LikeFoodController/>
        )
      default:
        return null;
    }
  };

  const renderTabBar = ({...props}) =>
    (
      <TabBar
        position={props.position}
        jumpTo={props.jumpTo}
        layout={props.layout}
        navigationState={props.navigationState}
        activeColor={themedColors.tabActiveColor}
        inactiveColor={themedColors.tavInActiveColor}
        labelStyle={[styles.wlTabLabel,{color:themedColors.primaryTxtColor}]}
        indicatorStyle={[styles.wlTabIndicator,{backgroundColor: themedColors.tavIndicatorColor}]}
        style={[styles.wlTabStyle,{backgroundColor:themedColors.primaryColor}]} />
    )

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.wlMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnHeaderCont={styles.wlBackBtnHeadCont}
          backBtnVisible={true}
          title={wishListHeadTxt}/>
        <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          swipeEnabled={true}/>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  wlMainCont : {
    flex:1,
  },
  wlBackBtnHeadCont : {
    paddingBottom:0,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0
  },
  wlTabLabel : {
    height:25,
    textTransform:'none',
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xs
  },
  wlTabIndicator : {
    borderRadius:BORDER_RADIUS.sm,
    height:3,
  },
  wlTabStyle : {
    height:45,
    overflow:'hidden',
    justifyContent:'center',
    alignContent:'center',
    borderBottomRightRadius:BORDER_RADIUS.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  wlTab : {
    height:45,
  }
})
