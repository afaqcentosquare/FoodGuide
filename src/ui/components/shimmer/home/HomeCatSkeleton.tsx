import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS,SPACE, } from "../../../../config/Dimens";
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const HomeCatSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();

  function HomeCatSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.hcsItemMainCont,props.style,{
        backgroundColor:themedColors.cardBgColor,
        marginStart: index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: index === length - 1 ?  SPACE._2lg : SPACE.xs}]}>
        <View style={styles.hcsItemImgCont}>
          <MainSkeleton
            style={[styles.hcsItemImg,{backgroundColor:themedColors.skeletonContentColor}]}/>
        </View>
        <View style={styles.hcsItemTxtCont}>
          <MainSkeleton
            style={[styles.hcsItemTxt,{backgroundColor:themedColors.skeletonContentColor}]}/>
        </View>
        <View style={styles.hcsItemIconCont}>
          <MainSkeleton
            style={[styles.hcsItemIcon,{backgroundColor:themedColors.skeletonContentColor}]}/>
        </View>
      </View>
    )

  }

  return(
    <View>
      <FlatList
        data={number}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => HomeCatSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  hcsItemMainCont : {
    width:100,
    elevation:4,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2lg,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE.md,
  },
  hcsItemImgCont : {
    marginTop:SPACE._2md
  },
  hcsItemImg : {
    height:60,
    width:60,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  hcsItemTxtCont : {
    marginTop:SPACE.xl,
  },
  hcsItemTxt : {
    height:12,
    width:70
  },
  hcsItemIconCont : {
    marginTop:SPACE.xl,
    marginBottom:SPACE._2md,
  },
  hcsItemIcon : {
    height:25,
    width:25,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
})
