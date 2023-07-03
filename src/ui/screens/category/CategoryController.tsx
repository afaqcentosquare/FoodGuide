import React, { FC, useEffect } from "react";
import { CategoryView } from "./CategoryView";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { categoryObj } from "../../../models/res_model/CategoryModel";
import {
  setCatChildLoad,
  setCategoryInternetCheck,
  setCategoryList,
  setCategoryResList,
  setCatParentLoad, setSelectCatType,
} from "../../../redux/slice/CategorySlice";
import NetInfo from "@react-native-community/netinfo";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {}

type categoryNavProp = StackNavigationProp<AllScreenStackParamList>;

const CategoryController : FC<Props> = () =>
{
  const navigation = useNavigation<categoryNavProp>();
  const category = useSelector((state: RootState) => state.Category);
  const dispatch = useAppDispatch();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getCategory()
  {
    try
    {
      const resMenuRef =
        database()
          .ref()
          .child("FoodCategory")
      resMenuRef.on('value', (categorySnap)  =>
      {
        dispatch(setCategoryResList([]))

        let categoryArr : Array<categoryObj>  = []
        // @ts-ignore
        categorySnap.forEach((catChildSnap) =>
        {
          categoryArr.push(catChildSnap.val())
        })
        dispatch(setCategoryList(categoryArr))
        dispatch(setCatParentLoad(false))
        dispatch(setCatChildLoad(false))
        dispatch(setSelectCatType(categoryArr[0].foodCatName))
        dispatch(setCategoryResList(Object.values(categoryArr[0].Restaurant)))
        console.log("RES_LIST : " + JSON.stringify(Object.values(categoryArr[0].Restaurant)))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function internetConnction()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setCategoryInternetCheck(networkState.isConnected))
      if(networkState.isConnected)
      {
        getCategory()
      }
    });
  }

  useEffect(() =>
  {
    internetConnction()
    getCategory()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <CategoryView/>
  )
}

export default CategoryController ;
