import React, { FC, useEffect, useRef } from "react";
import { InboxDetailView } from "./InboxDetailView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import Helper from '../../../helper/Helper';
import { useAppDispatch } from "../../../redux";
import {
  setInboxDetailList,
  setInboxDetailMsgTxt,
  setInboxResProfileData,
} from "../../../redux/slice/InboxDetailSlice";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { inboxDetailObj } from "../../../models/res_model/InboxDetailModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { BackHandler, FlatList } from "react-native";
import Snackbar from "react-native-snackbar";

type Props = {}

type inboxDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const InboxDetailController : FC<Props> = () =>
{
  const navigation = useNavigation<inboxDetailNavProp>();
  // @ts-ignore
  const route = useRoute<resDetailNavProp['resId']>();
  const resId = route.params.resId ;
  const dispatch = useAppDispatch();
  const { inboxDetailMsgTxt } = useSelector((state: RootState) => state.InboxDetail);
  const flatListRef = useRef<FlatList>(null);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getInboxResInfo()
  {
    Helper.getRestaurantData(resId)
      .then((result : any) =>
      {
        dispatch(setInboxResProfileData(result))
      })
  }

  function sendMessage()
  {
    try
    {
      if(inboxDetailMsgTxt != '')
      {
        const userId : any = auth().currentUser?.uid;
        const inboxDetailRef =
          database()
            .ref()
            .child("Chats")
            .push()

        const inboxDetailObj = {
          inboxId : inboxDetailRef.key,
          senderId : userId,
          receiverId : resId,
          msgTxt : inboxDetailMsgTxt,
          msgType : "text",
        }

        inboxDetailRef.set(inboxDetailObj)
          .then(() =>
          {
            flatListRef.current?.scrollToIndex({ index : 0,animated : true })
            dispatch(setInboxDetailMsgTxt(''))
            makeFriend()
          });
      }
      else
      {
        Snackbar.show({ text:"Message field cannot be empty", duration: Snackbar.LENGTH_LONG, });
      }
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function makeFriend()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const inboxDetailRef =
        database()
          .ref()
          .child("Friends")
          .child(userId)
          .child(resId)

      const inboxDetailObj = {
        inboxId : inboxDetailRef.key,
        senderId : userId,
        receiverId : resId,
        msgTxt : inboxDetailMsgTxt,
      }

      inboxDetailRef.set(inboxDetailObj)
        .then(() =>
        {
          dispatch(setInboxDetailMsgTxt(''))
        });

      //---------------------- res friend ----------------------

      const inboxDetailRef1 =
        database()
          .ref()
          .child("Friends")
          .child(resId)
          .child(userId)

      const inboxDetailObj1 = {
        inboxId : inboxDetailRef.key,
        senderId : resId,
        receiverId : userId,
        msgTxt : inboxDetailMsgTxt,
      }

      inboxDetailRef1.set(inboxDetailObj1)
        .then(() =>
        {
          dispatch(setInboxDetailMsgTxt(''))
        });
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function getInboxDetailList()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const inboxDetailRef =
        database()
          .ref()
          .child("Chats")

      inboxDetailRef.on('value', (inboxDetailSnap)  =>
      {
        //dispatch(setInboxDetailList([]))

        let inboxDetailArr : Array<inboxDetailObj>  = []

        // @ts-ignore
        inboxDetailSnap.forEach((inboxDetailChildSnap) =>
        {
          let receiveId = inboxDetailChildSnap.child("receiverId").val();
          let sendId = inboxDetailChildSnap.child("senderId").val();
          if(receiveId === userId && sendId === resId ||
            receiveId === resId && sendId === userId)
          {
            inboxDetailArr.push(inboxDetailChildSnap.val())
          }
        })

        dispatch(setInboxDetailList(inboxDetailArr.reverse()))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }

  }

  useEffect(() =>
  {
    getInboxDetailList()
    getInboxResInfo()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <InboxDetailView
      flatListRef={flatListRef}
      sendMsgBtnClick={() => sendMessage()}/>
  )
}

export default InboxDetailController ;
