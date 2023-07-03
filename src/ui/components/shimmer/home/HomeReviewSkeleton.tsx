import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS, FONT_SIZE, SPACE, width } from "../../../../config/Dimens";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';
import colors from "../../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const  HomeReviewSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function HomeReviewSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeReviewSkelItemMainCont,props.style,{marginTop: index === 0 ? 15 : 6,marginBottom: index === length - 1 ?  15 : 6}]}>
        <View style={{alignItems:'center',flexDirection:'row'}}>
          <View>
            <MainSkeleton
              style={{ width:65,
                height:65,
                borderRadius:BORDER_RADIUS._8xl}}/>
          </View>
          <View style={{marginStart:SPACE._2lg}}>
            <View>
              <MainSkeleton
                style={{ width:250, height:15, }}/>
            </View>
            <View style={{marginTop:SPACE.sm}}>
              <MainSkeleton
                style={{ width:120, height:15, }}/>
            </View>
            <View style={{marginTop:SPACE.sm}}>
              <MainSkeleton
                style={{ width:250, height:15, }}/>
            </View>
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
        renderItem={({item, index}) => HomeReviewSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeReviewSkelItemMainCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },

})
