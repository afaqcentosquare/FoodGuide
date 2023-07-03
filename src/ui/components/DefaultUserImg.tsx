import React from 'react';
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { BORDER_RADIUS, SPACE } from "../../config/Dimens";
import colors from "../../config/colors";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";

type Props = {
  showAddIcon? : boolean
}

export const DefaultUserImg = React.memo<Props>((props) =>
{
  const {themedColors}  = usePreferredTheme()
  const {showAddIcon} = props

  return(
    <View>
      <View>
        <Ionicons
          color={"#006697"}
          size={130}
          name={"ios-person-circle-sharp"} />
      </View>
      {showAddIcon &&
        <View style={styles.addIconCont}>
          <Ionicons
            color={colors.colors.red}
            size={15}
            name={"ios-add"} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  addIconCont : {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
    backgroundColor: colors.colors.white,
    width: 25,
    height: 25,
    marginBottom:SPACE._2md,
    position: "absolute",
    bottom:0,
    right: 23,
  }
})
