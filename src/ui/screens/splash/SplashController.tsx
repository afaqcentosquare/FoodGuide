import React, {FC, useEffect} from 'react';
import {SplashView} from './SplashView';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import {useNavigation} from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

type Props = {}

type splashNavProp = StackNavigationProp<AllScreenStackParamList>;

const SplashController : FC<Props> = () =>
{
  const navigation = useNavigation<splashNavProp>();

  useEffect(() =>
  {
    setTimeout(() =>
    {
      const userId : any = auth().currentUser?.uid;

      if(userId != undefined)
      {
        navigation.navigate('Main');
      }
      else
      {
        navigation.navigate('SignIn');
      }

    },2000);

  },[])

  return(
    <SplashView/>
  )
}

export default SplashController ;
