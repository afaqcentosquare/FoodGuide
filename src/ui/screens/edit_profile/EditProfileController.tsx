import React, { FC, useEffect, useState } from "react";
import { EditProfileView } from "./EditProfileView";
import auth from "@react-native-firebase/auth";
import Helper from "../../../helper/Helper";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { setEditUserImg, setEditUserLoc, setEditUserName, setEditUserNum } from "../../../redux/slice/EditUserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import { BackHandler, ToastAndroid } from "react-native";
import storage from "@react-native-firebase/storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";

type Props = {}

type editProfielNavProp = StackNavigationProp<AllScreenStackParamList>;

const EditProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<editProfielNavProp>();
  const editUser = useSelector((state: RootState) => state.EditUser);
  const {editUserNum,editUserImg,editUserLoc,editUserName} = editUser;
  const [imageEditable,setImageEditAble] = useState(false);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getUserData()
  {
    const userId : any = auth().currentUser?.uid;
    Helper.getUserData(userId)
      .then((result : any) =>
      {
        dispatch(setEditUserName(result.userName))
        dispatch(setEditUserImg(result.userImg))
        dispatch(setEditUserLoc(result.userLoc))
        dispatch(setEditUserNum(result.userPhoneNumber))
      })
  }

  function checkUpdate()
  {
    if(imageEditable)
    {
      saveImageStorage()
    }
    else
    {
      updateUserData(editUserImg)
    }
  }

  function updateUserData(url : string)
  {
    const userId : any = auth().currentUser?.uid;

    const data = database().ref()
      .child("UserProfile")
      .child(userId)

    const updateUserObj = {
      userName : editUserName,
      userLoc : editUserLoc,
      userImg : url,
      userPhoneNumber : editUserNum
    }

    data.update(updateUserObj)
      .then((result : any) => {})
  }

  function checkEditProfilePermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          console.log("IMG : " + images.path)
          setImageEditAble(true)
          dispatch(setEditUserImg(images.path));
        }).catch(e =>
        {
          console.log(e);
        })
      }
      else
      {
        Snackbar.show({ text:"Please Allow Permission", duration: Snackbar.LENGTH_LONG, });
      }
    })
  }

  function saveImageStorage()
  {
    if(editUserImg !== '')
    {
      const lastPath = editUserImg.substring(editUserImg.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('User Images').child(lastPath);
      storageRef.putFile(editUserImg)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url : string) =>
          {
            updateUserData(url)
          })
        })
        .catch((e) =>
        {
          console.log('Error' + e);
        })
    }
    else
    {
      Snackbar.show({ text:"Please Select Image", duration: Snackbar.LENGTH_LONG, });
    }
  }

  useEffect(() =>
  {
    getUserData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <EditProfileView
      editUserImgClick={() => checkEditProfilePermission()}
      updateUserBtn={() => checkUpdate()}/>
  )
}

export default EditProfileController ;
