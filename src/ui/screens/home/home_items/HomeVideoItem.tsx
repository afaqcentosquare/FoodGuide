import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import { Image, StyleSheet, View } from "react-native";
import { BORDER_RADIUS, SPACE } from "../../../../config/Dimens";
import { videoObj } from "../../../../models/res_model/HomeModel";

type Props = {
  item : videoObj,
  index : number,
  length : number,
}

export const HomeVideoItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={[styles.hvItemMainCont,{
      marginStart : props.index === 0 ? SPACE._2lg : SPACE.xs,
      marginEnd: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs,}]}>
      <View>
        <Image
          style={[styles.hvItemImg,{backgroundColor:themedColors.cardBgColor}]}
          source={{uri : props.item.postThumbNail}}/>
      </View>
      <View style={styles.hvItemIconMainCont}>
        <View style={[styles.hvItemPlayIconCont,{backgroundColor:themedColors.iconBgColor,}]}>
          <Ionicons
            color={themedColors.primaryIconColor}
            name={"play"}
            size={22}/>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  hvItemMainCont : {
    width:150,
    marginTop:SPACE.md,
    marginBottom:SPACE.md,
    borderRadius:BORDER_RADIUS.lg,
  },
  hvItemImg : {
    width:150,
    height:280,
    resizeMode:'cover',
    borderRadius:BORDER_RADIUS.lg,
  },
  hvItemIconMainCont : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
  },
  hvItemPlayIconCont : {
    height:40,
    width:40,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  }
})
