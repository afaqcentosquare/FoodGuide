import { postObj } from "./PostModel";

export type HomeModel = {
  data : homeDataObj[]
}

export type homeDataObj = {
  Category : categoryDataObj[],
  Deals : dealsDataObj[],
  NewFood : homeFoodObj[],
  Slider : sliderDataObj[],
  TrendFood : homeFoodObj[],
  TopRes : topResDataObj[],
  Post : videoObj[]
}

export type videoObj = {
  postDes : string,
  postVideo : string,
  postKey : string,
  postLocation : string,
  postThumbNail : string,
  postUserId : string,
  resId : string,
  parentCatId : string,
  foodId : string
}

export type categoryDataObj = {
  foodCatId : string,
}

export type dealsDataObj = {
  dealsId : string,
  dealsImg : string
}

export type homeFoodObj = {
  homeNewFoodId : string,
  homeParentMenuId : string
  homeResId : string
}

export type sliderDataObj = {
  sliderId : string,
  sliderImg : string
}


export type topResDataObj = {
  resId : string
}

