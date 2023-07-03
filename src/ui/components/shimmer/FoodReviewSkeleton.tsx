import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { MainSkeleton } from "./MainSkeleton";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";
import { ViewLine } from "../ViewLine";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const FoodReviewSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();

  function SearchSkelItem(length : number,index : number)
  {
    return(
      <View style={{flex:1,width:'100%',
        marginTop: index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom : index === length - 1 ?  SPACE._2lg : SPACE.xs}}>
        <View style={{flex:1,flexDirection:'row',marginTop:SPACE.sm,}}>
          <View>
            <MainSkeleton
              style={{width:70,height:70}}/>
          </View>
          <View style={{marginStart:SPACE._2lg}}>
            <View>
              <MainSkeleton
                style={{height:15}}/>
            </View>
            <View style={{marginTop:SPACE.sm}}>
              <MainSkeleton
                style={{width:'70%',height:15}}/>
            </View>
            <View style={{marginTop:SPACE.sm}}>
              <MainSkeleton
                style={{width:'50%',height:15}}/>
            </View>
          </View>
        </View>
        <View style={{marginTop:SPACE.sm,marginStart:'25%'}}>
          <ViewLine/>
        </View>
      </View>
    )

  }

  return(
    <View style={{marginTop:SPACE._2xs,marginBottom:SPACE._2xs}}>
      <FlatList
        data={number}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => SearchSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({

})
