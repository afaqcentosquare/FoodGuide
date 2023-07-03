import React from "react";
import { FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS,SPACE } from "../../../../config/Dimens";
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const  HomeTrendSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3];
  const {themedColors}  = usePreferredTheme();

  function HomeTrendSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.htsItemMainCont,props.style,{
        backgroundColor:themedColors.cardBgColor,
        marginStart: index === 0 ? SPACE._2lg : SPACE.xs,
        marginEnd: index === length - 1 ?  SPACE._2lg : SPACE.xs}]}>
        <View style={styles.htsItemSubCont}>
          <View style={styles.htsItemHeartIconCont}>
            <MainSkeleton
              style={styles.htsItemHeartIcon}/>
          </View>
          <View style={styles.htsItemImgCont}>
            <MainSkeleton
              style={styles.htsItemImg}/>
          </View>
          <View style={styles.htsItemNameMainCont}>
            <View style={styles.htsItemNameTxtCont}>
              <MainSkeleton
                style={styles.htsItemNameTxt}/>
            </View>
            <View style={styles.htsItemRateTxtCont}>
              <MainSkeleton
                style={styles.htsItemRateTxt}/>
            </View>
            <View style={styles.htsItemPriceTxtCont}>
              <MainSkeleton
                style={styles.htsItemPriceTxt}/>
            </View>
          </View>
          <View style={styles.htsItemAddBtnCont}>
            <MainSkeleton
              style={styles.htsItemAddBtn}/>
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
        renderItem={({item, index}) => HomeTrendSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  htsItemMainCont : {
    width:130,
    borderRadius:BORDER_RADIUS.lg,
    marginBottom:SPACE._2lg,
    marginTop:SPACE._2lg,
  },
  htsItemSubCont : {
    flex:1,
    width:130,
  },
  htsItemHeartIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  htsItemHeartIcon : {
    height:25,
    width:25,
  },
  htsItemImgCont : {
    justifyContent:'center',
    alignItems:'center'
  },
  htsItemImg : {
    height:90,
    width:90,
    borderRadius:BORDER_RADIUS._8xl,
  },
  htsItemNameMainCont : {
    margin:SPACE.sm,
    alignItems:'flex-start'
  },
  htsItemNameTxtCont : {
    marginTop:SPACE._2lg
  },
  htsItemNameTxt : {
    height:12,
    width:110
  },
  htsItemRateTxtCont : {
    marginTop:SPACE.xs
  },
  htsItemRateTxt : {
    height:12,
    width:85
  },
  htsItemPriceTxtCont : {
    marginTop:SPACE.xs
  },
  htsItemPriceTxt : {
    height:12,
    width:55
  },
  htsItemAddBtnCont : {
    marginEnd:SPACE._2md,
    marginTop:SPACE._2lg,
    marginBottom:SPACE._2md,
    alignItems:'flex-end'
  },
  htsItemAddBtn : {
    width:20,
    height:20,
    borderRadius:BORDER_RADIUS._2xs,
  }
})
