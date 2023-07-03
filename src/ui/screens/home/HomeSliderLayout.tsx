import React, { useRef } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, SPACE, width } from "../../../config/Dimens";
import { HomeSliderItem } from "./home_items/HomeSliderItem";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { HomeSliderSkeleton } from "../../components/shimmer/home/HomeSliderSkeleton";

type Props = {}

export const HomeSliderLayout = React.memo<Props>((props) =>
{
  const scrollX = useRef(new Animated.Value(0)).current ;
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const home = useSelector((state: RootState) => state.Home);

  return(
    <View style={{backgroundColor:themedColors.bgColor}}>
      {home.homeSliderLoad ? <HomeSliderSkeleton /> : null}
      {home.homeSliderDataList.length > 0 ? <FlatList
        data={home.homeSliderDataList}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
        renderItem={({ item }) => <HomeSliderItem homeItem={item} />}
        keyExtractor={(item, index) => index.toString()} /> : null}
      <View style={{flexDirection:'row',backgroundColor:themedColors.bgColor,justifyContent:'center',alignItems:'center'}}>
        {home.homeSliderDataList.map((_,i) =>
        {
          const inputRange = [(i - 1) * width,i * width,(i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange : [8,8,8],
            extrapolate : 'clamp'
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange : [0.3,1,0.3],
            extrapolate : 'clamp'
          })
          return <Animated.View style={[styles.homeSliderDot,{width : dotWidth,opacity}]} key={i}/>
        })}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  homeSliderDotContainer :
    {
      flexDirection : 'row',
      width:'100%',
      bottom:0,
      left:0,
      alignItems:'center',
    },
  homeSliderDot : {
    height : 8,
    marginBottom:SPACE._2md,
    borderRadius : BORDER_RADIUS.xl,
    backgroundColor : '#493d8a',
    marginHorizontal : 5,
  }
})
