import React from 'react';
import { StyleSheet, View } from "react-native";
import { Screens } from "../../components/Screens";
import { BottomNavRoutes } from "../../../routes/bottom_nav_routes/BottomNavRoutes";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";

type Props = {}

export const MainScreen = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
        <BottomNavRoutes/>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({

})
