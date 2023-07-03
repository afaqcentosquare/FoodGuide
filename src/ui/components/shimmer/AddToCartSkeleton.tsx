import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { MainSkeleton } from "./MainSkeleton";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const AddToCartSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();

  function SearchSkelItem(length : number,index : number)
  {
    return(
      <View style={{borderRadius:BORDER_RADIUS.lg,backgroundColor:colors.colors.white,padding:SPACE._2lg,flex:1,alignItems:'center',flexDirection:'row',width:'100%',
        marginTop: index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom : index === length - 1 ?  SPACE._2lg : SPACE.xs}}>
        <View>
          <MainSkeleton
            style={{width:60,height:60}}/>
        </View>
        <View style={{flex:1,marginStart:SPACE._2lg,marginEnd:SPACE._2lg}}>
          <View>
            <MainSkeleton
              style={{width:'90%',height:15}}/>
          </View>
          <View style={{marginTop:SPACE.sm}}>
            <MainSkeleton
              style={{width:'50%',height:15}}/>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View>
            <MainSkeleton
              style={{borderRadius:BORDER_RADIUS.sm,height:30,width:30}}/>
          </View>
          <View style={{marginStart:SPACE._2xs,marginEnd:SPACE._2xs,justifyContent:'center',alignItems:'center'}}>
            <MainSkeleton
              style={{borderRadius:BORDER_RADIUS.sm,height:10,width:10}}/>
          </View>
          <View>
            <MainSkeleton
              style={{borderRadius:BORDER_RADIUS.sm,height:30,width:30}}/>
          </View>
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
