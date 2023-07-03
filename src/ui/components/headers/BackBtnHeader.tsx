import React from 'react';
import { StyleProp,StyleSheet,TextStyle,TouchableOpacity,View } from "react-native";
import {AppText} from "../AppText";
import { Fonts } from "../../../config";
import {StackNavigationProp} from "@react-navigation/stack";
import {AllScreenStackParamList} from "../../../routes/all_routes/AllScreenStack";
import {useNavigation} from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from '../../../hooks/theme/usePreferredTheme';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";

type Props = {
    title : string,
    searchIconVisible? : boolean,
    backBtnVisible? : boolean,
    backBtnHeaderCont? : StyleProp<TextStyle>,
    searchIconClick? : () => void,
    addIconVisible? : boolean,
    addIconClick? : () => void,
    backBtnClick? : () => void
}

type backBtnNavProp = StackNavigationProp<AllScreenStackParamList>;

export const BackBtnHeader = React.memo<Props>((props) =>
{
    const navigation = useNavigation<backBtnNavProp>();
    const {themedColors}  = usePreferredTheme();
    const lng = useSelector((state: RootState) => state.Lng);
    const { isRtl } = lng

    return(
      <View style={[styles.backBtnHeaderCont,props.backBtnHeaderCont,{backgroundColor:themedColors.primaryColor}]}>
          {props.backBtnVisible &&
            <TouchableOpacity
              style={[styles.backBtnIconCont,{backgroundColor:themedColors.iconBgColor}]}
              onPress={props.backBtnClick}
              activeOpacity={0.4}>
                {isRtl ?
                  <Octicons
                    name={"arrow-right"}
                    size={16}
                    color={themedColors.primaryIconColor} /> :
                  <Octicons
                    name={"arrow-left"}
                    size={16}
                    color={themedColors.primaryIconColor} />}
            </TouchableOpacity>}
          {props.searchIconVisible &&
            <View style={styles.backBtnIconCont}>
                <TouchableOpacity
                  onPress={props.searchIconClick}
                  activeOpacity={0.6}>
                    <Ionicons
                      name={'ios-search-outline'}
                      size={12}
                      color={themedColors.primaryIconColor}/>
                </TouchableOpacity>
            </View>}
          <View style={styles.backBtnHeaderTxtCont}>
              <AppText
                style={[styles.backBtnHeaderNameTxt,{color : themedColors.primaryTxtColor}]}
                text={props.title}/>
          </View>
      </View>
    )
});

const styles = StyleSheet.create({
    backBtnHeaderCont : {
        paddingTop:SPACE._2md,
        paddingBottom:SPACE._2md,
        alignItems:'center',
        flexDirection:'row',
        borderBottomLeftRadius:BORDER_RADIUS.xl,
        borderBottomRightRadius:BORDER_RADIUS.xl
    },
    backBtnIconCont : {
        height:33,
        width:33,
        borderRadius:BORDER_RADIUS._8xl,
        justifyContent:'center',
        alignItems:'center',
        marginStart:SPACE.md,
    },
    addBtnIconCont :  {
        alignItems:'center',
        justifyContent:'center',
        marginEnd:SPACE.lg,
    },
    backBtnHeaderTxtCont : {
        marginStart:SPACE._2lg,
        alignItems:'center',
        justifyContent:'center'
    },
    backBtnHeaderNameTxt : {
        fontFamily:Fonts.bold,
        includeFontPadding:true,
        textAlignVertical:'center',
        fontSize: FONT_SIZE.lg,
    },
})
