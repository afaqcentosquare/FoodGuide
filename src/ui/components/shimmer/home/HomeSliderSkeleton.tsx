import React, { useRef } from "react";
import { Animated, Dimensions, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS, FONT_SIZE, SPACE, width } from "../../../../config/Dimens";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../../config/colors';
import {GILROY} from '../../../../config';
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const HomeSliderSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function HomeSliderSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeSliderSkelItemMainCont,props.style,{backgroundColor : themedColors.skeletonContentColor,marginStart: index === 0 ? 15 : 6,marginEnd: index === length - 1 ?  15 : 6}]}>
        <MainSkeleton
          style={styles.homeSliderSkelItemUserImg}/>
      </View>
    )

  }

  return(
    <View>
      <FlatList 
        data={number}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}

        snapToAlignment={"center"}
        onScroll={Animated.event([{nativeEvent:{contentOffset : { x : scrollX}}}], {useNativeDriver : false})}
        horizontal={true}
        renderItem={({item, index}) => HomeSliderSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
      <View style={{flexDirection:'row',backgroundColor:themedColors.bgColor,justifyContent:'center',alignItems:'center'}}>
        {number.map((_,i) =>
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
          return (
            <Animated.View style={[styles.homeSliderDot,{width : dotWidth,opacity}]} key={i}>
              <MainSkeleton style={{height:10,width:10,borderRadius:20,backgroundColor:themedColors.skeletonContentColor}}/>
            </Animated.View>
          )

        })}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  skillsItemCont : {
    width:'100%',
    marginBottom:SPACE.sm,
    marginStart:SPACE._2lg
  },
  homeSliderSkelItemMainCont : {
    flex:1,
    width:width - 30,
    margin:15,
    overflow:'hidden',
    borderRadius:BORDER_RADIUS.lg,
    justifyContent:'center',
    alignItems:'center'
  },
  homeSliderSkelItemUserImg : {
    resizeMode:'cover',
    height:200,
    borderRadius:BORDER_RADIUS.lg,
    width:width - 30,
    justifyContent:'center',
    alignItems:'center',
  },
  homeSliderDot : {
    height : 8,
    marginBottom:SPACE._2md,
    borderRadius : BORDER_RADIUS.xl,

    marginHorizontal : 5,
  }
})
