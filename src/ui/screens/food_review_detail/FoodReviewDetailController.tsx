import React, { FC, useEffect, useRef, useState } from "react";
import { FoodReviewDetailView } from "./FoodReviewDetailView";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import {
  setEdtFoodReviewRating,
  setEdtFoodReviewResImg, setEdtFoodReviewResName, setEdtFoodReviewTxt,
  setFoodReviewList, setFoodReviewLoad, setShowFoodReviewSheet,
} from "../../../redux/slice/FoodReviewSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import Helper from "../../../helper/Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import BottomSheet from "@gorhom/bottom-sheet";
import Snackbar from "react-native-snackbar";
import { BackHandler } from "react-native";

type Props = {}

type foodReviewNavProp = StackNavigationProp<AllScreenStackParamList>;

const FoodReviewDetailController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<foodReviewNavProp>();
  // @ts-ignore
  const route = useRoute<foodReviewNavProp['foodInfo']>();
  const foodInfo = route.params.foodInfo;
  const foodReviewSheetRef = useRef<BottomSheet>(null)
  const {resId,parentCatId,foodId} = foodInfo;
  const {edtFoodReviewTxt,edtFoodReviewRating} = useSelector((state: RootState) => state.FoodReview);
  const [foodRating,setFoodRating] = useState(0)

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getFoodReviews()
  {
    Helper.getFoodReviews(foodInfo.foodId)
      .then((result : any) =>
      {
        dispatch(setFoodReviewList(result.reverse()))
        if(result.length != 0)
        {
          let rateCount = 0 ;
          for (let i = 0 ; i < result.length ; ++i)
          {
            rateCount += result[i].rating
          }
          setFoodRating(rateCount / result.length )
        }
        else
        {
          setFoodRating(0)
        }
        dispatch(setFoodReviewLoad(false))
      })
  }

  function getFoodData()
  {
    Helper.getFoodData(foodId,parentCatId,resId)
      .then((result : any) =>
      {
        dispatch(setEdtFoodReviewResImg(result.foodImg))
        dispatch(setEdtFoodReviewResName(result.foodName))
      })
  }

  function updateFoodRating()
  {
    setFoodRating(foodRating + edtFoodReviewRating)

    database()
      .ref()
      .child("Menu")
      .child(resId)
      .child(parentCatId)
      .child("Food")
      .child(foodId)
      .update({foodRating : parseFloat(foodRating.toFixed(1))})
      .then((result : any) =>
      {
        if(parseFloat(foodRating.toFixed(1)) >= 4.0)
        {
          const homeTrendingRef =
            database().ref()
              .child("Home")
              .child("TrendFood")
              .child(foodId)

          const trendObj = {
            homeResId : resId,
            homeParentMenuId : parentCatId,
            homeNewFoodId : foodId,
          }

          homeTrendingRef.set(trendObj)
            .then(() =>
            {

            });
        }
      })
  }

  function addFoodReviewBtn()
  {
    try
    {
      if(edtFoodReviewTxt != '')
      {
        const userId : any = auth().currentUser?.uid;

        const foodReviewRef = database().ref()
          .child("Reviews")
          .child("Food")
          .child(foodInfo.foodId)
          .push()

        const foodReviewObj = {
          userId : userId,
          foodReviewKey : foodReviewRef.key,
          foodId: foodInfo.foodId,
          rating : edtFoodReviewRating,
          review : edtFoodReviewTxt
        }

        foodReviewRef
          .set(foodReviewObj)
          .then(() =>
          {
            updateFoodRating()
            getFoodReviews()
            dispatch(setEdtFoodReviewTxt(''))
            dispatch(setEdtFoodReviewRating(0))
            dispatch(setShowFoodReviewSheet(false))
            Snackbar.show({ text: "Your review add successfully", duration: Snackbar.LENGTH_LONG, });
          });
      }
      else
      {
        Snackbar.show({ text: "Review field cannot be empty", duration: Snackbar.LENGTH_LONG, });
      }
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    getFoodData()
    getFoodReviews()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <FoodReviewDetailView
      foodInfo={foodInfo}
      foodReviewSheetRef={foodReviewSheetRef}
      submitReviewClick={() => addFoodReviewBtn()}/>
  )
}

export default FoodReviewDetailController ;
