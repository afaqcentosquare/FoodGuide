import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import usePreferredTheme from '../../../hooks/theme/usePreferredTheme';

type Props = {
    style? : any
}

export const MainSkeleton = React.memo<Props>((props) =>
{
    const opacity = useRef(new Animated.Value(0.3));
    const {themedColors}  = usePreferredTheme()

    useEffect(() =>
    {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue : 1,
                    useNativeDriver : true,
                    duration : 500}),

                Animated.timing(opacity.current, {
                    toValue : 0.3,
                    useNativeDriver : true,
                    duration : 800})
            ])
        ).start();

    },[])

    return(
        <Animated.View style={[{opacity:opacity.current,borderRadius:80,backgroundColor : themedColors.skeletonContentColor},styles.skillsSkeleton,props.style]}/>
    )
})

const styles = StyleSheet.create({
    skillsSkeleton : {
        width:180
    }
})
