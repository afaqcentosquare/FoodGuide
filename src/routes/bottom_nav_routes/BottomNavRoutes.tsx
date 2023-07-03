import React, {FC} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';
import HomeController from "../../ui/screens/home/HomeController";
import InboxController from "../../ui/screens/inbox/InboxController";
import ProfileController from "../../ui/screens/profile/ProfileController";
// @ts-ignore
import Feather from "react-native-vector-icons/Feather";
// @ts-ignore
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CategoryController from "../../ui/screens/category/CategoryController";
import VideoController from "../../ui/screens/video/VideoController";


const Tab = createBottomTabNavigator();

type Props = {}

export const BottomNavRoutes : FC<Props> = ({}) =>
{
  const {themedColors}  = usePreferredTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle:{height: 45,bottom:0,top:0},
        tabBarActiveTintColor: themedColors.bottomNavActiveColor,
        tabBarInactiveTintColor: themedColors.bottomNavInActiveColor,
        tabBarStyle: {height:45,backgroundColor:themedColors.primaryColor,borderTopRightRadius:18,borderTopLeftRadius:18}
      }}
      initialRouteName="Camera">

      <Tab.Screen
        name="Home"
        component={ HomeController }
        options={{
          headerShown:false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({focused, color}) => (focused ?
            <AntDesign
              name={"home"}
              color={color}
              size={22}/> :
            <AntDesign
              name={"home"}
              color={color}
              size={22}/>)}}/>

      <Tab.Screen
        name="Category"
        component={ CategoryController }
        options={{
          headerShown:false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({focused, color}) =>  (focused ?
            <Ionicons
              name={"fast-food"}
              color={color}
              size={24}/> :
            <Ionicons
              name={"fast-food"}
              color={color}
              size={24}/>)}}/>

      <Tab.Screen
        name="Video"
        component={ VideoController }
        options={{
          headerShown:false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({focused, color}) =>  (focused ?
            <MaterialIcons
              name={"video-collection"}
              color={color}
              size={24}/> :
            <MaterialIcons
              name={"video-collection"}
              color={color}
              size={24}/>)}}/>

      <Tab.Screen
        name="Inbox"
        component={ InboxController }
        options={{
          headerShown:false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({focused, color}) =>  (focused ?
            <AntDesign
              name={"message1"}
              color={color}
              size={22}/> :
            <AntDesign
              name={"message1"}
              color={color}
              size={22}/>)}}/>

      <Tab.Screen
        name="Profile"
        component={ ProfileController }
        options={{
          headerShown:false,
          tabBarLabel:() => {return null},
          tabBarIcon: ({focused, color}) =>  (focused ?
            <Feather
              name={"user"}
              color={color}
              size={22}/> :
            <Feather
              name={"user"}
              color={color}
              size={22}/>)}}/>

    </Tab.Navigator>
  )

}
