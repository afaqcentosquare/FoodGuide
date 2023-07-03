export type CategoryModel = {
  data : categoryObj[]
}

export type categoryObj = {
  foodCatId : string,
  foodCatName : string,
  foodCatImg : string,
  Restaurant : resCatObj[]
}

export type resCatObj = {
  foodCatResId : string,
}
