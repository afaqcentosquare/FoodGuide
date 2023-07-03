import React, { FC, useEffect, useRef, useState } from "react";
import { AddResReviewView } from "./AddResReviewView";
import { useAppDispatch } from "../../../redux";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import Helper from "../../../helper/Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import {
  setEdtResReviewRating, setEdtResReviewResImg, setEdtResReviewResName,
  setEdtResReviewTxt,
  setResReviewList,
  setResReviewLoad,
  setShowResReviewSheet,
} from "../../../redux/slice/ResReviewSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import BottomSheet from "@gorhom/bottom-sheet";
import { setEdtFoodReviewResImg, setEdtFoodReviewResName } from "../../../redux/slice/FoodReviewSlice";

type Props = {}

type resReviewNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddResReviewController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  // @ts-ignore
  const route = useRoute<resReviewNavProp['resId']>();
  const resId = route.params.resId;
  const resReviewSheetRef = useRef<BottomSheet>(null)
  const { edtResReviewTxt,edtResReviewRating } = useSelector((state: RootState) => state.ResReview);
  const [resRating,setResRating] = useState(0)

  function getResData()
  {
    Helper.getRestaurantData(resId)
      .then((result : any) =>
      {
        dispatch(setEdtResReviewResImg(result.resImg))
        dispatch(setEdtResReviewResName(result.name))
      })
  }

  function addResReviewBtn()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const resReviewRef = database().ref()
        .child("Reviews")
        .child("Restaurant")
        .child(resId)
        .push()

      const resReviewObj = {
        userId : userId,
        resReviewKey : resReviewRef.key,
        resId: resId,
        rating : edtResReviewRating,
        review : edtResReviewTxt
      }

      resReviewRef
        .set(resReviewObj)
        .then(() =>
        {
          updateResRating()
          getResReviews()
          dispatch(setResReviewLoad(false))
          dispatch(setShowResReviewSheet(false))
          dispatch(setEdtResReviewTxt(''))
          dispatch(setEdtResReviewRating(0))
        });

    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  }

  function getResReviews()
  {
    Helper.getResReviews(resId)
      .then((result : any) =>
      {
        if(result.length != 0)
        {
          let rateCount = 0 ;
          for (let i = 0 ; i < result.length ; ++i)
          {
            rateCount += result[i].rating
          }
          setResRating(rateCount / result.length )
        }
        else
        {
          setResRating(0)
        }
        dispatch(setResReviewList(result))
        dispatch(setResReviewLoad(false))
        dispatch(setShowResReviewSheet(false))
      })
  }

  function updateResRating()
  {
    setResRating(resRating + edtResReviewRating)

    database()
      .ref()
      .child("ResProfile")
      .child(resId)
      .update({rating : parseFloat(resRating.toFixed(1))})
      .then((result : any) =>
      {
        if(parseFloat(resRating.toFixed(1)) >= 4.0)
        {
          const homeTopResRef =
            database().ref()
              .child("Home")
              .child("TopRes")
              .child(resId)

          const topResObj = {
            resId : resId,
          }

          homeTopResRef.set(topResObj)
            .then(() =>
            {

            });
        }
      })
  }

  useEffect(() =>
  {
    getResData()
    getResReviews()
  },[])

  return(
    <AddResReviewView
      resReviewSheetRef={resReviewSheetRef}
      submitResReviewClick={() => addResReviewBtn()}/>
  )
}

export default AddResReviewController ;
