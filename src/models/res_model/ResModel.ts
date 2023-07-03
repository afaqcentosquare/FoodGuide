export type ResModel = {
  data : resProfileObj[]
}

export type resProfileObj = {
  minOrder : number,
  closeTime : string,
  deliveredTime : string,
  description : string,
  location : string,
  name : string,
  openTime : string,
  phoneNumber : string,
  rating : number,
  resId : string,
  resImg : string
}
