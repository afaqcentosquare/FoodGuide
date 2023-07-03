export type MenuModel = {
  data : menuObj[]
}

export type menuObj = {
  menuCatId : string,
  menuCatName : string,
  menuCatImg : string,
  Food : foodObj[]
}

export type foodObj = {
  parentCatId : string,
  resId : string,
  foodCatName : string,
  foodDes : string,
  foodId : string,
  foodImg : string,
  foodName : string,
  foodPrice : string,
  foodRating : number,
}
