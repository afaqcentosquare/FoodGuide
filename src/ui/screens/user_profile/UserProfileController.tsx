import React, { FC, useEffect } from "react";
import { UserProfileView } from "./UserProfileView";
import { BackHandler, ToastAndroid } from "react-native";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';
import Permission from "../../../hooks/Permission";
import ImagePicker from 'react-native-image-crop-picker';
import { setUserProfileImage } from "../../../redux/slice/UserProfileSlice";

type Props = {}

type resProfileNavProp = StackNavigationProp<AllScreenStackParamList>;

const UserProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.UserProfile);
  const navigation = useNavigation<resProfileNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function checkUserProfilePermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setUserProfileImage(images.path));
          //this.setState({storyImgFilePath : images.path});
        }).catch(e =>
        {
          console.log(e);
        })
      }
      else
      {
        ToastAndroid.show("Please Allow Permission",ToastAndroid.LONG);
      }
    })
  }

  function saveImageStorage()
  {
    if(userProfile.userProfileImage !== '')
    {
      const lastPath = userProfile.userProfileImage.substring(userProfile.userProfileImage.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('User Images').child(lastPath);
      storageRef.putFile(userProfile.userProfileImage)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createUserProfileDatabase(url)
          })
        })
        .catch((e) =>
        {
          console.log('Error' + e);
        })
    }
    else
    {
      ToastAndroid.show("Please Select Image",ToastAndroid.LONG);
    }
  }

  function validateResProfileForm()
  {
    if(userProfile.userProfileName !== '')
    {
      if(userProfile.userProfileLocation !== '')
      {
        if(userProfile.userProfilePhoneNumber !== '')
        {
          saveImageStorage()
        }
        else
        {
          ToastAndroid.show("Please enter phone number",ToastAndroid.LONG)
        }
      }
      else
      {
        ToastAndroid.show("Please enter location",ToastAndroid.LONG)
      }
    }
    else
    {
      ToastAndroid.show("Please Enter Name",ToastAndroid.LONG)
    }
  }

  function createUserProfileDatabase(resProfileUrl : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      //------------------------- user profile ---------------------------

      const userProfileObj = {
        userImg : resProfileUrl,
        userId : userId,
        userName : userProfile.userProfileName,
        userLoc : userProfile.userProfileLocation,
        userPhoneNumber : userProfile.userProfilePhoneNumber,
      }

      database().ref()
        .child("UserProfile")
        .child(userId.toString())
        .set(userProfileObj)
        .then(() =>
        {
          navigation.navigate('Main')
        });

    }
    catch (e)
    {
      console.log("USER_PROFILE_ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <UserProfileView
      photoClick={() => checkUserProfilePermission()}
      resProfileBtn={() => validateResProfileForm()}/>
  )
}

export default UserProfileController ;
