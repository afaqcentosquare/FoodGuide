import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { addToCartObj } from "../../models/res_model/AddToCartModel";

export interface CheckoutState {
  checkoutOrderList : Array<addToCartObj>,
  checkoutName : string,
  checkoutPhoneNum : string,
  checkoutAlternateNum : string,
  checkoutAddress : string,
  checkoutDeliveryInstr : string,
  checkOutOrderNum : number
}

const initialState : CheckoutState = {
  checkoutOrderList : [],
  checkoutName : '',
  checkoutPhoneNum : '',
  checkoutAlternateNum : '',
  checkoutAddress : '',
  checkoutDeliveryInstr : '',
  checkOutOrderNum : 5000
}

export const CheckoutSlice = createSlice({
  name : 'checkout',
  initialState,
  reducers : {
    setCheckoutOrderList(state,action : PayloadAction<Array<addToCartObj>>)
    {
      state.checkoutOrderList = action.payload
    },
    setCheckoutName(state,action : PayloadAction<string>)
    {
      state.checkoutName = action.payload
    },
    setCheckoutPhoneNum(state,action : PayloadAction<string>)
    {
      state.checkoutPhoneNum = action.payload
    },
    setCheckoutAlternateNum(state,action : PayloadAction<string>)
    {
      state.checkoutAlternateNum = action.payload
    },
    setCheckoutAddress(state,action : PayloadAction<string>)
    {
      state.checkoutAddress = action.payload
    },
    setCheckoutDeliveryInstr(state,action : PayloadAction<string>)
    {
      state.checkoutDeliveryInstr = action.payload
    },
    setCheckoutOrderNum(state,action : PayloadAction<number>)
    {
      state.checkOutOrderNum = action.payload
    },
  }
})

export const {
  setCheckoutOrderList,
  setCheckoutName,
  setCheckoutPhoneNum,
  setCheckoutAlternateNum,
  setCheckoutAddress,
  setCheckoutDeliveryInstr,
  setCheckoutOrderNum
} = CheckoutSlice.actions
export default CheckoutSlice.reducer
