import React, {FC} from 'react';
import { FoodVideoView } from "./FoodVideoView";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation, useRoute } from "@react-navigation/native";

type Props = {}

type foodVideoNavProp = StackNavigationProp<AllScreenStackParamList>;

const FoodVideoController : FC<Props> = () =>
{
  const navigation = useNavigation<foodVideoNavProp>();
  // @ts-ignore
  const route = useRoute<foodVideoNavProp['foodVideoUrl']>();
  const foodVideoUrl = route.params.foodVideoUrl ;

  return(
    <FoodVideoView
      foodVideoUrl={foodVideoUrl}/>
  )
}

export default FoodVideoController ;
