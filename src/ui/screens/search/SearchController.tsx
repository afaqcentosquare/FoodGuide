import React, { FC, useEffect } from "react";
import { SearchView } from "./SearchView";
import database from "@react-native-firebase/database";
import { searchObj } from "../../../models/res_model/SearchModel";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setSearchCheckInternet, setSearchDataList, setSearchDataLoad } from "../../../redux/slice/SearchSlice";
import NetInfo from "@react-native-community/netinfo";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {}

type searchNavProp = StackNavigationProp<AllScreenStackParamList>;

const SearchController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<searchNavProp>();
  const { searchCheckInternet } = useSelector((state: RootState) => state.Search);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }


  function getResProfile()
  {
    try
    {
      dispatch(setSearchDataLoad(true))
      const showDataRef =
        database()
          .ref()
          .child("ResProfile")
      showDataRef.on('value', (searchDataSnap)  =>
      {
        dispatch(setSearchDataList([]))
        let searchDataArr : Array<searchObj>  = []
        // @ts-ignore
        searchDataSnap.forEach((searchChildSnap) =>
        {
          searchDataArr.push(searchChildSnap.val())
        })
        dispatch(setSearchDataList(searchDataArr))
        dispatch(setSearchDataLoad(false))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function getSearchList(searchInputTxt : string)
  {
    try
    {
      const searchRef =
        database()
          .ref()
          .child("ResProfile")
          .orderByChild('name')
          .startAt(searchInputTxt)
          .endAt(searchInputTxt + "\uf8ff")
      searchRef.on('value', (searchDataSnap)  =>
      {
        dispatch(setSearchDataList([]))
        let searchDataArr : Array<searchObj>  = []
        // @ts-ignore
        searchDataSnap.forEach((searchChildSnap) =>
        {
          searchDataArr.push(searchChildSnap.val())
        })
        dispatch(setSearchDataList(searchDataArr))
        dispatch(setSearchDataLoad(false))
      })
    }
    catch (e)
    {
      console.log("SEARCH_ERROR : " + e);
    }

  }

  function internetConnection()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setSearchCheckInternet(networkState.isConnected))
      if(networkState.isConnected)
      {
        getResProfile()
      }
    });
  }

  useEffect(() =>
  {
    internetConnection()
    getResProfile()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <SearchView
      searchChangeTxt={(e) => getSearchList(e)}/>
  )
}

export default SearchController ;
