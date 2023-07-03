import React from "react";
import { FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { MainSkeleton } from "./MainSkeleton";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const RestaurantSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();

  function SearchSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.rsItemMainCont,props.style,{ backgroundColor: themedColors.cardBgColor, }]}>
        <View style={styles.rsSubCont}>
          <View style={styles.rsItemIconCont}>
            <MainSkeleton
              style={styles.rsItemHeartIcon}/>
          </View>
          <View style={[styles.rsItemBottomCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
            <View>
              <MainSkeleton
                style={styles.rsItemIcon}/>
            </View>
            <View style={styles.rsItemMarginTop}>
              <MainSkeleton
                style={styles.rsItemLocTxt}/>
            </View>
            <View style={styles.rsItemMarginTop}>
              <MainSkeleton
                style={styles.rsItemRateTxt}/>
            </View>
          </View>
        </View>
      </View>
    )

  }

  return(
    <View style={styles.rsListCont}>
      <FlatList
        data={number}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => SearchSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  rsItemMainCont : {
    flex:1,
    maxWidth:"50%",
    margin:SPACE.sm,
    height:300,
    borderRadius:BORDER_RADIUS.lg,
  },
  rsSubCont : {
    flex:1,
    borderRadius:BORDER_RADIUS.lg,
  },
  rsListCont : {
    marginTop:SPACE._2xs,
    marginBottom:SPACE._2xs
  },
  rsItemBottomCont : {
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
  rsItemIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  rsItemIcon : {
    height:12,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  rsItemLocTxt : {
    height:12,
    width:95,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  rsItemMarginTop : {
    marginTop:SPACE.sm
  },
  rsItemRateTxt : {
    height:12,
    width:70,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  rsItemHeartIcon : {
    height:25,
    width:25,
  }
})
