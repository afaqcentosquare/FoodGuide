import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { MainSkeleton } from "./MainSkeleton";
import { BORDER_RADIUS, height, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const VideoSkeleton = React.memo<Props>((props) =>
{
  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2];

  function VideoSkelItem(length : number,index : number)
  {
    return(
      <View style={{
        flex:1,height:Dimensions.get('screen').height,
        borderRadius:BORDER_RADIUS.lg,
        backgroundColor:colors.colors.white,
        marginTop: index === 0 ? 15 : 15,
        marginBottom: index === length - 1 ?  15 : 15 }}>
        <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,flex:1,justifyContent:'center',alignItems:'center'}}>
          <MainSkeleton
            style={{height:50,width:50}}/>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:1,marginStart:SPACE._2lg,marginBottom:SPACE._2lg,marginEnd:SPACE._2lg,justifyContent:'flex-end'}}>
            <View style={{borderRadius:BORDER_RADIUS.lg,padding:15,backgroundColor:colors.colors.grey1}}>
              <View style={{flexDirection:'row'}}>
                <View>
                  <MainSkeleton
                    style={{backgroundColor:colors.colors.white,height:50,width:50}}/>
                </View>
                <View style={{flex:1,marginStart:SPACE._2lg,justifyContent:'center'}}>
                  <View>
                    <MainSkeleton
                      style={{backgroundColor:colors.colors.white,height:12,width:"100%"}}/>
                  </View>
                  <View style={{marginTop:SPACE.xs}}>
                    <MainSkeleton
                      style={{backgroundColor:colors.colors.white,height:12,width:'50%'}}/>
                  </View>
                </View>
              </View>
              <View style={{marginTop:SPACE._2lg,flexDirection:'row'}}>
                <View>
                  <MainSkeleton
                    style={{backgroundColor:colors.colors.white,height:20,width:60}}/>
                </View>
                <View style={{flex:1,marginStart:SPACE._2md}}>
                  <MainSkeleton
                    style={{backgroundColor:colors.colors.white,height:20,width:60}}/>
                </View>
              </View>
              <View style={{marginTop:SPACE._2md}}>
                <MainSkeleton
                  style={{backgroundColor:colors.colors.white,height:20,width:80}}/>
              </View>
              <View style={{marginTop:SPACE._2md}}>
                <View>
                  <MainSkeleton
                    style={{backgroundColor:colors.colors.white,height:12,width:"100%"}}/>
                </View>
                <View style={{marginTop:SPACE._2xs}}>
                  <MainSkeleton
                    style={{backgroundColor:colors.colors.white,height:12,width:"70%"}}/>
                </View>
                <View style={{marginTop:SPACE._2xs}}>
                  <MainSkeleton
                    style={{backgroundColor:colors.colors.white,height:12,width:"40%"}}/>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginBottom:SPACE._4xl,marginEnd:SPACE._2lg,justifyContent:'flex-end'}}>
            <View style={{marginBottom:SPACE._2lg}}>
              <View>
                <MainSkeleton style={{height:45,width:45}}/>
              </View>
              <View style={{marginTop:SPACE.sm}}>
                <MainSkeleton style={{height:12,width:45}}/>
              </View>
            </View>
            <View style={{marginBottom:SPACE._2lg}}>
              <View>
                <MainSkeleton style={{height:45,width:45}}/>
              </View>
              <View style={{marginTop:SPACE.sm}}>
                <MainSkeleton style={{height:12,width:45}}/>
              </View>
            </View>
            <View style={{marginBottom:SPACE._2lg}}>
              <View>
                <MainSkeleton style={{height:45,width:45}}/>
              </View>
              <View style={{marginTop:SPACE.sm}}>
                <MainSkeleton style={{height:12,width:45}}/>
              </View>
            </View>
            <View style={{marginBottom:SPACE._2lg}}>
              <View>
                <MainSkeleton style={{height:45,width:45}}/>
              </View>
              <View style={{marginTop:SPACE.sm}}>
                <MainSkeleton style={{height:12,width:45}}/>
              </View>
            </View>
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
        pagingEnabled={true}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        renderItem={({item, index}) => VideoSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTopResSkelItemIcon : {
    borderRadius:BORDER_RADIUS.lg,
    width:'100%',
    height:150
  },
})
