import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import colors from "../../config/colors";

type Props = {
    style? : StyleProp<TextStyle>
}

export const ViewLine = React.memo<Props>((props) =>
{
    return(
        <View style={[styles.viewLine,props.style]}/>
    )
})

const styles = StyleSheet.create({
    viewLine : {
        backgroundColor:colors.colors.viewLine,
        height:1,
        borderRadius:8
    }
})
