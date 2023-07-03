import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from './AppText';
import { Fonts } from "../../config";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../config/Dimens";
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';

type Props = {
    iconType? : any,
    iconName? : string,
    iconTxt? : string,
    iconSize? : number,
    numberOfLines? : number,
    iconTxtStyle? : any
}

export const IconText = React.memo<Props>((props) =>
{
    const {themedColors}  = usePreferredTheme()
    const {
        iconTxtStyle,
        iconSize,
        iconName,
        iconTxt,
        numberOfLines
    } = props

    return(
      <View style={styles.iconTxtMainCont}>
          <View style={[styles.iconCont,{backgroundColor:themedColors.iconBgColor}]}>
              <props.iconType
                color={themedColors.primaryIconColor}
                size={iconSize}
                name={iconName}/>
          </View>
          <View style={styles.iconTxtCont}>
              <AppText
                numberOfLine={numberOfLines}
                style={[styles.iconTxt,iconTxtStyle,{color : themedColors.secondaryTxtColor}]}
                text={iconTxt}/>
          </View>
      </View>

    )
})

const styles = StyleSheet.create({
    iconTxtMainCont : {
        flexDirection:'row',
        alignItems:'center',
        paddingStart:2,
    },
    iconCont : {
        borderRadius:BORDER_RADIUS._8xl,
        height:30,
        width:30,
        justifyContent:'center',
        alignItems:'center'
    },
    iconTxtCont : {
        flex:1,
        marginStart:SPACE.sm,
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    iconTxt : {
        fontFamily:Fonts.semi_bold,
        paddingStart:2,
        fontSize:FONT_SIZE.xs,
    }
})
