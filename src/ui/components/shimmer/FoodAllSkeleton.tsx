import React from "react";
import { FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { MainSkeleton } from "./MainSkeleton";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const FoodAllSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();

  function FoodAllSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeTrendSkelItemMainCont,props.style]}>
        <View style={{flex:1}}>
          <View style={styles.homeTrendSkelItemIconCont}>
            <MainSkeleton
              style={styles.homeTrendSkelItemHeartIcon}/>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <MainSkeleton
              style={{ height:90, width:90,
                borderRadius:BORDER_RADIUS._8xl,}}/>
          </View>
          <View style={{flex:1,marginTop:SPACE._2lg,marginStart:SPACE._2lg,marginEnd:SPACE._2lg}}>
            <View style={{marginTop:SPACE._2lg}}>
              <MainSkeleton
                style={{ height:12, width:110}}/>
            </View>
            <View style={{marginTop:SPACE._2xs}}>
              <MainSkeleton
                style={{ height:12, width:80}}/>
            </View>
            <View style={{marginTop:SPACE._2xs}}>
              <MainSkeleton
                style={{ height:12, width:40}}/>
            </View>
          </View>
          <View style={{marginEnd:SPACE._2md,marginTop:SPACE._2lg,marginBottom:SPACE._2md,alignItems:'flex-end'}}>
            <MainSkeleton
              style={{ width:20, height:20, borderRadius:BORDER_RADIUS._2xs,}}/>
          </View>
        </View>
      </View>
    )

  }

  return(
    <View style={{marginTop:SPACE._2lg,marginBottom:SPACE._2lg,marginStart:SPACE._2lg,marginEnd:SPACE._2lg}}>
      <FlatList
        data={number}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => FoodAllSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTrendSkelItemMainCont : {
    flex:1,
    maxWidth:'47%',
    margin:5,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:colors.colors.white,
  },
  homeTrendSkelItemBottomCont : {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:"#f5f5f5",
    marginTop:SPACE._2lg,
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    marginBottom:SPACE.sm,
    paddingTop:SPACE.sm,
    paddingBottom:SPACE.sm,
    paddingStart:SPACE.sm,
    paddingEnd:SPACE.xl,
  },
  homeTrendSkelItemIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  homeTrendSkelItemIcon : {
    height:15,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  homeTrendSkelItemHeartIcon : {
    height:25,
    width:25,
  }
})
