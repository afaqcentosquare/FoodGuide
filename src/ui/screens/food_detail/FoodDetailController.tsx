import React, { FC, useEffect, useState } from "react";
import { FoodDetailView } from "./FoodDetialView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import database from "@react-native-firebase/database";
import { setFoodReviewList } from "../../../redux/slice/FoodReviewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import NetInfo from "@react-native-community/netinfo";
import {
  setFoodDetailCheckInternet,
  setFoodDetailReviewLoad, setFoodVideoThumbnail,
  setResProfileData,
} from "../../../redux/slice/FoodDetailSlice";
import auth from "@react-native-firebase/auth";
import { setFoodCountTxt } from "../../../redux/slice/AddToCartSlice";
import Helper from "../../../helper/Helper";
import { BackHandler } from "react-native";

type Props = {}

type foodDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const FoodDetailController : FC<Props> = () =>
{
  const navigation = useNavigation<foodDetailNavProp>();
  // @ts-ignore
  const route = useRoute<foodDetailNavProp['food_info']>();
  const food_info = route.params.food_info ;
  const { foodCountTxt } = useSelector((state: RootState) => state.AddToCart);
  const dispatch = useAppDispatch();
  const [isFoodAdded,setIsFoodAdded] = useState(false);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getFoodReviews()
  {
    Helper.getFoodReviews(food_info.foodId)
      .then((result : any) =>
      {
        dispatch(setFoodDetailReviewLoad(false))
        dispatch(setFoodReviewList(result))
      })
  }

  function addToCart()
  {
    try
    {
      const count = foodCountTxt + 1 ;
      dispatch(setFoodCountTxt(count))
      const userId : any = auth().currentUser?.uid;

      Helper.addCartNode(food_info.resId,food_info.parentCatId,food_info.foodId,count,food_info.foodPrice)
        .then(() =>
        {
          getAddToCartData()
        })
    }
    catch (e)
    {
      console.log("ADD_TO_CART_ERROR : " + e);
    }
  }

  function getFoodQuantity()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const getFoodRef =
        database()
          .ref()
          .child("AddToCart")
          .child(userId)
          .child(food_info.foodId)
      getFoodRef.once('value').then((foodQunSnap) =>
      {
        dispatch(setFoodCountTxt(foodQunSnap.child('quantity').val()))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function getResProfileData()
  {
    Helper.getRestaurantData(food_info.resId)
      .then((result : any) =>
      {
        dispatch(setResProfileData(result))
      })
  }

  function getAddToCartData()
  {
    const userId : any = auth().currentUser?.uid;

    const showDataRef =
      database()
        .ref()
        .child("AddToCart")
        .child(userId)
        .child(food_info.foodId)
    showDataRef.on('value', (showDataSnap)  =>
    {
      setIsFoodAdded(showDataSnap.child("isFoodAdded").val())
    })
  }

  function internetConnection()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setFoodDetailCheckInternet(networkState.isConnected))
      if(networkState.isConnected)
      {
        getAddToCartData()
        getResProfileData()
        getFoodQuantity()
        getFoodReviews()
      }
    });
  }

  function getFoodVideo()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const postRef =
        database()
          .ref()
          .child("Post")
          .orderByChild('foodId')
          .equalTo(food_info.foodId)
      postRef.once('value').then((postSnap)  =>
      {
        // @ts-ignore
        postSnap.forEach((postChildSnap) =>
        {
          dispatch(setFoodVideoThumbnail(postChildSnap.val()))
          //console.log("VIDEO : " + JSON.stringify(postSnap.val()));
        })
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    //console.log("FOOD_ID : " + food_info.foodId)
    internetConnection()
    getFoodVideo()
    getAddToCartData()
    getResProfileData()
    getFoodQuantity()
    getFoodReviews()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <FoodDetailView
      isFoodAdded={isFoodAdded}
      addToCartBtn={() => addToCart()}
      foodInfo={food_info} />
  )
}

export default FoodDetailController ;
