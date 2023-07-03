import React from "react";
import { FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS, SPACE } from "../../../../config/Dimens";
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const  MenuParentSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6,7];
  const {themedColors}  = usePreferredTheme();

  function MenuParentSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.mpsItemMainCont,props.style,{
        backgroundColor:themedColors.cardPrimaryColor,
        marginTop: index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom: index === length - 1 ?  SPACE._2lg : SPACE.xs}]}>
        <View style={styles.mpsItemSubCont}>
          <View>
            <MainSkeleton
              style={styles.mpsItemImg}/>
          </View>
          <View style={styles.mpsItemCatTxtCont}>
            <MainSkeleton
              style={styles.mpsItemCatTxt}/>
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
        renderItem={({item, index}) => MenuParentSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  mpsItemMainCont : {
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    borderRadius:BORDER_RADIUS.lg,
  },
  mpsItemSubCont : {
    paddingStart:SPACE._2md,
    paddingEnd:SPACE._2md,
    paddingBottom:SPACE._2lg,
    paddingTop:SPACE.md,
    justifyContent:'center',
    alignItems:'center'
  },
  mpsItemImg : {
    height:40,
    width:40
  },
  mpsItemCatTxtCont : {
    marginTop:SPACE.sm
  },
  mpsItemCatTxt : {
    height:10,
    width:40
  }

})
