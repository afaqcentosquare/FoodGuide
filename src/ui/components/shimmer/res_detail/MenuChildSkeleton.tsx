import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS,SPACE } from "../../../../config/Dimens";
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';
import colors from "../../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const  MenuChildSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5];
  const {themedColors}  = usePreferredTheme();

  function MenuChildSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.mcsItemMainCont,props.style]}>
        <View style={[styles.mcsItemSubCont,{ backgroundColor:themedColors.cardBgColor}]}>
          <View style={styles.mcsItemHeartIconCont}>
            <MainSkeleton
              style={styles.mcsItemHeartIcon}/>
          </View>
          <View style={styles.mcsItemImgCont}>
            <MainSkeleton
              style={styles.mcsItemImg}/>
          </View>
          <View style={styles.mcsItemNameMainCont}>
            <View style={styles.mcsItemNameTxtCont}>
              <MainSkeleton
                style={styles.mcsItemNameTxt}/>
            </View>
            <View style={styles.mcsItemRateTxtCont}>
              <MainSkeleton
                style={styles.mcsItemRateTxt}/>
            </View>
            <View style={styles.mcsItemPriceTxtCont}>
              <MainSkeleton
                style={styles.mcsItemPriceTxt}/>
            </View>
          </View>
          <View style={styles.mcsItemAddBtnCont}>
            <MainSkeleton
              style={styles.mcsItemAddBtn}/>
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
        numColumns={2}
        renderItem={({item, index}) => MenuChildSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  mcsItemMainCont : {
    flex:1,
    maxWidth : '50%',
  },
  mcsItemSubCont : {
    flex:1,
    margin:SPACE.xs,
    borderRadius:BORDER_RADIUS.lg,
    paddingStart:SPACE._2xs,
    paddingEnd:SPACE._2xs,
    paddingTop:SPACE._2xs
  },
  mcsItemHeartIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  mcsItemHeartIcon : {
    height:25,
    width:25,
  },
  mcsItemImgCont : {
    justifyContent:'center',
    alignItems:'center'
  },
  mcsItemImg : {
    height:90,
    width:90,
    borderRadius:BORDER_RADIUS._8xl,
  },
  mcsItemNameMainCont : {
    margin:SPACE.sm,
    alignItems:'flex-start'
  },
  mcsItemNameTxtCont : {
    marginTop:SPACE._2lg
  },
  mcsItemNameTxt : {
    height:12,
    width:110
  },
  mcsItemRateTxtCont : {
    marginTop:SPACE.xs
  },
  mcsItemRateTxt : {
    height:12,
    width:85
  },
  mcsItemPriceTxtCont : {
    marginTop:SPACE.xs
  },
  mcsItemPriceTxt : {
    height:12,
    width:55
  },
  mcsItemAddBtnCont : {
    marginEnd:SPACE._2md,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2md,
    alignItems:'flex-end'
  },
  mcsItemAddBtn : {
    width:20,
    height:20,
    borderRadius:BORDER_RADIUS._2xs,
  }
})
