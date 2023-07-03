import React from 'react';
import {NativeModules, Platform, StatusBar, StatusBarProps, StyleProp, StyleSheet,View} from 'react-native';
import colors from '../../config/colors';
const {StatusBarManager} = NativeModules;

type Props = {
    style? : StyleProp<StatusBarProps> | undefined,
    statusBarColor : string
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? null : StatusBarManager.HEIGHT ;
export const StatusBars = React.memo<Props>((props) =>
{
    return(
        <View style={{height:APPBAR_HEIGHT,backgroundColor:props.statusBarColor}}>
            <StatusBar
                animated={true}
                backgroundColor={props.statusBarColor}
                barStyle={'dark-content'}
                translucent={true}/>
        </View>
    )
})

const styles = StyleSheet.create({
    statusBarMainCont : {
        width: "100%",
        height: APPBAR_HEIGHT,
    }
})
