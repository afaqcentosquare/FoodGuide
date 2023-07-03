import React from 'react' ;
import {createStackNavigator} from "@react-navigation/stack";

export type HomeStackParamList = {
  Home : undefined,
  Category : undefined,
  Video : undefined,
  Inbox : undefined,
  Profile : undefined
}

export const BottomNavStack = createStackNavigator<HomeStackParamList>();
