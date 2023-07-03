import React, { FC, useEffect } from "react";
import { WishlistView } from "./WishlistView";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { likeFoodObj, likeResObj } from "../../../models/res_model/WishlistModel";
import {
  setLikeFoodList,
  setLikeFoodLoad,
  setLikeResLoad,
  setLikeRestaurantList, setWishlistCheckInternet,
} from "../../../redux/slice/WishlistSlice";
import NetInfo from "@react-native-community/netinfo";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {}

type wishListNavProp = StackNavigationProp<AllScreenStackParamList>;

const WishlistController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<wishListNavProp>();
  const wishlist = useSelector((state: RootState) => state.Wishlist);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function GetWishlist()
  {
    try
    {
      dispatch(setLikeResLoad(true))
      dispatch(setLikeFoodLoad(true))
      const showDataRef =
        database()
          .ref()
          .child("Likes")
      showDataRef.on('value', (wishlistDataSnap)  =>
      {
        dispatch(setLikeFoodList([]))
        dispatch(setLikeRestaurantList([]))
        let foodLikeArr : Array<likeFoodObj> = []
        let restaurantLikeArr : Array<likeResObj> = []
        // @ts-ignore
        wishlistDataSnap.child("Foods").forEach((wishlistChilsnap) =>
        {
          foodLikeArr.push(wishlistChilsnap.val())
        })

        // @ts-ignore
        wishlistDataSnap.child("Restaurants").forEach((restaurantChilsnap) =>
        {
          restaurantLikeArr.push(restaurantChilsnap.val())
        })
        dispatch(setLikeFoodList(foodLikeArr));
        dispatch(setLikeRestaurantList(restaurantLikeArr));
        dispatch(setLikeResLoad(false))
        dispatch(setLikeFoodLoad(false))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function InternetConnction()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setWishlistCheckInternet(networkState.isConnected))
      if(networkState.isConnected)
      {
        GetWishlist()
      }
    });
  }

  useEffect(() =>
  {
    InternetConnction()
    GetWishlist()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <WishlistView/>
  )
}

export default WishlistController ;
