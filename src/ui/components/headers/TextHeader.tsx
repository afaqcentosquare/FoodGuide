import React from 'react';
import {AppText} from "../AppText";
import { StyleProp, StyleSheet, TextStyle,View } from "react-native";
import { Fonts } from "../../../config";
import { FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from '../../../hooks/theme/usePreferredTheme';

type Props = {
    title? : string,
    titleTxtVisible? : boolean,
    style? : StyleProp<TextStyle>,
    txtHeadCont? : StyleProp<TextStyle>,
}

export const TextHeader = React.memo<Props>((props) =>
{
    const {themedColors}  = usePreferredTheme()

    return(
      <View style={[styles.textHeaderCont,props.txtHeadCont,{backgroundColor:themedColors.primaryColor}]}>
          <View style={styles.textHeaderTitleTxtCont}>
              <AppText
                style={[styles.textHeaderTitleTxt,{color:themedColors.primaryTxtColor}]}
                text={props.title} />
          </View>
      </View>
    )
})

const styles = StyleSheet.create({
    textHeaderCont : {
        paddingStart:SPACE._2lg,
        paddingEnd:SPACE._2lg,
        flexDirection:'row',
        alignItems : 'center',
    },
    textHeaderTitleTxtCont : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textHeaderTitleTxt : {
        fontFamily: Fonts.bold,
        fontSize: FONT_SIZE.base,
    }
})
