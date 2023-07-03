import React from 'react' ;
import {Image, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import colors from "../../../config/colors";
import { AppText } from '../../components/AppText';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import { GILROY } from "../../../config";

type Props = {
    item : any
}

export const OnBoardItem = React.memo<Props>((props) =>
{
    const {width} = useWindowDimensions();
    const {themedColors} = usePreferredTheme();

    return(
        <View style={[styles.onBoardContainer,{width}]}>
            <Image source={props.item.image} style={[styles.onBoardImage,{width,resizeMode:'contain'}]}/>
            <View style={styles.onBoardDesContainer}>
                <AppText
                  style={[styles.onBoardTitleTxt,{color : themedColors.primaryTxtColor}]}
                  text={props.item.title}/>
                <AppText
                  style={[styles.onBoardDesTxt,{color : themedColors.secondaryTxtColor}]}
                  text={props.item.des}/>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
  onBoardContainer : {
    flex:1,
    backgroundColor:colors.colors.white,
    justifyContent:'center',
    alignItems:"center",
  },
  onBoardImage : {
    flex:0.6,
    justifyContent : 'center',
    alignItems:'center'
  },
  onBoardDesContainer: {
    flex:0.4,
    justifyContent:'center',
    alignItems:'center'
  },
  onBoardTitleTxt: {
    fontWeight:'600',
    fontFamily:GILROY.bold,
    fontSize:FONT_SIZE._3xl
  },
  onBoardDesTxt: {
    textAlign:'center',
    paddingStart:SPACE._4xl,
    paddingEnd:SPACE._4xl,
    includeFontPadding : false,
    paddingTop:SPACE._2xl,
    lineHeight:22,
    paddingBottom:SPACE._2xl,
    fontSize:FONT_SIZE.sm,
    fontFamily:GILROY.semi_bold
  },
})
