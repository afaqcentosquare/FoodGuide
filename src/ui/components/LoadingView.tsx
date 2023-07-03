import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {}

export const LoadingView = React.memo<Props>((props) =>
{
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <LottieView style={{height:120,width:120}} source={require('../../assets/images/loading_data.json')} autoPlay loop />
        </View>
    )
})

const styles = StyleSheet.create({

})
