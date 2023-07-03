import React, { useState } from "react";
import
{
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle, TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "../../config";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../config/Dimens";
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';
import { AppText } from './AppText';

type Props =
  {
    edtStartIconVisible? : boolean,
    edtStartIconType? : any,
    edtStartIconName? : string,
    edtStartIconSize? : number,
    edtEndIconVisible? : boolean,
    edtEndIconType? : any,
    edtEndIconName?: string,
    edtEndIconSize?: number,
    hint? : string,
    visible? : boolean,
    edtLabelTxt? : string,
    edtLabelVisible? : boolean
    valueToShowAtStart? : string,
    onChangeText? : (e: string) => void,
    edtLabelTxtStyle? : StyleProp<TextStyle>,
    txtInputContStyle? : StyleProp<TextStyle>,
    txtInputStyle? : StyleProp<TextStyle>,
    dropDownIconStyle? : any,
    secureTxtEntry? : boolean,
    multiLine? : boolean,
    locIconVisible? : boolean,
    editable? : boolean,
    maxLength? : any,
    keyboardType? : any,
    endIconClick? : () => void,
  }


export const InputText = React.memo<Props> ((props) =>
{
  const {themedColors}  = usePreferredTheme();
  const {
    edtLabelTxt,
    edtLabelVisible,
    txtInputContStyle,
    txtInputStyle,
    edtStartIconName,
    edtStartIconSize,
    edtEndIconVisible,
    edtEndIconName,
    edtEndIconSize,
    edtLabelTxtStyle,
    valueToShowAtStart,
    onChangeText,
    maxLength,
    multiLine,
    editable,
    keyboardType,
    hint,
    secureTxtEntry
  } = props
  const [valueText, setValueText] = useState(valueToShowAtStart);


  return (
    <View>
      {edtLabelVisible &&
        <View>
          <AppText
            style={[styles.inputLabelTxt,edtLabelTxtStyle,{color:themedColors.primaryTxtColor}]}
            text={edtLabelTxt}/>
        </View>}
      <View style={[styles.inputTxtContainer,txtInputContStyle]}>
        {props.edtStartIconVisible &&
          <props.edtStartIconType
            /*style={{paddingBottom:Platform.OS === 'ios' ? 1 : 1}}*/
            name={edtStartIconName}
            size={edtStartIconSize}
            color={themedColors.primaryIconColor}/>}
        <TextInput
          value={valueText}
          multiline={multiLine}
          maxLength={maxLength}
          editable={editable}
          keyboardType={keyboardType}
          style={[styles.inputTxt,txtInputStyle,{color:themedColors.editTxtColor}]}
          placeholder={hint}
          secureTextEntry={secureTxtEntry}
          onChangeText={(e: string) => {
            onChangeText?.(e)
            setValueText(e)
          }}/>
        {edtEndIconVisible &&
          <TouchableOpacity
            onPress={props.endIconClick}
            activeOpacity={0.6}>
            <props.edtEndIconType
              name={edtEndIconName}
              size={edtEndIconSize}
              color={themedColors.primaryIconColor}/>
          </TouchableOpacity>}
      </View>
    </View>

  );
});

const styles = StyleSheet.create({
  inputLabelTxt : {
    fontSize:FONT_SIZE.xs,
    fontFamily:Fonts.bold,
  },
  inputTxtContainer: {
    flexDirection:'row',
    borderRadius:BORDER_RADIUS._8xl,
    alignItems:'center',
    paddingStart : SPACE._2lg,
    paddingEnd:SPACE._2lg,
  },
  inputTxt: {
    flex:1,
    textAlignVertical:'center',
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    paddingStart : SPACE._2md,
    paddingEnd:SPACE._2lg,
  }
});
