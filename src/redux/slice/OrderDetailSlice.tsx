import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { orderObj } from "../../models/res_model/OrdersModel";

export interface OrderDetailState {
 /* orderDataList : orderObj,*/
  orderDataLoad : boolean,
  orderTotal : number
}

const initialState : OrderDetailState = {
  orderTotal : 0,
  orderDataLoad : true,
}

export const OrderDetailSlice = createSlice({
  name : 'orderDetail',
  initialState,
  reducers : {
    setOrderDataLoad(state,action : PayloadAction<boolean>)
    {
      state.orderDataLoad = action.payload
    },
    setOrderTotal(state,action : PayloadAction<number>)
    {
      state.orderTotal = action.payload
    },
  }
})

export const {
  setOrderTotal,
  setOrderDataLoad,
} = OrderDetailSlice.actions
export default OrderDetailSlice.reducer
