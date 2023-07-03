import React from "react";
import { FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS,SPACE } from "../../../../config/Dimens";
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const HomeTopResSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3];
  const {themedColors}  = usePreferredTheme();

  function HomeTopResSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.htrsItemMainCont,props.style,{
        backgroundColor: themedColors.cardBgColor,
        marginStart: index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: index === length - 1 ?  SPACE._2lg : SPACE.xs}]}>
        <View style={styles.htrsItemIconCont}>
          <MainSkeleton
            style={styles.htrsItemHeartIcon}/>
        </View>
        <View style={[styles.htrsItemBottomCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
          <View>
            <MainSkeleton
              style={styles.htrsItemIcon}/>
          </View>
          <View style={styles.htrsItemMarginTop}>
            <MainSkeleton
              style={styles.htrsItemLocTxt}/>
          </View>
          <View style={styles.htrsItemMarginTop}>
            <MainSkeleton
              style={styles.htrsItemRateTxt}/>
          </View>
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
        renderItem={({item, index}) => HomeTopResSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  htrsItemMainCont : {
    width:150,
    height:280,
    borderRadius:BORDER_RADIUS.lg,
    marginBottom:SPACE.sm,
    marginTop:SPACE._2lg,
  },
  htrsItemBottomCont : {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderRadius:BORDER_RADIUS.lg,
    marginTop:SPACE._2lg,
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    marginBottom:SPACE.sm,
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    paddingStart:SPACE.sm,
    paddingEnd:SPACE.xl,
  },
  htrsItemIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  htrsItemIcon : {
    height:12,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  htrsItemLocTxt : {
    height:12,
    width:95,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  htrsItemMarginTop : {
    marginTop:SPACE.sm
  },
  htrsItemRateTxt : {
    height:12,
    width:70,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  htrsItemHeartIcon : {
    height:25,
    width:25,
  }
})
