export type OrdersModel = {
  data : orderObj[]
}

export type orderObj = {
  orderDate : string,
  orderNum : number,
  orderAddress : string,
  orderAlternateNum : string,
  orderDeliveryInstruc : string,
  orderKey : string,
  orderName : string,
  orderPhoneNum : string,
  orderUserId : string,
  orderTotal : number,
  orderList : orderCartObj[]
}

export type orderCartObj = {
  addToCartKey: string,
  delivery : string,
  foodId : string,
  parentCatId : string,
  price : string,
  quantity : number,
  resId : string,
  userId : string
}
