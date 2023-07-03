import React from 'react';
import {AppText} from './AppText';
import {StyleSheet, View} from 'react-native';
import { Fonts } from "../../config";
import {FONT_SIZE, SPACE} from '../../config/Dimens';
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';
import { AppButton } from './AppButton';
import LottieView from 'lottie-react-native';
import strings from "../../config/languages/LocalizedStrings";
import { ImagesPath } from "../../config/ImagesPath";

type Props = {
  reloadBtnClick? : () => void,
  noDataTxt? : string,
  reloadBtnVisible? : boolean,
  noMoreDataVisible? : boolean
}

export const NoDataTxt = React.memo<Props>((props) =>
{
    const {themedColors}  = usePreferredTheme()
    const { noMoreDataVisible } = props
  const Strings = strings;
  const {
    oopsTxt,
    noDataReloadBtnTxt
  } = Strings

    return(
        <View style={styles.noDataTxtMainCont}>
            {noMoreDataVisible ?
              <View style={styles.noDataImg}>
                <LottieView
                  source={ImagesPath.noMoreData}
                  autoPlay
                  loop />
              </View> :
              <View style={styles.noDataImg}>
                <LottieView
                  source={ImagesPath.noDatFound}
                  autoPlay
                  loop />
              </View>}
            <View style={styles.noDataTxtCont}>
                <AppText
                  style={[styles.noDataTxt1,{color:themedColors.primaryTxtColor}]}
                  text={oopsTxt}/>
            </View>
            <View style={styles.noDataTxtCont}>
                <AppText
                    style={[styles.noDataTxt2,{color:themedColors.secondaryTxtColor}]}
                    text={props.noDataTxt}/>
            </View>
            {props.reloadBtnVisible &&
              <View style={styles.noDataTxtMargTop}>
                <AppButton
                  onPress={props.reloadBtnClick}
                  btnContStyle={[styles.noDataBtnTxt]}
                  text={noDataReloadBtnTxt} />
              </View>}
        </View>
    )
})

const styles = StyleSheet.create({
  noDataTxtMainCont : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  noDataImg : {
    height:160,
    width:160
  },
  noDataTxtCont : {
    marginTop : SPACE._2xs
  },
  noDataTxt2 : {
    fontFamily : Fonts.semi_bold,
    fontSize : FONT_SIZE.lg,
    paddingStart:SPACE._2xl,
    paddingEnd:SPACE._2xl,
    textAlign:'center'
  },
  noDataTxtMargTop : {
    marginTop:SPACE._2xl
  },
  noDataTxt1 : {
    fontFamily : Fonts.bold,
    fontSize : FONT_SIZE._2xl,
    paddingStart:SPACE._2xl,
    paddingEnd:SPACE._2xl,
    textAlign:'center',
  },
  noDataBtnTxt : {
    paddingStart:SPACE._2xl,
    paddingEnd:SPACE._2xl,
    height:40,
  }
})
