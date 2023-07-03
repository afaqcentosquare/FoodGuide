import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { orderObj } from "../../models/res_model/OrdersModel";

export interface OrderState {
  orderDataList : Array<orderObj>,
  orderDataLoad : boolean,
}

const initialState : OrderState = {
  orderDataList : [],
  orderDataLoad : true,
}

export const OrderSlice = createSlice({
  name : 'order',
  initialState,
  reducers : {
    setOrderDataList(state,action : PayloadAction<Array<orderObj>>)
    {
      state.orderDataList = action.payload
    },
    setOrderDataLoad(state,action : PayloadAction<boolean>)
    {
      state.orderDataLoad = action.payload
    },
  }
})

export const {
  setOrderDataList,
  setOrderDataLoad,
} = OrderSlice.actions
export default OrderSlice.reducer
