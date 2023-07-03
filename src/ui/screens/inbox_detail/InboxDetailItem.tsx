import React from 'react';
import { StyleSheet, View } from "react-native";
import { AppText } from "../../components/AppText";
import colors from "../../../config/colors";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Fonts } from "../../../config";
import { inboxDetailObj } from "../../../models/res_model/InboxDetailModel";
import auth from "@react-native-firebase/auth";

type Props = {
  item : inboxDetailObj,
  index : number,
  length : number
}

export const InboxDetailItem = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { senderId,receiverId,msgTxt } = props.item

  return(
    <>
      {senderId === auth().currentUser?.uid ?
        <View style={[styles.idiSenderMainCont, { marginTop: props.index === 0 ? 3 : 3, marginBottom: props.index === props.length - 1 ?  3 : 3 }]}>
          <View style={styles.idiSenderSubCont}>
            <View style={[styles.idiSenderTxtCont,{backgroundColor: themedColors.cardBgColor,}]}>
              <AppText
                style={[styles.idiSenderTxt,{color:themedColors.black}]}
                text={msgTxt} />
            </View>
          </View>
        </View> :
        <View style={[styles.idiReceiverMainCont, { marginTop: props.index === 0 ? SPACE.xs : SPACE.xs, marginBottom: props.index === props.length - 1 ?  SPACE.xs : 2 }]}>
          <View style={styles.idiReceiverSubCont}>
            <View style={[styles.idiReceiverTxtCont,{backgroundColor: themedColors.commonBtnColor}]}>
              <AppText
                style={[styles.idiReceiverTxt,{color:themedColors.white}]}
                text={props.item.msgTxt} />
            </View>
          </View>
        </View>
      }
    </>
  )
})

const styles = StyleSheet.create({
  idiSenderMainCont : {
    flex:1,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  idiSenderSubCont : {
    width: "80%",
    alignItems: "flex-end",
    justifyContent:'flex-end'
  },
  idiSenderTxtCont : {
    paddingEnd:SPACE._2lg,
    paddingStart:SPACE._2lg,
    paddingTop:SPACE.md,
    paddingBottom:SPACE.md,
    borderRadius: BORDER_RADIUS.xl
  },
  idiSenderTxt : {
    lineHeight:16,
    fontSize:FONT_SIZE.xs,
    fontFamily:Fonts.semi_bold,
  },
  idiReceiverMainCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    alignItems:'flex-start',
    justifyContent:'flex-start',
  },
  idiReceiverSubCont : {
    width: "80%",
    alignItems: "flex-start",
    justifyContent:'flex-start'
  },
  idiReceiverTxtCont : {
    borderRadius: BORDER_RADIUS.xl,
    paddingEnd:SPACE._2lg,
    paddingStart:SPACE._2lg,
    paddingTop:SPACE.md,
    paddingBottom:SPACE.md,
  },
  idiReceiverTxt : {
    lineHeight:16,
    fontSize:FONT_SIZE.xs,
    fontFamily:Fonts.semi_bold,
  }

})

