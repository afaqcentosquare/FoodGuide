import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { TabBar, TabView } from "react-native-tab-view";
import { Screens } from "../../components/Screens";
import { BORDER_RADIUS, FONT_SIZE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { routeObj } from "../../../models/dummy_model/Routes";
import ResProfileController from "./tabs/res_profile/ResProfileController";
import MenuController from "./tabs/menu/MenuController";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  headerTitle : string
}

type resDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

export const ResDetailView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<resDetailNavProp>();
  const {themedColors} = usePreferredTheme();
  const [routes,setRoutes] = useState<Array<routeObj>>([]);
  const [index, setIndex] = React.useState(0);
  const Strings = strings;
  const {
    tabMenuTxt,
    tabProfileTxt
  } = Strings

  useEffect(() =>
  {
    setRoutes([
      { key: 'menu', title: tabMenuTxt },
      { key: 'profile', title: tabProfileTxt },
    ])
  },[])

  // @ts-ignore
  const renderScene = ({ route }) =>
  {
    switch (route.key) {
      case 'menu':
        return (
          <MenuController/>
        )
      case 'profile':
        return(
          <ResProfileController />
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
        labelStyle={[styles.rdTabLabel,{color:themedColors.primaryTxtColor}]}
        indicatorStyle={[styles.rdTabIndicator,{backgroundColor: themedColors.tavIndicatorColor}]}
        style={[styles.rdTabStyle,{backgroundColor:themedColors.primaryColor}]} />
    )

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.rdMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnHeaderCont={styles.rdBackBtnHeadCont}
          backBtnVisible={true}
          title={props.headerTitle}/>
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
  rdMainCont : {
    flex:1,
  },
  rdBackBtnHeadCont : {
    paddingBottom:0,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0
  },
  rdTabLabel : {
    height:25,
    textTransform:'none',
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xs
  },
  rdTabIndicator : {
    borderRadius:BORDER_RADIUS.sm,
    height:3,
  },
  rdTabStyle : {
    height:45,
    overflow:'hidden',
    justifyContent:'center',
    alignContent:'center',
    borderBottomRightRadius:BORDER_RADIUS.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  rdTab : {
    height:45,
  }
})

