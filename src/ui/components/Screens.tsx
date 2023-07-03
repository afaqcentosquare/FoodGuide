import {SafeAreaView, StyleSheet, View} from 'react-native';
import colors from '../../config/colors';
import React from 'react';
import {StatusBars} from './StatusBars';
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';
type Props = {
    children : any,
    statusBarColor : string
}

export const Screens = React.memo<Props>((props) =>
{
    const {themedColors}  = usePreferredTheme()

    return(
        <SafeAreaView style={[styles.safeAreaCont,{backgroundColor : themedColors.primaryColor}]}>
            <StatusBars statusBarColor={props.statusBarColor} style={{backgroundColor:themedColors.primaryColor}}/>
            {props.children}
        </SafeAreaView>

    )
})

const styles = StyleSheet.create({
    safeAreaCont : {
        flex: 1,
    },
})
