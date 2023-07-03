export type WishlistModel = {
  data : wishListObj[]
}

export type wishListObj = {
  Restaurants : likeResObj[],
  Food : likeFoodObj[]
}

export type likeResObj = {
  isLike : boolean,
  userId : string,
  resId : string
}

export type likeFoodObj = {
  isLike : boolean,
  userId : string,
  foodId : string
  resId : string,
  parentCatId : string
}
