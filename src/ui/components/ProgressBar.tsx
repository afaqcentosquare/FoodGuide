import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type Props = {}

export const ProgressBar = React.memo<Props>((props) =>
{
    return(
        <View style={styles.progressBarCont}>
            <ActivityIndicator
                animating={true}
                size="large"
                color="red"/>
        </View>
    )
})

const styles = StyleSheet.create({
    progressBarCont : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})