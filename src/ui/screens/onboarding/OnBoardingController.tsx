import React, {FC, useEffect, useRef, useState} from "react";
import {OnBoardingView} from "./OnBoardingView";
import {SlidesObj} from "../../../models/dummy_model/OnBoardModel";
import {Animated} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";

type Props = {}
type onBoardNavProp = StackNavigationProp<AllScreenStackParamList>;

const OnBoardingController : FC<Props> = (props) =>
{
  const slides = [
    {
      id : 1,
      title : "Fresh Food",
      des : "We make it simple to find the food you crave. Enter your address and let us do the rest.",
      image : require('../../../assets/images/onboard_img_1.png')
    },
    {
      id : 2,
      title : "Fast Delivery",
      des : "When you order Eat Street,we`ll hook you up with exclusive coupons,specials and rewards.",
      image : require('../../../assets/images/onboard_img_2.png')
    },
    {
      id : 3,
      title : "Easy Payment",
      des : "We make food ordering fast, simple and free - no matter if you order online or cash.",
      image : require('../../../assets/images/onboard_img_3.png')
    },
  ]

  const navigation = useNavigation<onBoardNavProp>()
  const [onBoardData,setOnBoardData] = useState<Array<SlidesObj>>([]) ;
  const scrollX = useRef(new Animated.Value(0)).current ;
  const [currentIndex,setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() =>
  {
    setOnBoardData(slides);
  },[])

  // @ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) =>
  {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;

  const scrollTo = () =>
  {
    if(currentIndex < slides.length - 1)
    {
      // @ts-ignore
      slideRef.current.scrollToIndex({index : currentIndex + 1})
    }
    else
    {
      navigation.navigate('SignIn');
      console.log("last item");
    }
  }

  const changeScreen = () =>
  {
    navigation.navigate('SignIn');
  }

  return(
    <OnBoardingView
      slideRef={slideRef}
      slideData={onBoardData}
      itemChange={viewableItemsChanged}
      config={viewConfig}
      currentIndex={currentIndex}
      checkLastItem={scrollTo}
      scrollX={scrollX}
      changeScreen={changeScreen}/>
  )
}

export default OnBoardingController ;
