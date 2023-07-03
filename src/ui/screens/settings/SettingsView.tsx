import React from 'react';
import { StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";

type Props = {}

export const SettingsView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
        <BackBtnHeader
          backBtnVisible={true}
          title={"Settings"}/>
        <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
          <View>

          </View>
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({

})
