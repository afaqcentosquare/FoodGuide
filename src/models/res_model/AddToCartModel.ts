export type AddToCartModel = {
  data : addToCartObj[]
}

export type addToCartObj = {
  addToCartKey: string,
  delivery : string,
  foodId : string,
  parentCatId : string,
  price : string,
  quantity : number,
  resId : string,
  userId : string
}
