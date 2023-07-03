import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StatusBar, StyleSheet, View } from "react-native";
import { BORDER_RADIUS } from "../../../config/Dimens";
import Video from "react-native-video";

type Props = {
  foodVideoUrl : string
}

export const FoodVideoView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <View style={{flex:1,backgroundColor:themedColors.bgColor,borderRadius:BORDER_RADIUS.xl}}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={"rgba(0,0,0,0)"}/>
      <Video
        resizeMode={'cover'}
        repeat={true}
        fullscreen={false}
        disableFocus={true}
        playWhenInactive={false}
        onPlaybackResume={() => true}
        style={StyleSheet.absoluteFill}
        source={{uri : props.foodVideoUrl}}/>
      <View>
        <View>

        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({

})
