import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { InboxItem } from "./InboxItem";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { TextHeader } from "../../components/headers/TextHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { NoDataTxt } from "../../components/NoDataTxt";
import { NoInternetConnection } from "../../components/NoInternetConnection";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

export const InboxView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    inboxTitle,
    noInboxDataTxt
  } = Strings
  const {
    inboxList,
    inboxLoad,
    checkInboxInternetConnection
  } = useSelector((state: RootState) => state.Inbox);

  return(
    <View style={[styles.inboxMainCont,{backgroundColor:themedColors.bgColor}]}>
      <View  style={[styles.profileHeadMainCont,{backgroundColor:themedColors.primaryColor}]}>
        <TextHeader
          titleTxtVisible={true}
          title={inboxTitle}/>
      </View>
      {!checkInboxInternetConnection &&
        <View style={styles.inboxErrorCont}>
          <NoInternetConnection />
        </View>}
      {checkInboxInternetConnection && !inboxLoad && inboxList.length === 0 &&
        <View style={styles.inboxErrorCont}>
          <NoDataTxt
            noDataTxt={noInboxDataTxt}/>
        </View>}
      {checkInboxInternetConnection && !inboxLoad && inboxList.length > 0 &&
        <View style={[styles.inboxListCont, { backgroundColor: themedColors.bgColor }]}>
          <FlatList
            data={inboxList}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              <InboxItem
                item={item}
                length={inboxList?.length}
                index={index} />}
            keyExtractor={(item, index) => index.toString()} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  profileHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  inboxMainCont : {
    flex:1,
  },
  inboxHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2lg,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  inboxHeadInputMainCont : {
    marginTop:SPACE._2md,
    marginBottom:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  inboxHeadInputTxtCont : {
    height:40,
  },
  inboxListCont : {
    flex:1,
  },
  inboxErrorCont : {
    flex:1
  }
})
