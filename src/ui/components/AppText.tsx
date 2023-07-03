import React from 'react';
import
{
  Text,
  StyleSheet
} from "react-native";
import { Fonts } from "../../config";
import { FONT_SIZE } from "../../config/Dimens";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";

type Props =
  {
    text? : string,
    numberOfLine? : number,
    style? : any,
  }

export const AppText = React.memo<Props>((props) =>
  {
    const {themedColors} = usePreferredTheme();

    return (
      <Text
        style={[styles.appTxt,props.style]}
        numberOfLines={props.numberOfLine}>
        {props.text}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  appTxt: {
    letterSpacing : 0.5,
    fontFamily:Fonts.semi_bold,
    includeFontPadding:false,
    fontSize:FONT_SIZE.xs,
  }
})
