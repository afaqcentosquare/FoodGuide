import React from 'react';
import {StyleSheet, useWindowDimensions,Animated, View} from "react-native";
import {SlidesObj} from "../../../models/dummy_model/OnBoardModel";

type Props = {
    data : SlidesObj[],
    scrollX : any
}

export const Paginator = React.memo<Props>((props) =>
{
    const { width } = useWindowDimensions();

    return(
        <View style={styles.dotContainer}>
            {
                props.data.map((_ : SlidesObj,i : number) =>
                {
                    const inputRange = [(i - 1) * width,i * width,(i + 1) * width];

                    const dotWidth = props.scrollX.interpolate({
                        inputRange,
                        outputRange : [10,20,10],
                        extrapolate : 'clamp'
                    })

                    const opacity = props.scrollX.interpolate({
                        inputRange,
                        outputRange : [0.3,1,0.3],
                        extrapolate : 'clamp'
                    })

                    return <Animated.View style={[styles.dot,{width : dotWidth,opacity}]} key={i}/>
                })
            }
        </View>
    )
})

const styles = StyleSheet.create({
    dotContainer :
        {
            flexDirection : 'row',
            width:'100%',
            bottom:0,
            left:0,
            alignItems:'center',
        },
    dot : {
        height : 10,
        borderRadius : 5,
        backgroundColor : '#493d8a',
        marginHorizontal : 6,
    }
})
