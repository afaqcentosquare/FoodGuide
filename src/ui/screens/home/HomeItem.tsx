import React from "react";
import {View} from "react-native";
import { HomeSliderLayout } from "./HomeSliderLayout";
import { HomeTrendingLayout } from "./HomeTrendingLayout";
import { HomeTopRestaurantLayout } from "./HomeTopRestaurantLayout";
import { HomeCategoryLayout } from "./HomeCatagoryLayout";
import { HomeDealsLayout } from "./HomeDealsLayout";
import { HomeNewFoodLayout } from "./HomeNewFoodLayout";
import { HomeVideoLayout } from "./HomeVideoLayout";

type Props = {
    item : any,
}

export const HomeItem = React.memo<Props>((props) =>
{
    const checkItem = () =>
    {
        switch (props.item.home_type)
        {
            case "slider":
                return (
                  <HomeSliderLayout />
                )
            case "category":
                return (
                  <HomeCategoryLayout/>
                )
            case "video":
                return (
                  <HomeVideoLayout/>
                )
            case "top_restaurants":
                return (
                  <HomeTopRestaurantLayout/>
                )
            case "deals":
                return (
                  <HomeDealsLayout/>
                )
            case "new_food":
                return (
                  <HomeNewFoodLayout/>
                )
            case "trending":
                return (
                  <HomeTrendingLayout/>
                )
        }
    }

    return(
        <View>
            {checkItem()}
        </View>

    )
})
